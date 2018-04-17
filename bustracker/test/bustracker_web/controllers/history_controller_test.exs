# defmodule BustrackerWeb.HistoryControllerTest do
#   use BustrackerWeb.ConnCase
#
#   alias Bustracker.Histories
#   alias Bustracker.Histories.History
#
#   @create_attrs %{destination: "some destination"}
#   @update_attrs %{destination: "some updated destination"}
#   @invalid_attrs %{destination: nil}
#
#   def fixture(:history) do
#     {:ok, history} = Histories.create_history(@create_attrs)
#     history
#   end
#
#   setup %{conn: conn} do
#     {:ok, conn: put_req_header(conn, "accept", "application/json")}
#   end
#
#   describe "index" do
#     test "lists all history", %{conn: conn} do
#       conn = get conn, history_path(conn, :index)
#       assert json_response(conn, 200)["data"] == []
#     end
#   end
#
#   describe "create history" do
#     test "renders history when data is valid", %{conn: conn} do
#       conn = post conn, history_path(conn, :create), history: @create_attrs
#       assert %{"id" => id} = json_response(conn, 201)["data"]
#
#       conn = get conn, history_path(conn, :show, id)
#       assert json_response(conn, 200)["data"] == %{
#         "id" => id,
#         "destination" => "some destination"}
#     end
#
#     test "renders errors when data is invalid", %{conn: conn} do
#       conn = post conn, history_path(conn, :create), history: @invalid_attrs
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end
#
#   describe "update history" do
#     setup [:create_history]
#
#     test "renders history when data is valid", %{conn: conn, history: %History{id: id} = history} do
#       conn = put conn, history_path(conn, :update, history), history: @update_attrs
#       assert %{"id" => ^id} = json_response(conn, 200)["data"]
#
#       conn = get conn, history_path(conn, :show, id)
#       assert json_response(conn, 200)["data"] == %{
#         "id" => id,
#         "destination" => "some updated destination"}
#     end
#
#     test "renders errors when data is invalid", %{conn: conn, history: history} do
#       conn = put conn, history_path(conn, :update, history), history: @invalid_attrs
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end
#
#   describe "delete history" do
#     setup [:create_history]
#
#     test "deletes chosen history", %{conn: conn, history: history} do
#       conn = delete conn, history_path(conn, :delete, history)
#       assert response(conn, 204)
#       assert_error_sent 404, fn ->
#         get conn, history_path(conn, :show, history)
#       end
#     end
#   end
#
#   defp create_history(_) do
#     history = fixture(:history)
#     {:ok, history: history}
#   end
# end
