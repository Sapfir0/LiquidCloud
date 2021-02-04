defmodule ElCloudWeb.FileStorageController do
  use ElCloudWeb, :controller

  action_fallback ElCloudWeb.FallbackController

  def index(conn, _params) do
    files = FlatFiles.list_all("./data")
    filesWithId = Enum.map(files, fn filename -> %{:path => filename, :id => filename, :type => "file"} end)
    IO.inspect filesWithId
    render(conn, "index.json", tb_files: filesWithId)
  end

end
