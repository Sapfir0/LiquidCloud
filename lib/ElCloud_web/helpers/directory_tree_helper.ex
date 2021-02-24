defmodule DirectoryTreeHelper do
  require Calendar

  @type file :: %{
          :isFolder => boolean(),
          :filename => String.t(),
          :path => String.t(),
          :children => nil | [file()],
          :info => %{:size => non_neg_integer()}
        }

  def list_all(filepath) do
    files = File.ls!(filepath)
    Enum.map(files, fn file -> iterator(filepath, file) end)
  end

  @spec iterator(String.t(), String.t()) :: file()
  def iterator(filepath, filename) do
    fullPath = "#{filepath}/#{filename}"
    isFolder = File.dir?(fullPath)
    fileStat = File.lstat!(fullPath)
    children = if isFolder == true, do: list_all(fullPath), else: nil

    %{
      :isFolder => isFolder,
      :filename => filename,
      :path => fullPath,
      :info => %{
        :size => fileStat.size
        # :updated => DateTime.to_string(fileStat.mtime)
      },
      :children => children
    }
  end

  @spec move_file(String.t(), String.t()) :: :ok | {:error, any()}
  def move_file(oldpath, newpath) do
    File.rename(oldpath, newpath)
  end

  @spec remove_file(String.t()) :: :ok | {:error, any()}
  def remove_file(path) do
    File.rm(path)
  end

end
