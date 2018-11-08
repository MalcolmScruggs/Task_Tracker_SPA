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

    send_post(path, data, callback) {
        $.ajax(path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
        });
    }

    new_task(task) {
        console.log("new task", task);
        this.send_post(
            "/api/v1/tasks",
            {task: task},
            (resp) => {
                console.log(resp);
                this.fetch_tasks();
            }
        )
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
        console.log("edit task", task);
        this.send_patch(
            `/api/v1/tasks/${task.id}`,
            {task: task},
            (resp) => {
                console.log(resp);
                this.fetch_tasks();
            }
        )
    }

    delete_task(id) {
        console.log("deleteTask", id);
        $.ajax('/api/v1/tasks/' + id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: (resp) => {
                console.log(resp);
                store.dispatch({
                    type: 'TASK_DELETE',
                    task_id: id,
                })
            }
        });
    }
}

export default new TheServer();