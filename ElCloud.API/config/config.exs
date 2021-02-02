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
  secret_key_base: "PoAiSAG5h0q1zXtQy36M7UB/ntFhp/UwFO1rvim3dMp5ZphiCrzaTBhG5JWZ9L4X",
  render_errors: [view: ElCloudWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: ElCloud.PubSub,
  live_view: [signing_salt: "xTQzz1VH"],
  data_directory: ['./data/']

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
