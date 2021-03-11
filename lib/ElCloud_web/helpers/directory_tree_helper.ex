defmodule DirectoryTreeHelper do
  require Calendar

  @type file :: %{
          :isFolder => boolean(),
          :filename => String.t(),
          :path => String.t(),
          :children => nil | [file()],
          :info => %{:size => non_neg_integer()}
        }

  def list_all(filepath, page, page_size, isRecursive) do
    files = File.ls!(filepath)
    paged_files = Enum.chunk_every(files, page_size)

    Enum.map(Enum.at(paged_files, page), fn file ->
      get_files_list(filepath, file, isRecursive)
    end)
  end

  def get_files_list(filepath, filename, isRecursive \\ false) do
    iterator(filepath, filename, isRecursive)
  end

  @spec iterator(String.t(), String.t()) :: file()
  def iterator(filepath, filename, isRecursive \\ false) do
    fullPath = "#{filepath}/#{filename}"
    isFolder = File.dir?(fullPath)
    fileStat = File.lstat!(fullPath)
    children = if isRecursive and isFolder, do: get_files_list(filepath, filename), else: nil

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
