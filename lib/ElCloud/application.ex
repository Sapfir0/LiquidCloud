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
      ElCloudWeb.Endpoint
      # Starts a worker by calling: ElCloud.Worker.start_link(arg)
      # {ElCloud.Worker, arg},
    ]

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
