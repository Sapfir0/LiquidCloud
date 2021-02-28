defmodule ElCloudWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use ElCloudWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(ElCloudWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(ElCloudWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, :folderNotFound}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ElCloudWeb.FileStorageView)
    |> render("folderNotFound.json")
  end
end
