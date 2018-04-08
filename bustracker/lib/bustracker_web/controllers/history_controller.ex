defmodule BustrackerWeb.HistoryController do
  use BustrackerWeb, :controller

  alias Bustracker.Histories
  alias Bustracker.Histories.History

  action_fallback BustrackerWeb.FallbackController

  def index(conn, _params) do
    history = Histories.list_history()
    render(conn, "index.json", history: history)
  end

  def create(conn, %{"history" => history_params, "token" => token}) do

    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
    if history_params["user_id"] != user_id do
      IO.inspect({:bad_match, history_params["user_id"], user_id})
      raise "hax!"
    end

    with {:ok, %History{} = history} <- Histories.create_history(history_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", history_path(conn, :show, history))
      |> render("show.json", history: history)
    end
  end

  def show(conn, %{"id" => id}) do
    history = Histories.get_history!(id)
    render(conn, "show.json", history: history)
  end

  def update(conn, %{"id" => id, "history" => history_params}) do
    history = Histories.get_history!(id)

    with {:ok, %History{} = history} <- Histories.update_history(history, history_params) do
      render(conn, "show.json", history: history)
    end
  end

  def delete(conn, %{"id" => id}) do
    history = Histories.get_history!(id)
    with {:ok, %History{}} <- Histories.delete_history(history) do
      send_resp(conn, :no_content, "")
    end
  end
end
