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
    resources "/users", UserController, except: [:new, :edit]
  end

  scope "/api/swagger" do
    forward "/", PhoenixSwagger.Plug.SwaggerUI, otp_app: :elCloud, swagger_file: "swagger.json"
  end

  scope "/", ElCloudWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end


  def swagger_info do
    %{
      schemes: ["http", "https", "ws", "wss"],
      info: %{
        version: "1.0",
        title: "Liquid Cloud API",
        description: "API Documentation for Liquid Cloud API v1",
        termsOfService: "Open for public",
        contact: %{
          name: "Alexander Yurev",
          email: "alexander.yurev@internet.ru"
        }
      },
      securityDefinitions: %{
        Bearer: %{
          type: "apiKey",
          name: "Authorization",
          description:
          "API Token must be provided via `Authorization: Bearer ` header",
      in: "header"
        }
      },
      consumes: ["application/json"],
      produces: ["application/json"]
    }
  end

end
