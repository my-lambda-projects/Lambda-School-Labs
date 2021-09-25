import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, FormGroup } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import "../css/register.css";

import { loginUser } from "../actions";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: false,
    errorMsg: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: false });

    if (!this.state.username || !this.state.password) {
      this.setState({
        error: true,
        errorMsg: "Need to provide a username and password"
      });
    } else {
      this.props.loginUser(this.state);
    }

    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup className = "loginReg">
                  <h1>Login</h1>
                  <Input
                    type="text"
                    name="username"
                    value={ this.state.username }
                    onChange={ this.handleInputChange }
                    placeholder="Username"
                  />
                  <Input
                    type="password"
                    name="password"
                    value={ this.state.password }
                    onChange={ this.handleInputChange }
                    placeholder="Password"
                  />
                  <div className="func-btn">
                    <Button onClick={ this.handleSubmit } type="submit">Login</Button>
                    <Link to={ "/" }>
                      { " " }
                      <Button>Home</Button>
                    </Link>
                  </div>
                </FormGroup>
              </Form>
              <div>
                { this.state.error ? <p>{ this.state.errorMsg }</p> : null }
              </div>
              <div>
                { this.props.state.error ? (
                  <p>{ this.props.state.errorMsg }</p>
                ) : null }
              </div>
              <div>
                { this.props.state.redirect ? <Redirect to="/classes" /> : null }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
