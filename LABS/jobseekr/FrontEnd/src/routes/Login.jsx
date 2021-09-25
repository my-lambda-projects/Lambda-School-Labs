import axios from 'axios';
import React, { Component } from 'react';
import { Header } from '../components/AllComponents';
import {
  Grid,
  Row,
  PageHeader,
  Col,
  Well,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import ROOT_URL from './config';

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSignIn = e => {
    e.preventDefault();
    let body = { ...this.state };
    axios
      .post(`${ROOT_URL}/login`, { email: body.email, password: body.password })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        this.props.history.push('/jobs');
      })
      .catch(() => {
        console.log('Incorrect email or password');
      });
  };

  render() {
    return (
      <div>
        <Header />
        <Grid className="SignInWrapper">
          <Row>
            <PageHeader>Sign In</PageHeader>
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
                  <Button onClick={e => this.handleSignIn(e)}>Sign In</Button>
                </form>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
