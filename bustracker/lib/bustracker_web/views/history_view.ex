defmodule BustrackerWeb.HistoryView do
  use BustrackerWeb, :view
  alias BustrackerWeb.HistoryView

  def render("index.json", %{history: history}) do
    %{data: render_many(history, HistoryView, "history.json")}
  end

  def render("show.json", %{history: history}) do
    %{data: render_one(history, HistoryView, "history.json")}
  end

  def render("history.json", %{history: history}) do
    %{id: history.id,
      destination: history.destination}
  end
end
