import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../store/action/userActions';
import { withRouter } from 'react-router-dom';

const ComposedComponent = WrappedComponent => {
  class HOCAuth extends Component {
    componentDidMount() {
      if (!this.props.loggedIn || !this.props.user) {
        const token = window.localStorage.getItem('Authorization');
        const userType = window.localStorage.getItem('UserType');
        if (token) {
          this.props.authenticate(token, userType, this.props.history);
        } else {
          this.props.history.push('/login');
        }
      }
    }

    render() {
      if (this.props.loggedIn) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <div />;
      }
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.userReducer.loggedIn,
      user: state.userReducer.user
    };
  };

  return withRouter(connect(mapStateToProps, { authenticate })(HOCAuth));
};

export default ComposedComponent;
