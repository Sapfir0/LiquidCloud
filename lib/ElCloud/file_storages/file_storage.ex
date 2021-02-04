defmodule ElCloud.FileStorages.FileStorage do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tb_files" do
    field :path, :string
    field :type, :string

    timestamps()
  end

  @doc false
  def changeset(file_storage, attrs) do
    file_storage
    |> cast(attrs, [:path, :type])
    |> validate_required([:path, :type])
  end
end
