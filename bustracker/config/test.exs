use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :bustracker, BustrackerWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :bustracker, Bustracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "bustracker",
  password: "bustracker",
  database: "bustracker_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
