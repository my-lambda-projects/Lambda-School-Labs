import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
export default (ComposedComponent) => {
  class RequireAuthentication extends Component {
    static defaultProps = {
      reload: undefined,
    }
    static propTypes = {
      reload: PropTypes.func,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
    }
    componentWillMount() {
      if (!sessionStorage.getItem('token')) {
        this.props.history.replace('/signin');
      }
    }
    render() {
      /* eslint-disable no-mixed-operators */
      const token = sessionStorage.getItem('token');
      return (token && (token.length > 0)) === true ? (
        <ComposedComponent
          reload={this.props.reload}
          history={this.props.history}
          location={this.props.location}
        />
      ) : (
        <div />
      );
    }
  }
  return RequireAuthentication;
};
