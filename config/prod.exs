use Mix.Config

# For production, don't forget to configure the url host
# to something meaningful, Phoenix uses this information
# when generating URLs.
#
# Note we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the `mix phx.digest` task,
# which you should run after static files are built and
# before starting your production server.
config :elCloud, ElCloudWeb.Endpoint,
  http: [:inet6, port: System.get_env("PORT") || 4000],
  url: [host: "localhost", port: 4000],
  cache_static_manifest: "priv/static/cache_manifest.json"

config :elCloud, ElCloudWeb.FileStorageController, data_dir: "./data"

# Do not print debug messages in production
config :logger, level: :info

config :elCloud, ElCloud.Repo,
  username: "postgres",
  password: "1234",
  database: "elCloud_prod",
  hostname: "postgres",
  pool_size: 10
