defmodule ElCloudWeb.UserView do
  use ElCloudWeb, :view
  alias ElCloudWeb.UserView

  def render("index.json", %{users: users}) do
    IO.inspect(users)
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username
    }
  end
end
