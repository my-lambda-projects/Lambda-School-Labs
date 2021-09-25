import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isLoggedIn } from '../../utils/helper/helperFuncions';

import './SignUp.css';

import '../../utils/Images/signUpPage.svg';

const URL = process.env.REACT_APP_URL;
const dev = process.env.REACT_APP_DEV;
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordComfirm: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.props.history.push('/home');
      window.location.reload();
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // check the username are not empty
    if (this.state.username) {
      // check the password field is not empty
      if (!this.state.password) {
        this.setState({ errorMessage: 'Please enter a password' });
        return; // terminates the handle function function
      } if (this.state.password.length < 8) {
        this.setState({ errorMessage: 'Please enter a password that is 8 characters or longer' });
        return;
      }
      // check if the passwords match
      if (this.state.password !== this.state.passwordComfirm) {
        this.setState({ errorMessage: 'The password does not match' });
      } else {
        // ready to sign up
        const user = {
          username: this.state.username,
          password: this.state.password,
        };
        axios
          .post(`${URL}user_admin/users/`, user)
          .then((response) => {
            // set the token to local storage
            localStorage.setItem('token', response.data.token);

            // reset the fields
            this.setState({
              username: '',
              password: '',
              passwordComfirm: '',
              errorMessage: '',
            });

            this.props.history.push('/home');
            window.location.reload();
          })
          .catch((err) => {
            if (err.response.status === 400) {
              this.setState({
                errorMessage: 'Username already exists. Please choose another Username',
              });
            }
            dev ? console.log(err) : console.log();
          });
      }
    } else {
      this.setState({ errorMessage: 'Please enter a username' });
    }
  };

  render() {
    return (
      <div className="SignUp">
        <div className="SignUp-Text">
          <p>Be ready.</p>
          <p>Be organized.</p>
          <p>
            Be
            <span className="bold"> Falcano</span>
          </p>
        </div>
        <div className="SignUp-card">
          <div className="SignUp-CardText">Welcome to the tribe!</div>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
              type="text"
              className="form-control"
              placeholder="Username"
            />

            <input
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              type="password"
              className="form-control"
              placeholder="password"
            />

            <input
              onChange={this.handleChange}
              value={this.state.passwordComfirm}
              name="passwordComfirm"
              type="password"
              className="form-control"
              placeholder="confirm password"
            />

            <button>Sign Up</button>
            <div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
          </form>
          <Link className="SignUp-right" to="/SignIn">

            LogIn
          </Link>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  passwordComfirm: PropTypes.string,
};

export default SignUp;
