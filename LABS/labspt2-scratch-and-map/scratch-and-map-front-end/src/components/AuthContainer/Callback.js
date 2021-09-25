import React, { Component } from "react";
import Auth from "./Auth";
let Spinner = require("react-spinkit");

export default class Callback extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication();
  }
  render() {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
}
