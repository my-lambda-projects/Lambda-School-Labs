import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotLoggedIn extends Component {
  render() {
    return (
      <div>
        <Link to="/">please log in</Link>
      </div>
    );
  }
}
