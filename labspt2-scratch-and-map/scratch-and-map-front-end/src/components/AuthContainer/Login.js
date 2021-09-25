import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
    // submitLogin(e) {
    //
    // }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="login-register-wrapper">
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="input-wrapper">
              <label className="login-label">Username or email</label>
              <input
                className="login-input"
                name="username" //how to add a second name for email?
                value={this.props.username}
                placeholder=""
                onChange={this.props.inputChange}
                type="text"
              />
            </div>

            <div className="input-wrapper">
              <label className="login-label">Password</label>
              <input
                className="login-input"
                name="password"
                value={this.props.password}
                placeholder=""
                onChange={this.props.inputChange}
                type="password"
              />
            </div>
            <div className="input-wrapper">
              <button
                className="login-btn"
                type="submit"
                onClick={this.props.submit}
              >
                Log in
              </button>
            </div>
            <a href="/forgotpassword" className="forgot-pwd">
              I forgot my password
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
