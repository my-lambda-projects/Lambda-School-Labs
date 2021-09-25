import React, { Component } from 'react';
import axios from 'axios';
import {Button, Col, Form, Input} from "reactstrap";

export default class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: ''
    };
  }

  componentDidMount() {
    const cookie = localStorage.getItem('sessionCookie');
    if (!cookie) {
      this.props.history.push('/signup');
      return;
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.passwordOne !== this.state.passwordTwo) {
      alert("Passwords don't match!");
      this.setState({ passwordOne: '', passwordTwo: '', username: '' });
      return;
    } else {
      axios
        .post('/update-user', {
          username: this.state.username,
          password: this.state.passwordOne
        })
        .then(res => {
          res.data.success
            ? alert('Updated Password')
            : alert('Something went wrong');
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { passwordOne, passwordTwo, username } = this.state;

    const isInvalid =
      passwordOne === '' || passwordTwo === '' || username === '';

    return (

        <Form onSubmit={this.onSubmit}>

            <h2> Change Your Password </h2>
            <div className="label">Username:</div>
            <Input
              value={username}
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />


            <div className="label">New Password:</div>
            <Input
              value={passwordOne}
              onChange={this.handleChange}
              type="password"
              name="passwordOne"
              placeholder="New Password"
            />


            <div className="label">Confirm Password:</div>
            <Input
              value={passwordTwo}
              onChange={this.handleChange}
              type="password"
              name="passwordTwo"
              placeholder="Confirm Password"
            />

          <Button disabled={isInvalid} type="submit">
            Submit
          </Button>
        </Form>
    );
  }
}
