defmodule DirectoryTreeHelper do

  @type file :: %{
          :is_folder => boolean(),
          :filename => String.t(),
          :path => String.t(),
          :children => nil | [file()],
          :info => %{:size => non_neg_integer()}
        }

  def list_all(filepath, page, page_size, is_recursive) do
      File.ls!(filepath)
        |> Enum.chunk_every(page_size)
        |> Enum.at(page, [])
        |> Enum.map(fn file -> iterator(filepath, file, page, page_size, is_recursive) end)
  end


  @spec iterator(String.t(), String.t(), integer(), integer(), boolean()) :: file()
  def iterator(filepath, filename, page, page_size, is_recursive) do
    full_path = "#{filepath}/#{filename}"
    is_folder = File.dir?(full_path)
    fileStat = File.lstat!(full_path)

    children = if is_recursive and is_folder, do: list_all(full_path, page, page_size, is_recursive), else: nil

    %{
      :is_folder => is_folder,
      :filename => filename,
      :path => full_path,
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
