import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Segment, Input, Button, Icon, Form } from "semantic-ui-react";
import { Container, FormItem, Header } from "../../styles/Signin.js";

import { signup, signin } from "../../store/User/actions.js";

// TODO: Add in asking about HoO and stuff.
// TODO: Needs more styling

class Signup extends Component {
  state = {
    username: "",
    password: "",
    re_password: "",
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    currentPage: 0,
    error: [false, false, false, false, false, false, false],
    errors: {},
  };

  handleValidation(currentPage) {
    let errors = {};
    let formIsValid = true;

    if (currentPage === 0) {
      if (!this.state.firstName) {
        formIsValid = false;
        errors["firstName"] = "First name is required";
      }

      if (!this.state.lastName) {
        formIsValid = false;
        errors["lastName"] = "Last name is required";
      }

      if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "Email is required";
      }

      if (this.state.email) {
        if (
          !this.state.email.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          formIsValid = false;
          errors["email"] = "Invalid email";
        }
      }

      if (!this.state.company) {
        formIsValid = false;
        errors["company"] = "Company name is required";
      }
    } else {
      if (!this.state.username) {
        formIsValid = false;
        errors["username"] = "Username is required";
      }
      if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "Password is required";
      }
      if (!this.state.re_password) {
        formIsValid = false;
        errors["re_password"] = "Retype Password is required";
      } else if (this.state.password !== this.state.re_password) {
        formIsValid = false;
        errors["re_password"] = "Password doesn't match";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  submitHandler = e => {
    // TODO: validate password
    e.preventDefault();
    const newError = [
      this.state.error[0],
      this.state.error[1],
      this.state.error[2],
      this.state.error[3],
      !this.state.username,
      !this.state.password,
      !this.state.re_password,
    ];
    this.setState({ error: newError });
    if (this.handleValidation(this.state.currentPage))
      this.props.signup(
        this.state.username,
        this.state.password,
        this.state.re_password,
        this.state.email,
        this.state.firstName,
        this.state.lastName,
        this.state.company
      );
  };

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  turnPageHandler = () => {
    const newError = [
      !this.state.firstName,
      !this.state.lastName,
      !this.state.email,
      !this.state.company,
      this.state.error[4],
      this.state.error[5],
      this.state.error[6],
    ];
    this.setState({ error: newError });
    if (this.handleValidation(this.state.currentPage))
      if (!newError[0] && !newError[1] && !newError[2] && !newError[3]) {
        if (this.state.currentPage === 0) this.setState({ currentPage: 1 });
        else this.setState({ currentPage: 0 });
      }
  };

  render() {
    if (this.props.isAuthenticated) {
      this.props.signin(this.state.username, this.state.password);
      return <Redirect to="/calendar" />;
    } else
      return (
        <Container>
          {this.state.currentPage === 0 ? (
            <Segment raised padded="very">
              <Header>Hi, nice to meet you!</Header>
              <Form onSubmit={this.turnPageHandler}>
                <FormItem>
                  <h3>First Name</h3>
                  <Input
                    fluid
                    value={this.state.firstName}
                    onChange={this.inputChangeHandler}
                    name="firstName"
                    icon="user"
                    iconPosition="left"
                    placeholder="First Name"
                    error={this.state.error[0]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["firstName"]}
                  </span>
                </FormItem>
                <FormItem>
                  <h3>Last Name</h3>
                  <Input
                    fluid
                    value={this.state.lastName}
                    onChange={this.inputChangeHandler}
                    name="lastName"
                    icon="user"
                    iconPosition="left"
                    placeholder="Last Name"
                    error={this.state.error[1]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["lastName"]}
                  </span>
                </FormItem>
                <FormItem>
                  <h3>Email</h3>
                  <Input
                    fluid
                    value={this.state.email}
                    onChange={this.inputChangeHandler}
                    name="email"
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    error={this.state.error[2]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["email"]}
                  </span>
                </FormItem>
                <FormItem>
                  <h3>Company</h3>
                  <Input
                    fluid
                    value={this.state.company}
                    onChange={this.inputChangeHandler}
                    name="company"
                    icon="building"
                    iconPosition="left"
                    placeholder="Company Name"
                    error={this.state.error[3]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["company"]}
                  </span>
                </FormItem>
                <FormItem>
                  <Button
                    color="blue"
                    fluid
                    size="large"
                    onClick={this.turnPageHandler}
                  >
                    Let's go!
                  </Button>
                </FormItem>
              </Form>
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Already have an account? <Link to="/signin">Login</Link>
              </p>
            </Segment>
          ) : (
            <Segment padded="very">
              <Icon link name="left arrow" onClick={this.turnPageHandler} />
              <Header>Almost there</Header>
              {this.props.errors &&
                Object.keys(this.props.errors.user).map(field => {
                  return this.props.errors.user[field].map(message => {
                    return <div style={{ color: "red" }}>{message}</div>;
                  });
                })}
              <Form onSubmit={this.submitHandler}>
                <FormItem>
                  <h3>Username</h3>
                  <Input
                    fluid
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    name="username"
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    error={this.state.error[4]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["username"]}
                  </span>
                </FormItem>
                <FormItem>
                  <h3>Password</h3>
                  <Input
                    fluid
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    name="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    error={this.state.error[5]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["password"]}
                  </span>
                </FormItem>
                <FormItem>
                  <h3>Confirm Password</h3>
                  <Input
                    fluid
                    value={this.state.re_password}
                    onChange={this.inputChangeHandler}
                    name="re_password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Re-type Password"
                    type="password"
                    error={this.state.error[6]}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["re_password"]}
                  </span>
                </FormItem>
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.submitHandler}
                >
                  Register
                </Button>
              </Form>
            </Segment>
          )}
        </Container>
      );
  }
}

const mapStateToProps = state => {
  // let errors = [];
  // if (state.user.errors) {
  //   errors = Object.keys(state.user.errors).map(field => {
  //     return { field, message: state.user.errors[field] };
  //   });
  // }
  return {
    errors: state.user.errors,
    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (
      username,
      password,
      re_password,
      email,
      firstName,
      lastName,
      company
    ) => {
      return dispatch(
        signup(
          username,
          password,
          re_password,
          email,
          firstName,
          lastName,
          company
        )
      );
    },
    signin: (username, password) => {
      return dispatch(signin(username, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
