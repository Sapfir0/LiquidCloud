defmodule ElCloud.ListHelper do
  def find_by(list, field_name, field_value), do: Enum.find(list, fn x -> Map.get(x, field_name) == field_value end)

  defp find_in_children(field_name, field_value, is_regexp, x) do
    if x.children !== nil do
      recursive_find(x.children, field_name, field_value, is_regexp)
    else
      if is_regexp do
        Map.get(x, field_name) |> String.match?(~r/#{field_value}/)
      else 
        Map.get(x, field_name) === field_value
      end
    end
  end

  def recursive_find(list, field_name, field_value, is_regexp=false) do
    searcher = fn children -> find_in_children(field_name, field_value, is_regexp, children) end
    Enum.find(list, searcher)
  end

end
