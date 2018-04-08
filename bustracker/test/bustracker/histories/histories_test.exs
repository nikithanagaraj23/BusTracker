defmodule Bustracker.HistoriesTest do
  use Bustracker.DataCase

  alias Bustracker.Histories

  describe "history" do
    alias Bustracker.Histories.History

    @valid_attrs %{destination: "some destination"}
    @update_attrs %{destination: "some updated destination"}
    @invalid_attrs %{destination: nil}

    def history_fixture(attrs \\ %{}) do
      {:ok, history} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Histories.create_history()

      history
    end

    test "list_history/0 returns all history" do
      history = history_fixture()
      assert Histories.list_history() == [history]
    end

    test "get_history!/1 returns the history with given id" do
      history = history_fixture()
      assert Histories.get_history!(history.id) == history
    end

    test "create_history/1 with valid data creates a history" do
      assert {:ok, %History{} = history} = Histories.create_history(@valid_attrs)
      assert history.destination == "some destination"
    end

    test "create_history/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Histories.create_history(@invalid_attrs)
    end

    test "update_history/2 with valid data updates the history" do
      history = history_fixture()
      assert {:ok, history} = Histories.update_history(history, @update_attrs)
      assert %History{} = history
      assert history.destination == "some updated destination"
    end

    test "update_history/2 with invalid data returns error changeset" do
      history = history_fixture()
      assert {:error, %Ecto.Changeset{}} = Histories.update_history(history, @invalid_attrs)
      assert history == Histories.get_history!(history.id)
    end

    test "delete_history/1 deletes the history" do
      history = history_fixture()
      assert {:ok, %History{}} = Histories.delete_history(history)
      assert_raise Ecto.NoResultsError, fn -> Histories.get_history!(history.id) end
    end

    test "change_history/1 returns a history changeset" do
      history = history_fixture()
      assert %Ecto.Changeset{} = Histories.change_history(history)
    end
  end
end
