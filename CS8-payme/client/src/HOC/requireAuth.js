import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autoLogin } from '../actions/auth';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentDidMount() {
      const token = localStorage.getItem('id');
      if (token) {
        this.props.autoLogin(token, this.props.history);
      } else {
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return connect(
    null,
    { autoLogin },
  )(RequireAuthentication);
};
