defmodule ElCloudWeb.FileStorageController do
  use ElCloudWeb, :controller

  action_fallback ElCloudWeb.FallbackController

  def index(conn, _params) do
    files = DirectoryTreeHelper.list_all("./data")
    render(conn, "index.json", tb_files: files)
  end

end
