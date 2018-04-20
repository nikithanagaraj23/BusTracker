use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :bustracker, BustrackerWeb.Endpoint,
  secret_key_base: "6fTJ5iaRQDZ6c6DyUR65RSolH6eW28HQjxBGjKpMfPDctN/UU/l6V73mLHdreA3c"

# Configure your database
config :bustracker, Bustracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "bustracker",
  password: "bustracker",
  database: "bustracker_prod",
  pool_size: 15
