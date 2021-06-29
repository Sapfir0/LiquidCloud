defmodule ElCloudWeb.IndexedSearchView do
  use ElCloudWeb, :view
  alias ElCloudWeb.SearchView

  def render("index.json", %{searchResult: searchResult}) do
    %{data: render_many(searchResult, SearchView, "search.json")}
  end

  def render("search.json", %{search: search}) do
    search
  end

  def render("show.json", %{show: show}) do
    show
  end

end
