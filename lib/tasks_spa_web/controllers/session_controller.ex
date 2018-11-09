defmodule TasksSpaWeb.SessionController do
  use TasksSpaWeb, :controller

  action_fallback TasksSpaWeb.FallbackController

  alias TasksSpa.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- TasksSpa.Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TasksSpaWeb.Endpoint, "user_email", user.email),
          user_email: user.email,
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end