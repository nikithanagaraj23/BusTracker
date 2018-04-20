defmodule BustrackerWeb.PredictionChannel do
  use BustrackerWeb, :channel

  alias Bustracker.Prediction

  def join("prediction:", %{"stop" => stop}, socket) do
    if authorized?(stop) do
      predictions = Prediction.get_prediction(stop)
      {:ok , %{"predictions" => predictions}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("callpredictions", %{"stop" => stop}, socket) do
    predictions = Prediction.get_prediction(stop)
    {:reply, {:ok, %{ "predictions" => predictions}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (prediction:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end


  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end

end
