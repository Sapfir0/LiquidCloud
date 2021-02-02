defmodule ElCloud.Repo do
  use Ecto.Repo,
    otp_app: :elCloud,
    adapter: Ecto.Adapters.Postgres
end
