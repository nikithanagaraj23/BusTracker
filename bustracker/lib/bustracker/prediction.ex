defmodule Bustracker.Prediction do

  def get_prediction(stopID) do
    if is_number(stopID) do
      stopID = Integer.to_string(stopID)
    else
      stopID = stopID
    end

    resp = HTTPoison.get!("https://api-v3.mbta.com/predictions?page%5Blimit%5D=30&stop="<>stopID)
    data = Poison.decode!(resp.body)
    data["data"]
  end

end
