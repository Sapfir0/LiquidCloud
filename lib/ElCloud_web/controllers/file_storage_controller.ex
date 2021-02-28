defmodule ElCloudWeb.FileStorageController do
  use ElCloudWeb, :controller
  use PhoenixSwagger

  alias ElCloud.FileStorage
  action_fallback ElCloudWeb.FallbackController

  @data_dir Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]

  def swagger_definitions do
    %{
      File:
        swagger_schema do
          title("File")
          description("Get list of files in directory")

          properties do
            isFolder(:bool, "Is folder", required: true)
            children(:string, "List of children files", required: true)
            filename(:string, "Filename", required: true)
          end
        end,
      FileResponse:
        swagger_schema do
          title("File Response")
          description("Response schema for single file")
          property(:data, Schema.ref(:File), "The file details")
        end
    }
  end

  swagger_path(:index) do
    get("/api/files")
    summary("List files")
    description("List all files in directory")
    response(200, "OK", Schema.ref(:FileResponse))
  end
  def index(conn, params) do
    directory = @data_dir <> Map.get(params, "directory", "")
    files = FileStorage.list_files(directory)
    render(conn, "index.json", tb_files: files)
  end


  swagger_path(:update) do
    put("/api/files")
    summary("Move file")
    description("List all files in directory")
  end
  def move_file(conn, %{"oldPath" => oldPath, "newPath" => newPath}) do
      res = DirectoryTreeHelper.move_file(oldPath, newPath)
      if (res == :ok) do
        render(conn, "show.json", file_storage: %{ "operation" => res })
      else
        {:error, :folderNotFound}
      end
  end



end
