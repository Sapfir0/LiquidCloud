defmodule ElCloud.Storage do
  @moduledoc """
  The Store context.
  """
  import Ecto.Query, warn: false

  @spec search(String.t(), String.t()) :: [String.t()]
  def search(directory, queryFilename) do
    recursiveSearch(queryFilename, directory)
  end


  def recursiveSearch(queryFilename, directory) do
     File.ls!(directory)
      |> Enum.map(fn file -> iterator(directory, file, queryFilename) end)
      |> List.flatten()
      |> Enum.filter(fn file -> String.match?(file, ~r/#{queryFilename}/) end)
  end


  def iterator(directory, filename, queryFilename) do
    fullPath = Path.join(directory, filename)

    if File.dir?(fullPath), do: recursiveSearch(queryFilename, fullPath), else: filename

  end

end
