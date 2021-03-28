defmodule ElCloud.Storage do
  @moduledoc """
  The Store context.
  """
  import Ecto.Query, warn: false

  @spec search(String.t(), String.t()) :: [String.t()]
  def search(directory, filename) do
    # recursiveSearch(directory, filename)
      File.ls!(directory)
        |> Enum.filter(fn file -> String.match?(file, ~r/#{filename}/) end)
  end


  def recursiveSearch(directory, filename) do
    File.ls!(directory)
     |>  Enum.filter(fn file -> String.match?(file, ~r/#{filename}/) end)
    #  Enum.map(fn file ->
      #   IO.inspect(file)
      #   iterator(Path.join(directory, file), filename)
      # end)
end


def iterator(directory, filename) do
  isFolder = File.dir?(directory)

  children = if isFolder, do: recursiveSearch(directory, filename), else: []
  IO.inspect(directory)

  # IO.inspect List.flatten(children)
  files = Enum.filter(List.flatten(children), fn file -> String.match?(file, ~r/#{filename}/) end)
  # IO.inspect files
  files
end

end
