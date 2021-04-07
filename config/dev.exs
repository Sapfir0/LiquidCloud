use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with webpack to recompile .js and .css sources.


# Watch static and templates for browser reloading.
config :elCloud, ElCloudWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/elCloud_web/views/.*(ex)$},
      ~r{lib/elCloud_web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

config :elCloud, ElCloudWeb.FileStorageController, data_dir: "./data"

# Configure your database
config :elCloud, ElCloud.Repo,
  username: "postgres",
  password: "f6445828e4ed4b36bc4b42f658b803aa",
  database: "elCloud_dev",
  hostname: "localhost",
  pool_size: 10
