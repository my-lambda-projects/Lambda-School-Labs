import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, loginWithToken } from "../actions";
import LandingPage from "./Landing/LandingPage";

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        const token = localStorage.getItem("token");
        if (token) this.props.loginWithToken(token);
      }
    }

    render() {
      return (
        <div>
          {this.props.authenticated ? <ComposedComponent /> : <LandingPage />}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authed
    };
  };

  RequireAuthentication.propTypes = {
    authenticated: PropTypes.bool,
    login: PropTypes.func,
    loginWithToken: PropTypes.func
  };

  return connect(
    mapStateToProps,
    { login, loginWithToken }
  )(RequireAuthentication);
};
