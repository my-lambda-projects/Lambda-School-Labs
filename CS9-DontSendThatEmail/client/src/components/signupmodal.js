import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

//implemented signup component
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Take the data from input field & use it to register the user & push to login
  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    axios
      .post("https://dontemail.herokuapp.com/auth/register", user)
      .then(resp => {
        this.props.history.push("/login");
      })
      .catch(err => console.log(err));
    this.setState({
      username: "",
      password: "",
      email: "",
      redirect: true // set redirect boolean to true on state to trigger the redirect
    });
  };

  // After registration, redirects to login page
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="form-bg">
        <form className="form" onSubmit={this.handleSubmit}>
          <Link to="/">
            <div className="logo" />
          </Link>
          {/* Calls redirect function when true triggers redirect */}
          {this.renderRedirect()}
          <input
            placeholder="username"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
          />

          <br />
          <input
            placeholder="password"
            value={this.state.password}
            name="password"
            type="password"
            onChange={this.handleChange}
          />

          <br />
          <input
            placeholder="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />

          <button>REGISTER</button>
          <p className="fallback-link">
            {" "}
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
