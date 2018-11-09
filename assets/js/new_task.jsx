import React from 'react';

import api from './api';
import { Link, Redirect } from 'react-router-dom';

export default class NewTask extends React.Component {
    constructor(props) {
        super(props);

        let {task} = props;
        this.state = {
            id: task.id,
            title: task.title,
            desc: task.desc,
            completed: task.completed,
            time: task.time || 0,
            assigned: task.assigned || "",
            redirect: false
        };

        this.changeTitle = this.changeTitle.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changeCompleted = this.changeCompleted.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changeAssigned = this.changeAssigned.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeTitle(ev) {
        this.setState({title: ev.target.value});
    }

    changeDesc(ev) {
        this.setState({desc: ev.target.value});
    }

    changeCompleted(ev) {
        this.setState({completed: ev.target.checked});
    }

    changeTime(ev) {
        this.setState({time: ev.target.value});
    }

    changeAssigned(ev) {
        this.setState({assigned: ev.target.value});
    }

    handleSubmit(ev) {
        if (this.state.id) {
            api.edit_task(this.state);
        } else {
            api.new_task(this.state);
            this.setState(newTask);
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return <div className="col-12">
            {this.renderRedirect()}
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" required="true"
                     value={this.state.title} onChange={this.changeTitle}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" required="true"
                           value={this.state.desc} onChange={this.changeDesc}/>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                               checked={this.state.completed} onChange={this.changeCompleted}/>
                        Completed
                    </label>
                </div>
                <div className="form-group">
                    <label>Time</label>
                    <input type="number" className="form-control" min="0" step="15"
                           value={this.state.time} onChange={this.changeTime}/>
                </div>
                <div className="form-group">
                    <label className="form-check-label">Assigned</label>
                    <input type="email" className="form-control"
                           value={this.state.assigned} onChange={this.changeAssigned}/>
                </div>

                <Link to={"/"} className="btn btn-primary" onClick={this.handleSubmit} data-dismiss="modal"
                      style={{ color: '#fff', textDecoration: 'none'}}>Submit</Link>
            </form>
        </div>
    }
}

const newTask = {
    id: null,
    title: "",
    desc: "",
    completed: false,
    time: 0,
    assigned: ""
};

NewTask.defaultProps = {
    task: newTask
};