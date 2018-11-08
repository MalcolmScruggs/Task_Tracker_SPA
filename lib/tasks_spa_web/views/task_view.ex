defmodule TasksSpaWeb.TaskView do
  use TasksSpaWeb, :view
  alias TasksSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      assigned: task.assigned,
      completed: task.completed,
      desc: task.desc,
      time: task.time,
      title: task.title}
  end
end
