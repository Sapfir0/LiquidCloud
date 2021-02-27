defmodule ElCloud.FileStorageTest do
  use ElCloud.DataCase

  describe "fileStorage" do
    alias ElCloud.FileStorage

    test "list_files/1 returns created file" do
      file = File.write("./data/test.txt", "empty file", [:append])

      assert FileStorage.list_files("./data/") == [file]
    end

    test "list_files/1 returns created file in properly parent" do
    end

    test "list_files/1 returns created file in properly parent" do
    end


  end
end
