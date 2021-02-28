defmodule ElCloud.FileStorageTest do
  use ElCloud.DataCase
  alias ElCloud.ListHelper
  alias ElCloud.PathHelper

  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]

  def list_files_by_path(list, path) do
    ListHelper.recursive_find(list, :path, path)
  end

  def find_by_path(list, path) do
    ListHelper.find_by(list, :path, path)
  end

  describe "fileStorage" do
    alias ElCloud.FileStorage

    @file_attrs %{folder: @data_dir, filepath: Path.join(@data_dir, "test.txt")}
    @inner_file_attrs %{folder: Path.join(@data_dir, "test_folder"), filepath: PathHelper.join([@data_dir, "test_folder", "test.txt"])}

    test "list_files/1 returns created file" do
      File.write(@file_attrs.filepath, "empty file", [:append])
      IO.inspect @file_attrs.folder
      IO.inspect File.ls("./")
      IO.inspect File.ls("./data")
      files = FileStorage.list_files(@file_attrs.folder)

      assert list_files_by_path(files, @file_attrs.filepath) != nil
    end

    test "list_files/1 returns created file with properly parameters" do
      File.write(@file_attrs.filepath, "empty file", [:append])

      files = FileStorage.list_files(@file_attrs.folder)
      file = find_by_path(files, @file_attrs.filepath)

      assert file !== nil
      assert file.info.size != 0
      assert file.isFolder == false
      assert file.children == nil
    end


    test "list_files/1 returns created file in properly parent" do
      File.mkdir(@inner_file_attrs.folder)
      File.write(@inner_file_attrs.filepath, "Some File info", [:append])

      files = FileStorage.list_files(@file_attrs.folder)
      assert list_files_by_path(files, @inner_file_attrs.filepath) != nil

      parent_files = FileStorage.list_files(@inner_file_attrs.folder)
      file = find_by_path(parent_files, @inner_file_attrs.filepath)
      assert list_files_by_path(files, @inner_file_attrs.filepath) != nil

      File.rm!(@inner_file_attrs.filepath)
      File.rmdir!(@inner_file_attrs.folder)
    end

    test "move_file/2 update file path properly" do
    end


  end
end
