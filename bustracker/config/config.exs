# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :bustracker,
  ecto_repos: [Bustracker.Repo]

# Configures the endpoint
config :bustracker, BustrackerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "4/bsJDVhcqt5/THXF6XgPvag2UMpy0FvcBQZ+xcdyhZd/JCCr/oRDZXnMwI1m1RS",
  render_errors: [view: BustrackerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Bustracker.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


  # Configure Google OAuth
  config :ueberauth, Ueberauth,
    providers: [
      google: {Ueberauth.Strategy.Google, [default_scope: "emails profile plus.me"]}
    ]
  config :ueberauth, Ueberauth.Strategy.Google.OAuth,
    client_id: System.get_env("GOOGLE_CLIENT_ID"),
    client_secret: System.get_env("GOOGLE_CLIENT_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
