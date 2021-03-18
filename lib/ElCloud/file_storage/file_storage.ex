defmodule ElCloud.FileStorage do
  @moduledoc """
  The FileStorage context.
  """
  import Ecto.Query, warn: false

  @spec listFiles(String.t(), integer(), integer(), boolean()) :: list()
  def listFiles(directory, page, page_size, isRecursive  \\ false) do
    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      DirectoryTreeHelper.listAll(directory, page, page_size, isRecursive)
    end
  end
end
