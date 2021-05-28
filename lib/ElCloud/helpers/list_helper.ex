defmodule ElCloud.ListHelper do
  def findBy(list, field_name, fieldValue) do
    Enum.find(list, fn x -> Map.get(x, field_name) == fieldValue end)
  end

  def recursiveFind(list, field_name, fieldValue) do
    Enum.find(
      list,
      fn x ->
        if x.children !== nil do
          recursiveFind(x.children, field_name, fieldValue)
        else
          Map.get(x, field_name) === fieldValue
        end
      end
    )
  end
end
