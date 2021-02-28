defmodule ElCloud.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      ElCloud.Repo,
      # Start the endpoint when the application starts
      ElCloudWeb.Endpoint,
      # Starts a worker by calling: ElCloud.Worker.start_link(arg)
      # ElCloud.Watcher
      {ElCloud.Watcher, [Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]]},
      {Phoenix.PubSub, [name: ElCloud.PubSub, adapter: Phoenix.PubSub.PG2]}
    ]

    {:ok, pid} = Supervisor.start_link(children, strategy: :one_for_one)
  end

  # creating cloud directory
  data_dir = Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]
  if !File.exists?(data_dir) do
    File.mkdir!(data_dir)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ElCloudWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
