defmodule Bustracker.GUser do
  use Ecto.Schema
  import Ecto.Changeset


  schema "gusers" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :provider, :string
    field :token, :string

    timestamps()
  end

  @doc false
  def changeset(g_user, attrs) do
    g_user
    |> cast(attrs, [:first_name, :last_name, :email, :provider, :token])
    |> validate_required([:first_name, :last_name, :email, :provider, :token])
  end
end
