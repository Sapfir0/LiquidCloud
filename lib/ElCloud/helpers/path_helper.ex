defmodule ElCloud.PathHelper do

  @spec join(list(String.t())) :: String.t()
  def join(paths) do
    Enum.reduce(paths, fn path, fullPath -> Path.join(fullPath, path) end)
  end

end
