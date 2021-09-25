import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

// import icons
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/LockOpen";
import Password2Icon from "@material-ui/icons/Lock";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/AccountBox";
import Person2Icon from "@material-ui/icons/AssignmentInd";

// import css here
import "./SignUpForm.css";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password2: "",
      phone: "",
      firstName: "",
      lastName: ""
    };
  }
  changeHandler = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };
  comparePasswords = (pass1, pass2) => {
    return pass1 === pass2 ? true : false;
  };
  createRegisterObject = e => {
    e.preventDefault();
    const {
      email,
      password,
      password2,
      phone,
      firstName,
      lastName
    } = this.state;
    // check if passwords match before moving forward
    if (this.comparePasswords(password, password2)) {
      if (firstName && lastName) {
        const name = `${firstName} ${lastName}`;
        const user = { email, password, phone, name };
        /* console.log until we have backend hooked up */
        console.log(user);
        this.props.registerUser(user);
        this.props.welcome(user);
      } else {
        return this.setState({ error: "Valid first/last name required" });
      }
    } else {
      return this.setState({
        error: "Passwords do not match"
      });
    }
  };
  render() {
    return (
      <form className="signup-form" onSubmit={this.createRegisterObject}>
        <label htmlFor="email" className="signup-form-group">
          <EmailIcon className="signup-icon" />
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
        <label htmlFor="firstName" className="signup-form-group">
          <PersonIcon className="signup-icon" />
          <input
            className="signin-input"
            type="text"
            placeholder="first name"
            name="firstName"
            id="firstName"
            onChange={this.changeHandler}
            value={this.state.firstName}
          />
        </label>
        <label htmlFor="lastName" className="signup-form-group">
          <Person2Icon className="signup-icon" />
          <input
            className="signin-input"
            type="text"
            placeholder="last name"
            name="lastName"
            id="lastName"
            onChange={this.changeHandler}
            value={this.state.lastName}
          />
        </label>
        <label htmlFor="phone" className="signup-form-group">
          <PhoneIcon className="signup-icon" />
          <input
            className="signin-input"
            type="text"
            placeholder="phone number"
            name="phone"
            id="phone"
            onChange={this.changeHandler}
            value={this.state.phone}
          />
        </label>
        <label htmlFor="password" className="signup-form-group">
          <PasswordIcon className="signup-icon" />
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
        <label htmlFor="password2" className="signup-form-group">
          <Password2Icon className="signup-icon" />
          <input
            className="signin-input"
            type="password"
            placeholder="password"
            name="password2"
            id="password2"
            onChange={this.changeHandler}
            value={this.state.password2}
          />
        </label>
        <button className="authentication-btns register-btn" type="submit">
          Register
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { registerUser }
)(SignUpForm);
