import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Takes the data from input fields. Sets the reponse token on state & pushes user to dashboard
  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("https://dontemail.herokuapp.com/auth/login", user)
      .then(resp => {
        localStorage.setItem("token", `Bearer ${resp.data.token}`);

        const { setLogin } = this.props.context.actions;
        setLogin(resp.data.user);
        this.props.history.push("/dashboard");
      });
  };
  render() {
    return (
      <div className="form-bg">
        <form className="form" onSubmit={this.handleSubmit}>
          <Link to="/">
            <div className="logo" />
          </Link>
          <input
            value={this.state.username}
            name="username"
            placeholder="username"
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
          <button type="submit">LOGIN</button>
          <p className="fallback-link">
            {" "}
            No Account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
