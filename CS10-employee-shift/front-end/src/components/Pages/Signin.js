import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { Segment, Input, Button, Form } from "semantic-ui-react";
import { Container, FormItem, Header } from "../../styles/Signin.js";

import { signin } from "../../store/User/actions.js";

class Signin extends Component {
  state = {
    username: "",
    password: "",
    // validated: false,
    errors: {},
  };

  handleValidation() {
    let errors = {};
    let formIsValid = true;
    let isEmail = false;

    //Username
    if (!this.state.username) {
      formIsValid = false;
      errors["username"] = "Username or Email is required";
    }

    if (this.state.username) {
      if (
        this.state.username.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        isEmail = true;
        // errors["username"] = "Valid email";
      }
    }

    // if(this.state.username){
    //   if(!this.state.username.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
    //       formIsValid = false;
    //       errors["username"] = "Invalid email";
    //   }
    // }

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "Password is required";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  submitHandler = e => {
    e.preventDefault();
    if (this.handleValidation())
      this.props.signin(this.state.username, this.state.password);
  };

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.props.isAuthenticated && this.props.user.currentUser) {
      if (this.props.user.currentUser.user.groups[0].name === "manager")
        return <Redirect to="/calendar" />;
      else return <Redirect to="/dashboard" />;
    } else
      return (
        <Container>
          <Segment raised padded="very">
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <Header>Welcome back!</Header>
              {this.props.errors && (
                <span style={{ color: "red" }}>
                  {this.props.errors.error_description}
                </span>
              )}
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
                    placeholder="Username or Email"
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
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["password"]}
                  </span>
                </FormItem>
                <FormItem>
                  <Button
                    color="blue"
                    fluid
                    size="large"
                    onClick={this.submitHandler}
                  >
                    Login
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
                New user? <Link to="/signup">Register</Link>
              </p>
            </div>
          </Segment>
        </Container>
      );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signin: (username, password) => {
      return dispatch(signin(username, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
