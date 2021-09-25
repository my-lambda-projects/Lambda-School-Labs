import React, { Component } from 'react';
import {
  Grid,
  Row,
  PageHeader,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Well,
  HelpBlock,
} from 'react-bootstrap';
import axios from 'axios';
import ROOT_URL from './config';

export default class SignUp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSignUp = e => {
    e.preventDefault();
    let body = { ...this.state };
    if (body.password !== body.confirmPassword) {
      alert('Your passwords must match');
    } else {
      axios
        .post(`${ROOT_URL}/signup`, {
          email: body.email,
          password: body.confirmPassword,
        })
        .then(result => {
          localStorage.setItem('token', result.data.token);
          this.props.history.push('/jobs');
        })
        .catch(error => {
          console.log('Error creating user');
        });
    }
  };

  validateMatchingPassword(password) {
    if (password.length === 0) return null;
    else if (password === this.state.password) return 'success';
    return 'warning';
  }

  render() {
    return (
      <div>
        <Grid className="SignUpWrapper">
          <Row>
            <PageHeader>Sign Up</PageHeader>
            <Col xs={8} md={4}>
              <Well>
                <form>
                  <FormGroup controlId="formControlsEmail">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="email"
                      value={this.state.email}
                      placeholder="Enter Email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <HelpBlock>Must use a valid email address.</HelpBlock>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formControlsPassword">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.password}
                      placeholder="Enter Password"
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup
                    controlId="formControlsConfirmPassword"
                    validationState={this.validateMatchingPassword(this.state.confirmPassword)}
                  >
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.confirmPassword}
                      placeholder="Confirm Password"
                      onChange={e => this.setState({ confirmPassword: e.target.value })}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Both passwords must match each other.</HelpBlock>
                  </FormGroup>
                  <Button onClick={e => this.handleSignUp(e)}>Sign Up</Button>
                </form>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
