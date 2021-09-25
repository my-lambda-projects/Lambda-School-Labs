import React, { Component } from "react";
import { connect } from "react-redux";

import { updateUser } from "../../store/User/actions.js";

import { Input, Button, Checkbox, Segment } from "semantic-ui-react";
import {
  SettingsContainer,
  FormItem,
  FormRow,
  Form,
  CheckboxContainer,
  SettingsHeader,
} from "../../styles/Settings.js";

class Settings extends Component {
  state = {
    email: "",
    phone_number: "",
    email_enabled: false,
    text_enabled: false,
    old_password: "",
    password: "",
    re_password: "",
  };

  componentDidMount() {
    this.setState({
      email: this.props.email,
      phone_number: this.props.phone_number,
      email_enabled: this.props.email_enabled,
      text_enabled: this.props.text_enabled,
    });
  }

  submitForm = event => {
    event.preventDefault();
    this.props.updateUser(
      this.state.email,
      this.state.phone_number,
      this.state.email_enabled,
      this.state.text_enabled,
      this.state.old_password,
      this.state.password,
      this.state.re_password
    );
  };

  inputChangeHandler = (event, data) => {
    const target = data ? data : event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SettingsContainer>
        <SettingsHeader>Settings</SettingsHeader>
        <Segment padded="very">
          <Form onSubmit={this.submitForm}>
            <FormRow>
              <FormItem>
                <h5>Email</h5>
                <Input
                  fluid
                  value={this.state.email}
                  onChange={this.inputChangeHandler}
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  type="text"
                />
              </FormItem>
              <FormItem>
                <h5>Phone</h5>
                <Input
                  fluid
                  value={this.state.phone_number}
                  onChange={this.inputChangeHandler}
                  name="phone_number"
                  icon="phone"
                  iconPosition="left"
                  type="text"
                />
              </FormItem>
            </FormRow>
            <CheckboxContainer>
              <h5>Receive Emails?</h5>
              <Checkbox
                toggle
                checked={this.state.email_enabled}
                onChange={this.inputChangeHandler}
                type="checkbox"
                name="email_enabled"
              />
            </CheckboxContainer>
            <CheckboxContainer>
              <h5>Receive Texts?</h5>
              <Checkbox
                toggle
                checked={this.state.text_enabled}
                onChange={this.inputChangeHandler}
                type="checkbox"
                name="text_enabled"
              />
            </CheckboxContainer>
            <FormRow>
              <FormItem>
                <h5>New Password</h5>

                <Input
                  fluid
                  value={this.state.password}
                  onChange={this.inputChangeHandler}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  type="password"
                />
              </FormItem>
              <FormItem>
                <h5>Retype New Password</h5>
                <Input
                  fluid
                  value={this.state.re_password}
                  onChange={this.inputChangeHandler}
                  name="re_password"
                  icon="lock"
                  iconPosition="left"
                  type="password"
                />
              </FormItem>
            </FormRow>
            <FormItem>
              <h5>Old Password</h5>
              <Input
                fluid
                value={this.state.old_password}
                onChange={this.inputChangeHandler}
                name="old_password"
                icon="lock"
                iconPosition="left"
                type="password"
              />
            </FormItem>
            <Button type="submit" size="large" fluid>
              Save
            </Button>
          </Form>
        </Segment>
      </SettingsContainer>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.user.errors) {
    errors = Object.keys(state.user.errors).map(field => {
      return { field, message: state.user.errors[field] };
    });
  }

  const userProfile = state.user.currentUser;
  //TODO: check for empty profile - error
  return {
    errors,

    email: userProfile.user.email,
    phone_number: userProfile.phone_number,
    email_enabled: userProfile.email_enabled,
    text_enabled: userProfile.text_enabled,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (
      email,
      phone,
      email_enabled,
      text_enabled,
      old_password,
      password,
      re_password
    ) => {
      return dispatch(
        updateUser(
          email,
          phone,
          email_enabled,
          text_enabled,
          old_password,
          password,
          re_password
        )
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
