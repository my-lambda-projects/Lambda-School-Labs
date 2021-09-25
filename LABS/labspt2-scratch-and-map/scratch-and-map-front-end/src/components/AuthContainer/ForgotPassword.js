import React, { Component } from "react";


class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="auth-wrapper">
      <p>Enter your Username or Email below to reset password</p>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="input-wrapper">
              <label className="login-label">Username or email</label>
              <input
                className="login-input"
                name="username" //how to add a second name for email?
                value={this.state.username}
                placeholder=""
                onChange={this.handleInputChange}
                type="text"
              />
            </div>

            <div className="input-wrapper">
              <button
                className="login-btn"
                type="submit"
                onClick={this.props.submit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
