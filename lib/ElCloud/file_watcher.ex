defmodule ElCloud.Watcher do
  use GenServer
  require Logger
  require ElCloudWeb.FileChannel
  @indexes_file "./hello.json"
  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:indexes_file]

  def start_link(dirs) do
    IO.puts(Path.absname(dirs))
    GenServer.start_link(__MODULE__, dirs: dirs)
  end

  def init(args) do
    {:ok, watcher_pid} = FileSystem.start_link(args)
    FileSystem.subscribe(watcher_pid)

    {:ok, %{watcher_pid: watcher_pid}}
  end

  def handle_info({:file_event, watcher_pid, {path, events}}, state) do
    current_event = List.last(events)

    ElCloudWeb.FileChannel.send_message("File #{:path} was #{:current_event}")
    IO.inspect path
    IO.inspect current_event
    # update_file_index(@indexes_file)
    {:noreply, state}
  end



  def handle_info({:file_event, watcher_pid, :stop}, %{watcher_pid: watcher_pid} = state) do
    # Your own logic when monitor stop
    {:noreply, state}
  end
end
