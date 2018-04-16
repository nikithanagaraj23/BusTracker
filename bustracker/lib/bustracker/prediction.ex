defmodule Bustracker.Prediction do

  def prediction_list(stopID) do

    resp = HTTPoison.get!("https://api-v3.mbta.com/predictions?stop="<>stopID)
    data = Poison.decode!(resp.body)
    data["data"]
  end

  def get_prediction(stopID) do
    prediction_list(stopID)
  end

end
