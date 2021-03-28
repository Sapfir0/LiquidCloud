defmodule ElCloudWeb.FileChannel do
  use Phoenix.Channel
  require Logger

  def join("example", payload, socket) do
    Logger.info(":: New Connection Example Channel !!::")
    {:ok, socket}
  end

  def send_message(payload) do
    Phoenix.PubSub.broadcast(ElCloud.PubSub, "example", %{
      type: "action",
      payload: %{data: payload}
    })
  end

  def handle_info(%{type: "action"} = info, socket) do
    push(socket, "action", info)
    {:noreply, socket}
  end
end
