// Main landing page for signing in and registering, will redirect to landing page of respective account

import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../actions";
import logo from "./mainatlas.PNG";
import "./MainLanding.css";
import SignUp from "../Sign-up/SignUp";
// import featJS from "./0.jpg";
// import featHP from "./amazon-logo.gif";
// import map from "./bigmapthing.PNG";
// import { FaBriefcase, FaCode } from "react-icons/fa";

class MainLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedin: false,
      modal: false
    };
  }
  render() {
    let modal = null;
    if (this.state.modal === true) {
      modal = (
        <div className="signup-modal">
          <div className="signup-container">
            <SignUp />
          </div>
        </div>
      );
    }
    return (
      <div className="main-landing">
        <div className="signin">
          <div>
            <div className="signin-form">
              <input
                className="emailInput"
                type="text"
                placeholder="E-mail"
                name="email"
                value={this.state.email}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div className="signpwd-form">
              <input
                className="pwdInput"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <button
            onClick={() => {
              this.props.login(
                {
                  email: this.state.email,
                  password: this.state.password
                },
                this.props.history
              );

              this.setState({ email: "", password: "" });
            }}
          >
            Sign In
          </button>
        </div>
        <div className="signup">
          <h5>Not a member?</h5>

          <button
            onClick={() => {
              this.setState({ modal: !this.state.modal });
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="logo">
          <img src={logo} className="HP" alt="Hire Partner" />
        </div>
        <div>{modal}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients,
    hirePartner: state.hirePartner,
    hiring_partner: state.hiring_partner
  };
};

export default connect(
  mapStateToProps,
  { login }
)(MainLanding);
