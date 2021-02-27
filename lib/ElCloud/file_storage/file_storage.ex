defmodule ElCloud.FileStorage do
  @moduledoc """
  The FileStorage context.
  """
  import Ecto.Query, warn: false

  alias ElCloud.FileStorage

  def list_files(directory) do
    if !File.exists?(directory) do
      {:error, :folderNotFound}
    else
      DirectoryTreeHelper.list_all(directory)
    end
  end


end
