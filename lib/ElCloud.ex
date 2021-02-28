defmodule ElCloud do
  @moduledoc """
  ElCloud keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  def init() do
    data_dir = Application.get_env(:elCloud, ElCloudWeb.FileStorageController)[:data_dir]
    if !File.exists?(data_dir) do
      File.mkdir!(data_dir)
    end

  end

end
