import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Login from './login';
import api from './api';

//Wrapper component to allow displaying based on session information
function LoginHead(props) {
    let {session, dispatch} = props;
    if (session) {
        return <div className="col-8">
            Logged in as: {session.user_email}
            <button className="btn btn-primary mx-2" onClick={() => api.end_session()}>Logout</button>
        </div>
    } else {
        return <Login />
    }

}

export default connect((state) => {return {session: state.session};})(LoginHead);