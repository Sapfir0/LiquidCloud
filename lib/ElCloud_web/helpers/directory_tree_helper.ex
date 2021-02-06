defmodule DirectoryTreeHelper do
  def list_all(filepath) do
    files = File.ls!(filepath)
    Enum.map(files, fn file -> iterator(filepath, file) end)
  end

  def iterator(filepath, filename) do
    fullPath = "#{filepath}/#{filename}"
    isFolder = File.dir?(fullPath)
    children = if isFolder == true, do: list_all(fullPath), else: nil
    %{:isFolder => isFolder, :filename => filename, :children => children}
  end

end
