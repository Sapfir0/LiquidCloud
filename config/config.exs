# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :elCloud,
  ecto_repos: [ElCloud.Repo]

# Configures the endpoint
config :elCloud, ElCloudWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "FdoYieVIOFzJ2N5jcqVxZkhuw3Hs2lCV6HinhRJL+rUX2vEQ1NViSOEZ+sNKLsrX",
  render_errors: [view: ElCloudWeb.ErrorView, accepts: ~w(html json)],
  pubsub_server: ElCloud.PubSub


config :elCloud, ElCloud.Repo, migration_primary_key: [type: :uuid]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :elCloud, :phoenix_swagger,
  swagger_files: %{
    "priv/static/swagger.json" => [
      router: ElCloudWeb.Router,
      endpoint: ElCloudWeb.Endpoint
    ]
  }

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :pbkdf2_elixir,
  rounds: 1

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
