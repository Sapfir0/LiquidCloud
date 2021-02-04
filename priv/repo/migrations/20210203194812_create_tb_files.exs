defmodule ElCloud.Repo.Migrations.CreateTbFiles do
  use Ecto.Migration

  def change do
    create table(:tb_files) do
      add :path, :string
      add :type, :string

      timestamps()
    end

  end
end
