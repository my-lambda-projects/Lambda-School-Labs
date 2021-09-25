import React, { Component } from 'react';

import { withFirebase } from '../firebase';


const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  successMessage: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE, successMessage : "Password reset email is sent" });
      })
      .catch(error => {
        this.setState({ ...INITIAL_STATE, error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {this.state.successMessage}
        {error && <p> {error.message}</p>}
      </form>
    );
  }
}

// const PasswordForgetLink = () => (
//   <p>
//     <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
//   </p>
// );

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm
    // , PasswordForgetLink 
};