defmodule ElCloud.ListHelper do

  def find_by(list, field_name, field_value) do
    Enum.find(list, fn x -> x[path] == path end)
  end

  def recursive_find(list, field_name, field_value) do
    Enum.find(list,
      fn x ->
        if x.children !== nil do
          recursive_find_by_path(x.children, path)
        else
          x[field_name] === field_value
        end
      end
    )
  end

end
