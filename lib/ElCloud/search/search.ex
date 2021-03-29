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
      |> Enum.filter(fn file -> String.match?(file.filename, ~r/#{queryFilename}/) end)
  end


  def iterator(directory, filename, queryFilename) do
    fullPath = Path.join(directory, filename)
    isFolder = File.dir?(fullPath)

    if isFolder, do: recursiveSearch(queryFilename, fullPath), else: %{
      :isFolder => isFolder,
      :filename => filename,
      :path => fullPath
    } # создаем объект для всех элементов, а не только для тех, кто удовлетворяет условию, так что этот код не оч

  end

end
