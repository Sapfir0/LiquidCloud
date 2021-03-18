defmodule DirectoryTreeHelper do

  @type file :: %{
          :isFolder => boolean(),
          :filename => String.t(),
          :path => String.t(),
          :children => nil | [file()],
          :info => %{:size => non_neg_integer()}
        }

  def listAll(filepath, page, page_size, isRecursive) do
      File.ls!(filepath)
        |> Enum.chunk_every(page_size)
        |> Enum.at(page, [])
        |> Enum.map(fn file -> iterator(filepath, file, page, page_size, isRecursive) end)
  end


  @spec iterator(String.t(), String.t(), integer(), integer(), boolean()) :: file()
  def iterator(filepath, filename, page, page_size, isRecursive) do
    fullPath = "#{filepath}/#{filename}"
    isFolder = File.dir?(fullPath)
    fileStat = File.lstat!(fullPath)

    children = if isRecursive and isFolder, do: listAll(fullPath, page, page_size, isRecursive), else: nil

    %{
      :isFolder => isFolder,
      :filename => filename,
      :path => fullPath,
      :info => %{
        :size => fileStat.size
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
