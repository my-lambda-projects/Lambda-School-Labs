/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { push } from 'react-router-redux';

import { authenticate, unauthenticate } from '../../actions/auth';

const mapDispatchToProps = (dispatch) => ({
  authenticate: (user, token) => dispatch(authenticate(user, token)),
  push: to => dispatch(push(to)),
  unauthenticate: () => dispatch(unauthenticate())
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authenticated: state.auth.authenticated
  };
};

const hasToken = () => !!(window.localStorage.getItem('token'));

const WithAuth = ProtectedComponent => {
  class Auth extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasToken: hasToken()
      }
    }
    componentDidMount() {
      const user = window.localStorage.getItem('user');
      const token = window.localStorage.getItem('token');
      if (user && token) {
        this.props.authenticate(JSON.parse(user), token);
        return;
      }
      this.props.push('/login'); 
    }
    render() {
      return this.props.authenticated ? <ProtectedComponent user={this.props.auth.user.username} logout={this.props.unauthenticate} /> : null;
      // return this.props.authenticated ? <ProtectedComponent logout={this.props.unauthenticate}/> : <Redirect to="/login" />;
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(Auth);
}




export default WithAuth;
