import React from 'react';

import api from './api';
import { Link, Redirect } from 'react-router-dom';

export default class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: ""
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeConfPw = this.changeConfPw.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeEmail(ev) {
        this.setState({email: ev.target.value});
    }

    changePassword(ev) {
        this.setState({password: ev.target.value});
    }

    changeConfPw(ev) {
        this.setState({password_confirmation: ev.target.value});
    }

    handleSubmit(ev) {
        api.new_user(this.state);
    }

    render() {
        return <div>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" required={true}
                           value={this.state.email} onChange={this.changeEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" required={true}
                           value={this.state.password} onChange={this.changePassword}/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" required={true}
                           value={this.state.confPw} onChange={this.changeConfPw}/>
                </div>

                <Link to={"/"} className="btn btn-primary" onClick={this.handleSubmit} data-dismiss="modal"
                      style={{ color: '#fff', textDecoration: 'none'}}>Register</Link>
            </form>
        </div>
    }

}