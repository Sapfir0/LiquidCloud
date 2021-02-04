defmodule ElCloudWeb.FileStorageController do
  use ElCloudWeb, :controller

  alias ElCloud.FileStorages
  alias ElCloud.FileStorages.FileStorage

  action_fallback ElCloudWeb.FallbackController

  def index(conn, _params) do
    files = FlatFiles.list_all("./data")
    filesWithId = Enum.with_index(files)
    IO.inspect filesWithId
    render(conn, "index.json", tb_files: files)
  end

  def create(conn, %{"file_storage" => file_storage_params}) do
    with {:ok, %FileStorage{} = file_storage} <- FileStorages.create_file_storage(file_storage_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.file_storage_path(conn, :show, file_storage))
      |> render("show.json", file_storage: file_storage)
    end
  end

  def show(conn, %{"id" => id}) do
    file_storage = FileStorages.get_file_storage!(id)
    render(conn, "show.json", file_storage: file_storage)
  end

  def update(conn, %{"id" => id, "file_storage" => file_storage_params}) do
    file_storage = FileStorages.get_file_storage!(id)

    with {:ok, %FileStorage{} = file_storage} <- FileStorages.update_file_storage(file_storage, file_storage_params) do
      render(conn, "show.json", file_storage: file_storage)
    end
  end

  def delete(conn, %{"id" => id}) do
    file_storage = FileStorages.get_file_storage!(id)

    with {:ok, %FileStorage{}} <- FileStorages.delete_file_storage(file_storage) do
      send_resp(conn, :no_content, "")
    end
  end
end
