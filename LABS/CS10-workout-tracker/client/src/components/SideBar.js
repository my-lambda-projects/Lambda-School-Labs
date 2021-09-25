import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { logout } from "../actions";

class SideBar extends Component {
  handleLogout = event => {
    this.props.logout();
  };
  render() {
    const { authenticated } = this.props;
    return (
      <div className="sideBar">
        <div className="sideBar__Links" id="test">
          {authenticated && (
            <div>
              <NavLink exact to="/schedule">
                <div className="side__box">Calendar</div>
              </NavLink>
              <NavLink exact to="/workouts">
                <div className="side__box">Workouts</div>
              </NavLink>
              <NavLink exact to="/progress">
                <div className="side__box">Progress</div>
              </NavLink>
              <NavLink exact to="/settings">
                <div className="side__box">Settings</div>
              </NavLink>
              <NavLink exact to="/billing">
                <div className="side__box">Billing</div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authed
  };
};

SideBar.propTypes = {
  authenticated: PropTypes.bool,
  logout: PropTypes.func
};

export default connect(
  mapStateToProps,
  { logout }
)(SideBar);
