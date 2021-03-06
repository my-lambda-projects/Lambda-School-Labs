//Sign up page view
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { auth } from "../../firebase";
import * as routes from "../Routes/routes";

const INITIAL_STATE = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const SignUpPage = ({ history }) => (
  <div className="container" style={formContainer}>
    <h2 className="subheader" style={{ textAlign:"center", color:"white", fontWeight:"bold" }}>Sign Up</h2>
    <SignUpView history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const formContainer = {
  width: "25%",
  margin: "0 auto",
};

class SignUpView extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, passwordOne } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        console.log(authUser.user.uid);

        const authUserInfo = {
          email: authUser.user.email,
          subscribed: false
        }

        axios
          .post(`${routes.TEACHER_URL}/addNewTeacher/${authUser.user.uid}`, authUserInfo)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })

        history.push(routes.SETTINGS);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      passwordTwo === "" ||
      email === "";

    return (
      <div style={{ margin: "1.25rem" }}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label style={{ color:"white", fontWeight:"bold" }}>Email</Label>
            <Input
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              type="text"
              style={{ marginTop: "0.3125rem", marginBottom: "0.9375rem" }}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ color:"white", fontWeight:"bold" }}>Password</Label>
            <Input
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
              type="password"
              style={{ marginTop: "0.3125rem", marginBottom: "0.9375rem" }}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ color:"white", fontWeight:"bold" }}>Confirm Password</Label>
            <Input
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey("passwordTwo", event.target.value))
              }
              type="password"
              style={{ marginTop: "0.3125rem", marginBottom: "0.9375rem" }}
            />
          </FormGroup>
          <Button
            color="primary"
            bsSize="large"
            style={{ margin:"0.9375rem 0", width:"100%", background:"#0284A8", fontWeight:"bold" }}
            disabled={isInvalid}
            type="submit"
          >
            Teacher Sign Up
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p className="bodyText" style={{ margin:"1.25rem auto", color:"white", textAlign:"center"}}>
    Don't have an account? <Link to={routes.SIGN_UP} style={{ color:"white", fontWeight: "bold"}}>Sign Up!</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpView, SignUpLink };
