defmodule ElCloud.Repo.Migrations.CreateFileIndex do
  use Ecto.Migration

  def up do
    create_if_not_exists table("fileIndex") do
      # add :id, :uuid, primary_key: true, null: false, default: fragment("gen_random_uuid()")
      add :path, :string
      add :filename, :string
      add :parent_id, :string
      timestamps()
    end

  end

  def down do
    drop table("fileIndex")
  end

end
