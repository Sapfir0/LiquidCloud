defmodule ElCloud.Search.Storage do
  @moduledoc """
  The SearchStorage context.
  """
  import Ecto.Query, warn: false
  alias ElCloud.Repo

  alias ElCloud.Search.FileIndex
  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]


  def update_file_index(indexFilePath) do
    fileIndex = File.read(indexFilePath)
    IO.inspect fileIndex
  end

  def create_file_index() do
    dirs = DirectoryTreeHelper.list_all(@data_dir, 0, 100, true)
    File.write(@indexes_file, Poison.encode!(dirs), [:binary])
    dirs
  end

end
