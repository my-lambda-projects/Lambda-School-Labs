import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeEmail, changePassword } from "../actions";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { TweenLite } from "gsap";
import validator from "validator";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      errors: {}
    };
    this.myTween = null;
    this.animateSettings = null;
  }

  componentDidMount() {
    this.myTween = TweenLite.from(this.animateSettings, 1, { y: 100, opacity: 0});
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEmailSubmit = event => {
    event.preventDefault();
    const { email } = this.state;
    const newErrors = {};
    if (!validator.isEmail(email.trim())) {
      newErrors.email = "Must be valid email";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (Object.keys(newErrors).length > 0) {
      return this.setState({ errors: newErrors });
    }

    this.props.changeEmail({
      username: this.props.userInfo.user.username,
      newEmail: this.state.email
    });
    this.setState({
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      errors: {}
    });
  };

  handlePasswordSubmit = event => {
    event.preventDefault();
    const { password, newPassword, confirmNewPassword } = this.state;
    const newErrors = {};

    if (password === "") {
      newErrors.password = "Current Password is required";
    }

    if (newPassword.trim().length < 6) {
      newErrors.newPassword = "New Password must be at least 6 characters";
    }

    if (newPassword.trim() === "") {
      newErrors.newPassword = "New Password is Required";
    }

    if (confirmNewPassword.trim() === "") {
      newErrors.confirmNewPassword = "Confirm New Password is Required";
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      newErrors.newPassword = "Must match Confirm Password";
      newErrors.confirmNewPassword = "Must match Password";
    }

    if (Object.keys(newErrors).length > 0) {
      return this.setState({ errors: newErrors });
    }

    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.changePassword({
        username: this.props.userInfo.user.username,
        password: this.state.password,
        newPassword: this.state.newPassword,
        confirmNewPassword: this.state.confirmNewPassword
      });
    }
    this.setState({
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      errors: {}
    });
  };

  render() {
    const emailErrors = this.state.errors.email ? (
      <span className="form__validation">{this.state.errors.email}</span>
    ) : null;

    const passwordErrors = this.state.errors.password ? (
      <span className="form__validation">{this.state.errors.password}</span>
    ) : null;

    const newPasswordErrors = this.state.errors.newPassword ? (
      <span className="form__validation">{this.state.errors.newPassword}</span>
    ) : null;

    const confirmPasswordErrors = this.state.errors.confirmNewPassword ? (
      <span className="form__validation">
        {this.state.errors.confirmNewPassword}
      </span>
    ) : null;

    return (
      <div className="settings-outer" ref={div => this.animateSettings = div}>
        <div className="settings-container">
          <div className="forms-container">
            <div className="single-form-container">
              <Form className="email-form" onSubmit={this.handleEmailSubmit}>
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="text"
                    name="email"
                    placeholder={this.props.userInfo.user.email}
                    value={this.state.email}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                {emailErrors ? (
                  emailErrors
                ) : this.props.valError.message ? (
                  <span className="form__validation">
                    {this.props.valError.message}
                  </span>
                ) : null}
                <Button className="submit-btn" size="sm" type="submit">
                  Change Email
                </Button>
              </Form>
            </div>
            <div className="single-form-container">
              <Form
                className="password-form"
                onSubmit={this.handlePasswordSubmit}
              >
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                {passwordErrors ? (
                  passwordErrors
                ) : this.props.valError.error ? (
                  <span className="form__validation">
                    {this.props.valError.error}
                  </span>
                ) : null}
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={this.state.newPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                {newPasswordErrors ? newPasswordErrors : null}
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                {confirmPasswordErrors ? confirmPasswordErrors : null}
                <Button className="submit-btn" size="sm" type="submit">
                  Save Password
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
    msg: state.user.message,
    valError: state.valError
  };
};

Settings.propTypes = {
  userInfo: PropTypes.shape({
    token: PropTypes.string,
    user: PropTypes.object
  }),
  msg: PropTypes.string,
  changeEmail: PropTypes.func,
  changePassword: PropTypes.func
};

export default connect(
  mapStateToProps,
  { changeEmail, changePassword }
)(Settings);
