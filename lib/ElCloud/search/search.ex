

defmodule ElCloud.Search.FileIndex do
  use Ecto.Schema
  import Ecto.Changeset
  alias ElCloud.Search.FileIndex

  schema "fileIndex" do
    field :path, :string
    field :filename, :string
    field :parent_id, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
  end


end
