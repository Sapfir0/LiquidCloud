defmodule ElCloudWeb.FileStorageControllerTest do
  use ElCloudWeb.ConnCase

  alias ElCloud.FileStorages
  alias ElCloud.FileStorages.FileStorage

  @create_attrs %{
    path: "some path",
    type: "some type"
  }
  @update_attrs %{
    path: "some updated path",
    type: "some updated type"
  }
  @invalid_attrs %{path: nil, type: nil}

  def fixture(:file_storage) do
    {:ok, file_storage} = FileStorages.create_file_storage(@create_attrs)
    file_storage
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tb_files", %{conn: conn} do
      conn = get(conn, Routes.file_storage_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create file_storage" do
    test "renders file_storage when data is valid", %{conn: conn} do
      conn = post(conn, Routes.file_storage_path(conn, :create), file_storage: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.file_storage_path(conn, :show, id))

      assert %{
               "id" => id,
               "path" => "some path",
               "type" => "some type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.file_storage_path(conn, :create), file_storage: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update file_storage" do
    setup [:create_file_storage]

    test "renders file_storage when data is valid", %{conn: conn, file_storage: %FileStorage{id: id} = file_storage} do
      conn = put(conn, Routes.file_storage_path(conn, :update, file_storage), file_storage: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.file_storage_path(conn, :show, id))

      assert %{
               "id" => id,
               "path" => "some updated path",
               "type" => "some updated type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, file_storage: file_storage} do
      conn = put(conn, Routes.file_storage_path(conn, :update, file_storage), file_storage: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete file_storage" do
    setup [:create_file_storage]

    test "deletes chosen file_storage", %{conn: conn, file_storage: file_storage} do
      conn = delete(conn, Routes.file_storage_path(conn, :delete, file_storage))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.file_storage_path(conn, :show, file_storage))
      end
    end
  end

  defp create_file_storage(_) do
    file_storage = fixture(:file_storage)
    {:ok, file_storage: file_storage}
  end
end
