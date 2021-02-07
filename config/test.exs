use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :elCloud, ElCloudWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :elCloud, ElCloud.Repo,
  username: "postgres",
  password: "f6445828e4ed4b36bc4b42f658b803aa",
  database: "elCloud_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
