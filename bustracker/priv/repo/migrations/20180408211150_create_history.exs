defmodule Bustracker.Repo.Migrations.CreateHistory do
  use Ecto.Migration

  def change do
    create table(:history) do
      add :destination, :text
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:history, [:user_id])
  end
end
