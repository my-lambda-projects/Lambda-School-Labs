// Dependencies
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./AccountSideBar.css";


class AccountSideBar extends Component {
  render() {
    return (
      <div className="accountSideBar">
        <NavLink
          to={"/Search"}
          activeClassName="selected"
          activeStyle={{
            fontWeight: "bold",
            background: "lightgrey"
          }}
        >
          <h1>Search</h1>
        </NavLink>
        <NavLink
          to={"/ProjectList"}
          activeClassName="selected"
          activeStyle={{
            fontWeight: "bold",
            background: "lightgrey"
          }}
        >
          <h1>My Projects</h1>
        </NavLink>
        <NavLink
          to={"/ReviewList"}
          activeClassName="selected"
          activeStyle={{
            fontWeight: "bold",
            background: "lightgrey"
          }}
        >
          <h1>My Reviews</h1>
        </NavLink>
        <NavLink
          to={"/Settings"}
          activeClassName="selected"
          activeStyle={{
            fontWeight: "bold",
            background: "lightgrey"
          }}
        >
          <h1>Settings</h1>
        </NavLink>
      </div>
    );
  }
}

export default AccountSideBar;
