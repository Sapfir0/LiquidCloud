defmodule ElCloud.MixProject do
  use Mix.Project

  def project do
    [
      app: :elCloud,
      version: "0.1.0",
      elixir: ">= 1.10.0",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps(),
      dialyzer: [plt_add_deps: :transitive],
      preferred_cli_env: [
        quality: :test,
        "quality.ci": :test
      ]
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {ElCloud.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.5.1"},
      {:phoenix_pubsub, "~> 2.0"},
      {:phoenix_ecto, "~> 4.0"},
      {:ecto_sql, "~> 3.0"},
      {:file_system, "~> 0.2"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.11"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:dialyxir, "~> 0.4", only: [:dev], runtime: false},
      {:credo, "~> 1.0", only: [:dev, :test], runtime: false},
      {:sobelow, "~> 0.7", only: [:dev, :test], runtime: false},
      {:gettext, "~> 0.11"},
      {:jason, "~> 1.0"},
      {:plug_cowboy, "~> 2.0"},
      {:phoenix_swagger, "~> 0.8"},
      # for phoenix swagger
      {:ex_json_schema, "~> 0.7.3"},
      # for phoenix swagger
      {:poison, "~> 3.1"},
      # если юзаешь линю, то лучше использовать argon2 или bcrypt
      {:pbkdf2_elixir, "~> 1.3"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      start: ["phx.swagger.generate -e ElCloud.UserManager", "phx.server"],
      quality: [
        "compile --all-warnings",
        "test",
        "format",
        "credo --strict",
        "sobelow --verbose",
        "dialyzer --ignore-exit-status"
      ],
      "quality.ci": [
        "compile --all-warnings ",
        "test --slowest 10",
        "format --check-formatted",
        "credo --strict",
        "sobelow --exit",
        "dialyzer"
      ]
    ]
  end
end
