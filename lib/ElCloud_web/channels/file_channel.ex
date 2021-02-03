defmodule ElCloudWeb.FileChannel do
  use Phoenix.Channel
  def join("example", payload, socket) do
    {:ok, socket}
  end
end
