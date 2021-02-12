
defmodule ElCloud.UserManager.Encryption do
  alias Pbkdf2
  alias ElCloud.UserManager.User

  def hash_password(password), do: Pbkdf2.add_hash(password)

  def validate_password(%User{} = user, password), do: Pbkdf2.check_pass(user, password)
end
