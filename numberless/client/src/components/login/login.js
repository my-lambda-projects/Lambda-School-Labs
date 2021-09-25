import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';

import './login.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3030';

class Login extends Component {

  // The verifyUser function sends the info out to the server, where the password is checked against the 
  // encrypted password stored in the database

  verifyUser = (email, pass) => {
    const user = {email: email, password: pass};
    const activeUser = axios.post(`${SERVER_URL}/login/`, user);
    activeUser
      .then(returnedUser => {
        if (returnedUser.data._id) {
          sessionStorage.setItem('loggedIn', 'true')
          sessionStorage.setItem('user', `${returnedUser.data._id}`);
          if (returnedUser.data.admin === true) {
            this.props.history.push('admin');
          } else {
            this.props.history.push('voting')
          }
        }
      })
  }

  render() {
    return (
      <div className="loginContainer">
        <img className="logo" src={require('../static/logo.png')} alt="Numberless" />
        <div className="formBox">
          <Form>
            <FormGroup>
              <Input className="input" type="email" name="email" id="email" placeholder="Email"/>
            </FormGroup>
            <FormGroup>
              <Input className="input" type="password" name="password" id="password" placeholder="Password"/>
            </FormGroup>
            <div className="buttonBox">
              <Button className="stripeButton" onClick={ () => {
                let email = document.getElementById('email').value;
                let pass = document.getElementById('password').value;
                this.verifyUser(email, pass); 
              }}>Sign In</Button>
              <Button className="stripeButton" onClick={ () => {
                this.props.history.push('newuser');
              }}>Sign Up</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;