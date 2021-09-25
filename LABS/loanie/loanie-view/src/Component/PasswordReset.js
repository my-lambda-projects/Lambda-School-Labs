import React, { Component } from 'react';
import firebase from './Firebase';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      sent: false,
    };
  }

  handleEmailInput = (event) => {
    this.setState({ email: event.target.value });
  };

  submitPasswordReset = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        window.location = '/';
      })
      .catch((error) => {
        throw error;
      });
    this.setState({
      sent: !this.state.sent,
    });
  };

  render() {
    if (!this.state.sent) {
      return (
        <form>
          <fieldset>
            <legend>Reset your password</legend>
            Enter your email: <input type="text" name="email" onChange={this.handleEmailInput} />
            <br />
            <br />
            <button onClick={this.submitPasswordReset}>Submit</button>
          </fieldset>
        </form>
      );
    }
    return (
      <div>
        <h1>Recovery email sent..</h1>
        <br />
        <br />
      </div>
    );
  }
}
