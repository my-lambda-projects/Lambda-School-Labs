import React, { Component, Fragment } from "react";
import { Card, CardBody, Button, Col, Label } from "reactstrap";
import axios from "axios";
import validator from "validator";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "",
      email: "",
      password: "",
      newEmail: "",
      validateEmail: "",
      validatePassword: "",
      invalidPass: ""
    };
  }

  componentDidMount() {
    const option = this.props.match.params.type;
    this.setState({ option });
  }
  handleSubmit = () => {
    let updates = {};
    if (
      this.state.password === this.state.validatePassword &&
      this.state.password !== ""
    ) {
      updates.password = this.state.password;
    } else {
      this.setState({ invalidPass: "Password did not match" });
    }
    if (
      this.state.email === this.state.validateEmail &&
      this.state.email !== ""
    ) {
      updates.email = this.state.email;
    }
    axios
      .put("https://dontemail.herokuapp.com/", updates)
      .then(resp => {})
      .catch(err => {
        console.log(err);
      });
  };

  returnHome = () => {
    this.setState({ option: "" });
    this.props.history.push("/dashboard");
  };

  required = value => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return "require";
    }
  };

  email = value => {
    if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`;
    }
  };

  renderInput = () => {
    if (this.state.option === "password") {
      return (
        <Fragment>
          <div>
            <form className="form animated bounce" onSubmit={this.handleSubmit}>
              <Label style={{ color: "white", letterSpacing: ".5ch" }}>
                Change Password
              </Label>
              <br />
              {this.validPass()}

              <input
                type="password"
                name="password"
                placeholder="Enter New Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="password"
                name="validatePassword"
                placeholder="Match Above Password"
                value={this.state.validatePassword}
                onChange={this.handleChange}
              />
              <br />
              {this.renderEmailValidation()}
            </form>
          </div>
        </Fragment>
      );
    } else if (this.state.option === "email") {
      return (
        <form className="form animated bounce" onSubmit={this.handleSubmit}>
          <Label style={{ color: "white", letterSpacing: ".2ch" }}>
            Change Email
          </Label>
          <br />
          {this.validEmailNotification()}
          <input
            name="email"
            placeholder="Change Email"
            value={this.state.email}
            onChange={this.handleChange}
            validations={[this.required, this.email]}
          />
          <br />
          <input
            name="validateEmail"
            placeholder="Match Above Email"
            value={this.state.validateEmail}
            onChange={this.handleChange}
          />
          <br />
          <br />
          {this.renderEmailValidation()}
        </form>
      );
    } else {
      return (
        <Card>
          <CardBody>Loading Options...</CardBody>
        </Card>
      );
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderEmailValidation = type => {
    if (type === "email") {
      if (validator.isEmail(this.state.email)) {
        return (
          <Button type="submit" onClick={() => this.handleSubmit()}>
            SAVE
          </Button>
        );
      } else {
        return <Button>Invalid</Button>;
      }
    } else {
      return <Button onClick={() => this.handleSubmit()}>Save</Button>;
    }
  };

  validEmailNotification = () => {
    if (
      !validator.isEmail(this.state.email) &&
      this.state.email !== "" &&
      this.state.email.length > 5
    ) {
      return <div className="danger">Invalid Email</div>;
    }
  };
  validPass = () => {
    if (this.state.invalidPass !== "") {
      return <div className="danger">{this.state.invalidPass}</div>;
    }
  };

  render() {
    const { auth } = this.props.context.userData;
    return (
      <Col className="form-bg" md="10">
        {auth ? (
          <div className="form-bg">
            <br />
            {this.renderInput()}
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </Col>
    );
  }
}

export default UserSettings;
