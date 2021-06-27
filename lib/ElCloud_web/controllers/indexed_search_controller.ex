defmodule ElCloudWeb.IndexedSearchController do
  use ElCloudWeb, :controller
  use PhoenixSwagger

  alias ElCloud.Search
  action_fallback ElCloudWeb.FallbackController

  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]

  def index(conn, %{"query" => query, "directory" => directory} = params) do
    IO.inspect directory
    IO.inspect query
    # ElCloud.Search.Storage.create_file_index()
    files = ElCloud.Search.Helper.indexed_search(@data_dir <> directory, query)
    render(conn, "index.json", searchResult: files)
  end

end
