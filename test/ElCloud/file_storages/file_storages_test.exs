defmodule ElCloud.FileStoragesTest do
  use ElCloud.DataCase

  alias ElCloud.FileStorages

  describe "tb_files" do
    alias ElCloud.FileStorages.FileStorage

    @valid_attrs %{path: "some path", type: "some type"}
    @update_attrs %{path: "some updated path", type: "some updated type"}
    @invalid_attrs %{path: nil, type: nil}

    def file_storage_fixture(attrs \\ %{}) do
      {:ok, file_storage} =
        attrs
        |> Enum.into(@valid_attrs)
        |> FileStorages.create_file_storage()

      file_storage
    end

    test "list_tb_files/0 returns all tb_files" do
      file_storage = file_storage_fixture()
      assert FileStorages.list_tb_files() == [file_storage]
    end

    test "get_file_storage!/1 returns the file_storage with given id" do
      file_storage = file_storage_fixture()
      assert FileStorages.get_file_storage!(file_storage.id) == file_storage
    end

    test "create_file_storage/1 with valid data creates a file_storage" do
      assert {:ok, %FileStorage{} = file_storage} = FileStorages.create_file_storage(@valid_attrs)
      assert file_storage.path == "some path"
      assert file_storage.type == "some type"
    end

    test "create_file_storage/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = FileStorages.create_file_storage(@invalid_attrs)
    end

    test "update_file_storage/2 with valid data updates the file_storage" do
      file_storage = file_storage_fixture()
      assert {:ok, %FileStorage{} = file_storage} = FileStorages.update_file_storage(file_storage, @update_attrs)
      assert file_storage.path == "some updated path"
      assert file_storage.type == "some updated type"
    end

    test "update_file_storage/2 with invalid data returns error changeset" do
      file_storage = file_storage_fixture()
      assert {:error, %Ecto.Changeset{}} = FileStorages.update_file_storage(file_storage, @invalid_attrs)
      assert file_storage == FileStorages.get_file_storage!(file_storage.id)
    end

    test "delete_file_storage/1 deletes the file_storage" do
      file_storage = file_storage_fixture()
      assert {:ok, %FileStorage{}} = FileStorages.delete_file_storage(file_storage)
      assert_raise Ecto.NoResultsError, fn -> FileStorages.get_file_storage!(file_storage.id) end
    end

    test "change_file_storage/1 returns a file_storage changeset" do
      file_storage = file_storage_fixture()
      assert %Ecto.Changeset{} = FileStorages.change_file_storage(file_storage)
    end
  end
end
