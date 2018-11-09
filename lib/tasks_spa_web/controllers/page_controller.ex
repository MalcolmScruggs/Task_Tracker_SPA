defmodule TasksSpaWeb.PageController do
  use TasksSpaWeb, :controller

  def index(conn, _params) do
    tasks = TasksSpa.Tasks.list_tasks()
    |> Enum.map(&Map.take(&1, [:id, :title, :desc, :time, :completed, :assigned]))
    render conn, "index.html", tasks: tasks
  end
end
