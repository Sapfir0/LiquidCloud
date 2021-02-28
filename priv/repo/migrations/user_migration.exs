defmodule ElCloud.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def up do
    create table(:users) do
      add :username, :string
      add :password, :string

      timestamps()
    end

  end

  def down do
    drop table("users")
  end
end
