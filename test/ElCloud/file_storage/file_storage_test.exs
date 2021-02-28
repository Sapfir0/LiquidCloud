defmodule ElCloud.FileStorageTest do
  use ElCloud.DataCase
  alias ElCloud.ListHelper

  describe "fileStorage" do
    alias ElCloud.FileStorage
    @valid_attrs %{folder: "./data", filepath: Path.join("./data", "/test.txt")}

    test "list_files/1 returns created file" do
      File.write(@valid_attrs.filepath, "empty file", [:append])
      files = FileStorage.list_files(@valid_attrs.folder)
      assert ListHelper.recursive_find_by_path(files, @valid_attrs.filepath) != nil
    end


    test "list_files/1 returns created file in properly parent" do
      File.mkdir("./data/test_folder")
      File.write("./data/test_folder/test.txt", "Som File info", [:append])

      files = FileStorage.list_files(@valid_attrs.folder)
      assert ListHelper.recursive_find_by_path(files, "./data/test_folder/test.txt") != nil

      parent_files = FileStorage.list_files("./data/test_folder")
      file = ListHelper.find_by_path(parent_files, "./data/test_folder/test.txt")

      assert file !== nil
      assert file.info.size != 0
      assert file.isFolder == false
      assert file.children == nil

      File.rm!("./data/test_folder/test.txt")
      File.rmdir!("./data/test_folder")
    end

    test "move_file/2 update file path properly" do
    end


  end
end
