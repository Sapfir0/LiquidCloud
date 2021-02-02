defmodule ElCloud.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      ElCloud.Repo,
      # Start the Telemetry supervisor
      ElCloudWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: ElCloud.PubSub},
      # Start the Endpoint (http/https)
      ElCloudWeb.Endpoint,
      # Start a worker by calling: ElCloud.Worker.start_link(arg)
      # {ElCloud.Worker, arg}
      {Watcher,  Application.get_env(:elCloud, ElCloudWeb.Endpoint)[:data_directory]},
    ]

    # FileSystem.start_link(dirs: ["./newDir"], latency: 0, watch_root: true)

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ElCloud.Supervisor]
    Supervisor.start_link(children, opts)
  end


  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ElCloudWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
