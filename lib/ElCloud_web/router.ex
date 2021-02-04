defmodule ElCloudWeb.Router do
  use ElCloudWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ElCloudWeb do
    pipe_through :api

    resources "/files", FileStorageController, except: [:new, :edit]
  end

  scope "/", ElCloudWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", ElCloudWeb do
  #   pipe_through :api
  # end
end
