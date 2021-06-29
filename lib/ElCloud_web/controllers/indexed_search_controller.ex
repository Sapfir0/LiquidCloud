defmodule ElCloudWeb.IndexedSearchController do
  use ElCloudWeb, :controller
  use PhoenixSwagger

  alias ElCloud.Search
  action_fallback ElCloudWeb.FallbackController

  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]

  def index(conn, %{"query" => query, "directory" => directory} = params) do
    files = ElCloud.Search.Helper.indexed_search(@data_dir <> directory, query)
    render(conn, "index.json", searchResult: files)
  end

  def create(conn, %{}) do
    ElCloud.Search.Helper.create_indexes()
    render(conn, "show.json", show: %{"operation" => "success"})
  end

end
