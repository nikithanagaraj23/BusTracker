# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Bustracker.Repo.insert!(%Bustracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


defmodule Seeds do
  alias Bustracker.Repo
  alias Bustracker.Users.User


  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", password_hash: p  })
    b = Repo.insert!(%User{ name: "bob", password_hash: p  })

  end
end

Seeds.run
