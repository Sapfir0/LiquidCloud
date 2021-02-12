defmodule ElCloud.UserManager.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias ElCloud.UserManager.{User, Encryption}


  schema "users" do
    field :password, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> validate_length(:password, min: 4)
    |> validate_format(:username, ~r/^[a-z0-9][a-z0-9]+[a-z0-9]$/i)
    |> validate_length(:username, min: 3)
    |> unique_constraint(:username)
    |> downcase_username
    |> encrypt_password

  end

  defp downcase_username(changeset) do
    update_change(changeset, :username, &String.downcase/1)
  end

  defp encrypt_password(changeset) do
    password = get_change(changeset, :password)
    if password do
      hash = Encryption.hash_password(password).password_hash
      put_change(changeset, :password, hash)
    else
      changeset
    end
  end


end
