import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { MainNav } from "./Nav.styles";

export default class Nav extends Component {
  render() {
    return (
      <MainNav>
        <div className="nav-link">
          <Link to="/public">View Profiles</Link>
        </div>
        {this.props.auth.isAuthenticated() ? (
          <Fragment>
            <div className="nav-link">
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="nav-link">
              <a
                href="/"
                onClick={() => this.props.auth.logout({ ...this.props })} >
                Logout
              </a>
            </div>
          </Fragment>
        ) : (
          <div className="nav-link">
            <a onClick={this.props.auth.login}>
              Sign Up / Sign In
            </a>
          </div>
        )}
      </MainNav>
    );
  }
}
