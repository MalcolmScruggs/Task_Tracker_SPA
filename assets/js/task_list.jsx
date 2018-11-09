import React from 'react';
import { connect } from 'react-redux';

import NewTask from './new_task';
import api from './api';

function TaskList(props) {
    let {tasks, dispatch} = props;
    let tsk = [];
    tasks.forEach((t, key) => {
        tsk.push(<Task key={key} dispatch={dispatch} task={t}/>)});
    return <div className="row">
        <div className="col-12">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#taskModalNew"}>New Task</button>
            <TaskModal id="taskModalNew" title="New Task" />
        </div>
        {tsk}
    </div>
}

function Task(props) {
    let {task, dispatch} = props;

    return <div className="col-12 col-md-6">
        <div className="card my-2">
            <div className="card-body">
                <h3 className="card-title">{task.title}</h3>
                <h5 className="card-subtitle text-muted">{task.desc}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Completed: {task.completed ? "yes" : "no"}</li>
                <li className="list-group-item">Time: {task.time ? task.time : "0"} min</li>
                <li className="list-group-item">Assigned: {task.assigned || "none"}</li>
            </ul>
            <div className="card-body">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#taskModal" + task.id}>Edit</button>
                <button type="button" className="btn btn-danger mx-2" onClick={() => {api.delete_task(task.id)}}>Delete</button>
            </div>
        </div>
        <TaskModal task={task} id={"taskModal" + task.id} title="Edit Task"/>
    </div>
}

function TaskModal(props) {
    let {task, id, title} = props;
    return <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id + "Label"} aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id={id + "Label"}>{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <NewTask task={task}/>
                </div>
            </div>
        </div>
    </div>
}

function state2props(state) {
    return {
        tasks: state.tasks,
        users: state.users
    }
}

export default connect(state2props)(TaskList);
