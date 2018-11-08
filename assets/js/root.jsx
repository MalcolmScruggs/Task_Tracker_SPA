import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import api from './api';
import TaskList from './task_list';
import NewTask from './new_task';

export default function root_init(node, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Root tasks={window.tasks} />
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        };

        api.fetch_tasks();
        api.fetch_users();
    }

    render() {
        return <div>
            <Router>
                <div>
                    <Header />
                    <Route path="/" exact={true} render={() =>
                        <TaskList />
                    }/>
                    <Route path="/newtask" exact={true} render={() =>
                        <div>
                            <div className="col-12"><h2>New Task</h2></div>
                            <NewTask />
                        </div>
                    } />
                </div>
            </Router>
        </div>
    }
}

function Header(props) {
    return <div className="row my-2">
        <div className="col-6">
            <h1><Link to={"/"}>Task List</Link></h1>
        </div>
        <div className="col-6">
            <div className="form-inline my-2">
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button className="btn btn-secondary">Login</button>
            </div>
        </div>
    </div>;
}
