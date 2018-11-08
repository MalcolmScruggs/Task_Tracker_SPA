defmodule TasksSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :assigned, :string
    field :completed, :boolean, default: false
    field :desc, :string
    field :time, :integer
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:assigned, :completed, :desc, :time, :title])
    |> validate_required([:completed, :desc, :title])
  end
end
