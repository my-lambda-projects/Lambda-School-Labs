import React from "react";

// import icons
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/LockOpen";
// import css here
import "./SignInForm.css";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  changeHandler = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };
  createLoginObject = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userObject = { email, password };
    /* console.log until we have backend hooked up */
    console.log(userObject);
  };
  render() {
    return (
      <form className="signin-form" onSubmit={this.createLoginObject}>
        <label htmlFor="email" className="signin-form-group">
          <EmailIcon />
          <input
            className="signin-input"
            type="text"
            placeholder="email"
            name="email"
            id="email"
            onChange={this.changeHandler}
            value={this.state.email}
          />
        </label>
        <label htmlFor="password" className="signin-form-group">
          <PasswordIcon />
          <input
            className="signin-input"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            onChange={this.changeHandler}
            value={this.state.password}
          />
        </label>
        <button className="authentication-btns" type="submit">
          Login
        </button>
      </form>
    );
  }
}

export default SignInForm;
