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
    if (files == []) do
      files
    else
      paged_files = Enum.chunk_every(files, page_size)
      current_page = Enum.at(paged_files, page) || [] # если вернет нул, мы упадем на след этапе итерирования

      Enum.map(current_page, fn file ->
        iterator(filepath, file, page, page_size, isRecursive)
      end)
    end

  end

  @spec iterator(String.t(), String.t(), integer(), integer(), boolean()) :: file()
  def iterator(filepath, filename, page, page_size, isRecursive) do
    fullPath = "#{filepath}/#{filename}"
    isFolder = File.dir?(fullPath)
    fileStat = File.lstat!(fullPath)

    children = if isRecursive and isFolder, do: list_all(fullPath, page, page_size, isRecursive), else: nil

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
