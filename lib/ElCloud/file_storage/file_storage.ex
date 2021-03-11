defmodule ElCloud.FileStorage do
  @moduledoc """
  The FileStorage context.
  """
  import Ecto.Query, warn: false

  @spec list_files(String.t(), Integer, Integer, Boolean) :: list()
  def list_files(directory, page, page_size, isRecursive  \\ false) do
    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      DirectoryTreeHelper.list_all(directory, page, page_size, isRecursive)
    end
  end
end
