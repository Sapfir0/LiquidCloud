defmodule ElCloud.ListHelper do

  def find_by_path(list, path) do
    Enum.find(list, fn x -> x.path == path end)
  end

  def recursive_find_by_path(list, path) do
    Enum.find(list,
      fn x ->
        if x.children !== nil do
          recursive_find_by_path(x.children, path)
        else
          x.path === path
        end
      end
    )
  end

end
