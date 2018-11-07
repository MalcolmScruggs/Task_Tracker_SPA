# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :tasks_spa,
  ecto_repos: [TasksSpa.Repo]

# Configures the endpoint
config :tasks_spa, TasksSpaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SDfxZsdfu3JsVBhNr7VVGvQu71zU/ynNZJxfdw51tVZBsaYpg/ewDGQs3ak6OidR",
  render_errors: [view: TasksSpaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TasksSpa.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
