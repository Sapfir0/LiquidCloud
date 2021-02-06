defmodule ElCloudWeb.FileStorageView do
  use ElCloudWeb, :view
  alias ElCloudWeb.FileStorageView

  def render("index.json", %{tb_files: tb_files}) do
    %{data: render_many(tb_files, FileStorageView, "file_storage.json")}
  end

  def render("show.json", %{file_storage: file_storage}) do
    %{data: render_one(file_storage, FileStorageView, "file_storage.json")}
  end

  def render("file_storage.json", %{file_storage: file_storage}) do
    file_storage
  end
end
