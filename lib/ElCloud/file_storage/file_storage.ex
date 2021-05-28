defmodule ElCloud.FileStorage do
  @moduledoc """
  The FileStorage context.
  """
  import Ecto.Query, warn: false

  @spec list_files(String.t(), integer(), integer(), boolean()) :: list()
  def list_files(directory, page, page_size, isRecursive  \\ false) do
    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      DirectoryTreeHelper.listAll(directory, page, page_size, isRecursive)
    end
  end

  @spec get_file(String.t()) :: String.t()
  def get_file(directory) do
    File.read(directory) # {:ok, text_in_file} | {:error, :enoent}
  end

end
