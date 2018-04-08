defmodule BustrackerWeb.TokenController do
  use BustrackerWeb, :controller
  alias Bustracker.Users.User

  action_fallback BustrackerWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Bustracker.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
