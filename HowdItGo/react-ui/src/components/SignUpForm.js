import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import axios from "axios";
import {Form, Input, Label, Button} from "reactstrap";




const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    displayName: ''
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmit = event => {
        event.preventDefault();
        const newUser = {
            displayName: this.state.displayName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.passwordOne
        };
        const { history } = this.props;
        axios
            .post(`/signup`, newUser)
            .then(res => {
                if (res.data.message) {
                    alert(res.data.message);
                } else {
                    window.location.href = "/signin";
                    alert(
                        'All Signed Up! You will be redirected to the sign in page!'
                    );
                    this.setState({
                        displayName: '',
                        username: '',
                        email: '',
                        passwordOne: '',
                        passwordTwo: ''
                    });
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
          <Form className="form" onSubmit={this.onSubmit}>
              <Input type="text" name="displayName" value={this.state.displayName} onChange={this.handleChange} placeholder="Display Name" />
              <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="User Name" />
              <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email Address" />
              <Input type="password" name="passwordOne" value={this.state.passwordOne} onChange={this.handleChange} placeholder="Password" />
              <Input type="password" name="passwordTwo" value={this.state.passwordTwo} onChange={this.handleChange} placeholder="Confirm Password" />
              <Button disabled={isInvalid || this.usernameTaken} type="submit">
                  Sign Up
              </Button>

              {error && <p>{error.message}</p>}
          </Form>
        );
    }
}

export default withRouter(SignUpForm);

export { SignUpForm };