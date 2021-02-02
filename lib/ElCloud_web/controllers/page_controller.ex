defmodule ElCloudWeb.PageController do
  use ElCloudWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
