defmodule ElCloudWeb.FileStorageController do
  use ElCloudWeb, :controller

  action_fallback ElCloudWeb.FallbackController

  def index(conn, params) do
    directory = "./data/" <> Map.get(params, "directory", "")
    IO.puts directory
    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      files = DirectoryTreeHelper.list_all(directory)
      render(conn, "index.json", tb_files: files)
    end

  end


end
