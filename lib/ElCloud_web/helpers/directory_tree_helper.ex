defmodule DirectoryTreeHelper do
  require Calendar

  def list_all(filepath) do
    files = File.ls!(filepath)
    Enum.map(files, fn file -> iterator(filepath, file) end)
  end

  def iterator(filepath, filename) do
    fullPath = "#{filepath}/#{filename}"
    isFolder = File.dir?(fullPath)
    fileStat = File.lstat!(fullPath)
    children = if isFolder == true, do: list_all(fullPath), else: nil
    %{
      :isFolder => isFolder,
      :filename => filename,
      :info => %{
        :size => fileStat.size,
        # :updated => DateTime.to_string(fileStat.mtime)
      },
      :children => children
    }
  end

end
