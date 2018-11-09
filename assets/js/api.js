import store from './store';

class TheServer {
    fetch_path(path, callback) {
        $.ajax(path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: callback,
        });
    }

    fetch_tasks() {
        this.fetch_path(
            "/api/v1/tasks",
            (resp) => {
                store.dispatch({
                    type: 'TASK_LIST',
                    data: resp.data,
                });
            }
        )
    }

    fetch_users() {
        this.fetch_path(
            "/api/v1/users",
            (resp) => {
                store.dispatch({
                    type: 'USER_LIST',
                    data: resp.data
                   });
            }
        )
    }

    send_post(path, data, callback, errorCallback) {
        $.ajax(path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
            error: errorCallback
        });
    }

    new_task(task) {
        this.send_post(
            "/api/v1/tasks",
            {task: task},
            (resp) => {
                this.fetch_tasks();
            },
            (resp) => {
                alert("Failed to create new task");
            }
        )
    }

    new_user(user) {
        this.send_post(
            "/api/v1/users",
            {user: user},
            (resp) => {
                this.create_session(user.email, user.password)
            },
            (resp) => {
                alert("Failed to create user");
            }
        )
    }

    create_session(email, password) {
        this.send_post(
            "/api/v1/sessions",
            {email, password},
            (resp) => {
                store.dispatch({
                    type: 'NEW_SESSION',
                    data: resp.data,
                    });
            },
            (resp) => {
                alert("Login failed")
            }
        )
    }

    end_session() {
        store.dispatch({ type: 'END_SESSION' });
    }

    send_patch(path, data, callback) {
        $.ajax(path, {
            method: "patch",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
        });
    }

    edit_task(task) {
        this.send_patch(
            `/api/v1/tasks/${task.id}`,
            {task: task},
            (resp) => {
                this.fetch_tasks();
            }
        )
    }

    delete_task(id) {
        $.ajax('/api/v1/tasks/' + id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: (resp) => {
                store.dispatch({
                    type: 'TASK_DELETE',
                    task_id: id,
                })
            }
        });
    }
}

export default new TheServer();