defmodule ElCloud.ListHelper do
  def find_by(list, field_name, field_value) do
    Enum.find(list, fn x -> Map.get(x, field_name) == field_value end)
  end

  def recursive_find(list, field_name, field_value) do
    Enum.find(
      list,
      fn x ->
        if x.children !== nil do
          recursive_find(x.children, field_name, field_value)
        else
          Map.get(x, field_name) === field_value
        end
      end
    )
  end
end
