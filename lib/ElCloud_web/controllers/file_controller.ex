defmodule ElCloudWeb.FileController do
  use ElCloudWeb, :controller
  use PhoenixSwagger
  alias ElCloud.FileStorage
  action_fallback ElCloudWeb.FallbackController

  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]

  swagger_path(:show) do
    get("/api/file")
    summary("files")
    description("Download file in directory")
    response(200, "OK", Schema.ref(:FileResponse))
  end

  def show(conn, params) do
    directory = Path.join(@data_dir, Map.get(params, "path", ""))
    IO.inspect params
    Plug.Conn.send_file(conn, 200, directory)
  end



end
