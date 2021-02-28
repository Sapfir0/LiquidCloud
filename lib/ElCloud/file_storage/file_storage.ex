defmodule ElCloud.FileStorage do
  @moduledoc """
  The FileStorage context.
  """
  import Ecto.Query, warn: false

  @spec list_files(String.t()) :: list()
  def list_files(directory) do
    # directory = Path.expand(directory)
    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      DirectoryTreeHelper.list_all(directory)
    end
  end


end
