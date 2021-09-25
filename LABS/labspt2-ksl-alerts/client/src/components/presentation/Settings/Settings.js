import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Button, Field, Form, Grid, Header, Input } from "semantic-ui-react";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      oldPassword: "",
      newPassword: "",
      phone: null
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // will need to an ajax post to update user settings
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="email"
          label="Email"
          control="input"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <Form.Input
          name="oldPassword"
          label="Old Password"
          control="input"
          type="password"
          value={this.state.oldPassword}
          onChange={this.handleInputChange}
        />
        <Form.Input
          name="newPassword"
          label="New Password"
          control="input"
          type="password"
          value={this.state.newPassword}
          onChange={this.handleInputChange}
        />
        <Form.Input
          name="phone"
          label="Phone Number"
          control="input"
          value={this.state.phone}
          onChange={this.handleInputChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

Settings.propTypes = {
  email: PropTypes.string,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  phone: PropTypes.number
};

export default Settings;
