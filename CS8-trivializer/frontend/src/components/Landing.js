import React, { Component } from "react";
import Button from "./UI/Button.js";
import { withRouter } from "react-router";

import { LandingWrapper } from './primitives/Landing.js';

class Landing extends Component {
  signUpRouteClick = () => {
    this.props.history.push("/sign-up");
  };
  signInRouteClick = () => {
    this.props.history.push("/sign-in");
  };
  render() {
    return (
      <LandingWrapper>
        <button onClick={this.signUpRouteClick}>Sign Up</button>
        <button onClick={this.signInRouteClick}> Sign In</button>
      </LandingWrapper>
    );
  }
}
export default withRouter(Landing);
