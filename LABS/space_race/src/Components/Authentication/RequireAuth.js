import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (this.props.authenticated ? <ComposedComponent /> : null);
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
      registered: state.auth.registered,
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};