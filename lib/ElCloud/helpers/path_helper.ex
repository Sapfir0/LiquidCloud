defmodule ElCloud.PathHelper do
  @spec join(list(String.t())) :: String.t()
  def join(paths) do
    Enum.reduce(paths, fn path, full_path -> Path.join(full_path, path) end)
  end
end
