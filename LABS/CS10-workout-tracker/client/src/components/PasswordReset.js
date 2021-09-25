import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from "../actions";
import { Button, Form, FormGroup, Input } from "reactstrap";

class PasswordReset extends Component {
  state = {
    newPassword: "",
    confirmNewPassword: "",
    errors: {}
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get("token");
    const { newPassword, confirmNewPassword } = this.state;
    const newErrors = {};

    if (newPassword.trim().length < 6) {
      newErrors.newPassword = "New Password must be at least 6 characters";
    }

    if (newPassword.trim() === "") {
      newErrors.newPassword = "New Password is Required";
    }

    if (confirmNewPassword.trim() === "") {
      newErrors.confirmNewPassword = "Confirm Password is Required";
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      newErrors.newPassword = "Must match Confirm Password";
      newErrors.confirmNewPassword = "Must match Password";
    }

    if (Object.keys(newErrors).length > 0) {
      return this.setState({ errors: newErrors });
    }

    if (newPassword === confirmNewPassword) {
      this.props.resetPassword(
        {
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
          token: token
        },
        this.props.history
      );
    }
    console.log(token);
    this.setState({
      newPassword: "",
      confirmNewPassword: "",
      errors: {}
    });
  };

  render() {
    const newPasswordErrors = this.state.errors.newPassword ? (
      <span className="form__validation">{this.state.errors.newPassword}</span>
    ) : null;

    const confirmPasswordErrors = this.state.errors.confirmNewPassword ? (
      <span className="form__validation">
        {this.state.errors.confirmNewPassword}
      </span>
    ) : null;

    return (
      <div className="password-reset-outer">
        <div className="password-reset-container">
          <div className="forms-container">
            <div className="single-form-container">
              <Form
                className="password-reset-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup row>
                  <Input
                    className="pw-reset-input"
                    type="password"
                    name="newPassword"
                    placeholder="Password"
                    value={this.state.newPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                {newPasswordErrors ? (
                  newPasswordErrors
                ) : this.props.valError.message ? (
                  <span className="form__validation">
                    {this.props.valError.message}
                  </span>
                ) : null}
                <FormGroup row>
                  <Input
                    className="pw-reset-input"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                {confirmPasswordErrors ? confirmPasswordErrors : null}
                <Button className="submit-btn" size="sm" type="submit">
                  Set New Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.currentUser,
    msg: state.auth.message,
    valError: state.valError
  };
};

PasswordReset.propTypes = {
  userInfo: PropTypes.shape({
    token: PropTypes.string,
    user: PropTypes.object
  }),
  msg: PropTypes.string,
  resetPassword: PropTypes.func,
  valError: PropTypes.object
};

export default connect(
  mapStateToProps,
  { resetPassword }
)(PasswordReset);
