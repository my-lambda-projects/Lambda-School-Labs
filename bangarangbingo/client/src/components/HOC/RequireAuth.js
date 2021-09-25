/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/auth';

import Header from '../header';

function ComposedComponent(WrappedComponent) {
  class RequireAuthentication extends Component {
    componentDidMount() {
      const user = window.localStorage.getItem('user');
      const token = window.localStorage.getItem('token');
      if (user && token) {
        this.props.authenticate(JSON.parse(user), token);
      } else {
        this.props.history.push('/login');
      }
    }
    render() {
      return (
        <div>
          <Header authenticated={this.props.authenticated} />
          <WrappedComponent history={this.props.history} />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    authenticate: (user, token) => dispatch(authenticate(user, token))
  });

  const mapStateToProps = (state) => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuthentication);
};

export default ComposedComponent;
