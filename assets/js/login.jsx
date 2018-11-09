import React from 'react';
import { Link } from 'react-router-dom';

import api from './api';
import NewUser from './new_user';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.email,
            password: props.password
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeEmail(ev) {
        this.setState({email: ev.target.value});
    }

    changePassword(ev) {
        this.setState({password: ev.target.value});
    }

    handleSubmit(ev) {
        api.create_session(this.state.email, this.state.password);
    }

    render() {
        return <div className="col-8">
            <form className="form-inline">
                <div className="input-group mb-2 mr-sm-2">
                    <input type="email" className="form-control" id="inputEmail"
                           onChange={this.changeEmail} value={this.state.email} placeholder="Email"/>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                    <input type="password" className="form-control" id="inputPassword"
                           onChange={this.changePassword} value={this.state.password} placeholder="Password" />
                </div>
                <div className="btn btn-primary mb-2 mx-2" onClick={this.handleSubmit}>Login</div>

                <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#newUserModal">Create Account</button>
            </form>
            <div className="modal fade" id="newUserModal" tabIndex="-1" role="dialog" aria-labelledby="newUserModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newUserModalLabel">Register User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <NewUser />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

Login.defaultProps = {
    email: "",
    password: ""
};