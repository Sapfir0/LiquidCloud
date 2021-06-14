defmodule ElCloud.Storage do
  @moduledoc """
  The Store context.
  """
  import Ecto.Query, warn: false

  @spec search(String.t(), String.t()) :: [String.t()]
  def search(directory, query_filename) do
    recursive_search(query_filename, directory)
  end


  def recursive_search(query_filename, directory) do
     File.ls!(directory)
      |> Enum.map(fn file -> iterator(directory, file, query_filename) end)
      |> List.flatten()
      |> Enum.filter(fn file -> String.match?(file.filename, ~r/#{query_filename}/) end)
  end


  def iterator(directory, filename, query_filename) do
    full_path = Path.join(directory, filename)
    is_folder = File.dir?(full_path)

    if is_folder, do: recursive_search(query_filename, full_path), else: %{
      :is_folder => is_folder,
      :filename => filename,
      :path => full_path
    } # создаем объект для всех элементов, а не только для тех, кто удовлетворяет условию, так что этот код не оч

  end

end
