defmodule Bustracker.Histories.History do
  use Ecto.Schema
  import Ecto.Changeset


  schema "history" do
    field :destination, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(history, attrs) do
    history
    |> cast(attrs, [:destination, :user_id])
    |> validate_required([:destination, :user_id])
  end
end
