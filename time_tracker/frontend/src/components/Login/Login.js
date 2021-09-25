import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { logIn } from '../../store/action/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import TopBar from '../TopBar/TopBar';

class Login extends Component {
  state = {
    email: '',
    password: '',
    type: '',
    loggedIn: false
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.logIn(this.state);
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push('/dashboard/clients');
    }
  }

  render() {
    return (
      <div>
        <TopBar />
        <div
          style={{
            marginTop: 52
          }}
        >
          <Row>
            <Col
              style={{ fontSize: 20, fontStyle: 'strong', color: '#4c4b63' }}
            >
              Log in to track your hours and get paid
            </Col>
          </Row>
          <Row
            style={{
              marginTop: 52
            }}
          >
            <Col md="4" />
            <Col>
              <Form onSubmit={e => this.onSubmitHandler(e)}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    placeholder="your email"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    placeholder="your password"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Vendor or Client</legend>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="type"
                        value="vendor"
                        onChange={this.inputChangeHandler}
                        defaultChecked
                      />Vendor
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="type"
                        value="client"
                        onChange={this.inputChangeHandler}
                      />Client
                    </Label>
                  </FormGroup>
                </FormGroup>
                {this.props.loginError ? (
                  <div style={{ color: '#e3170a' }}>
                    Username, password, or Type not correct, Try again.
                  </div>
                ) : null}
                <Button style={{ backgroundColor: '#4c4b63' }}>Submit</Button>
              </Form>
            </Col>
            <Col md="4" />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md="4" />
            <Col>
              <div>Don't have an account?</div>
              <Button
                onClick={() => this.props.history.push('/signup')}
                style={{ backgroundColor: '#4c4b63' }}
              >
                Signup
              </Button>
            </Col>
            <Col md="4" />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.userReducer.loggedIn,
    loginError: state.userReducer.loginError
  };
};

export default withRouter(connect(mapStateToProps, { logIn })(Login));
