
# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TasksSpa.Repo.insert!(%TasksSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TasksSpa.Repo
alias TasksSpa.Users.User
alias TasksSpa.Tasks.Task

Repo.insert!(%User{email: "jim@example.com", password_hash: "todo", admin: true})
Repo.insert!(%User{email: "alex@example.com", password_hash: "todo", admin: false})


Repo.insert!(%Task{title: "Homework", desc: "Do it", completed: false})
Repo.insert!(%Task{title: "Jim's Task", desc: "Jim Jim", completed: false, assigned: "jim@example.com"})