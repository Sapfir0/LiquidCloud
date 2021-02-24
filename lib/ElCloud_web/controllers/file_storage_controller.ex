defmodule ElCloudWeb.FileStorageController do
  use ElCloudWeb, :controller
  use PhoenixSwagger

  action_fallback ElCloudWeb.FallbackController

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
    directory = "./data/" <> Map.get(params, "directory", "")
    IO.puts(directory)

    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      files = DirectoryTreeHelper.list_all(directory)
      render(conn, "index.json", tb_files: files)
    end
  end


  swagger_path(:update) do
    put("/api/files")
    summary("Move file")
    description("List all files in directory")
  end
  def move_file(conn, %{"oldPath" => oldPath, "newPath" => newPath}) do
      IO.inspect "Updating"
      oldPath = "./data/" <> oldPath
      newPath = "./data/" <> newPath
      res = DirectoryTreeHelper.move_file(oldPath, newPath)
      if (res == :ok) do
        render(conn, "show.json", file_storage: %{ "operation" => res })
      else
        {:error, :folderNotFound}
      end
  end



end
