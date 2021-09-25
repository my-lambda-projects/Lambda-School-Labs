import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';
// import signup from './signup.jpg';

import backgroundImage from './signup.jpg';

const styles = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  width: '100%',
};

class Signup extends Component {
  handleFormSubmit = credentials => {
    this.props.register(credentials, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signup" style={styles}>
        {/* <p className="signup-headline">
          Lorem ipsum <br /> <span className="signup-headline2">dolor sit amet</span>
        </p> */}
        <div className="signin-foreground">
          <div className="signin-imgbox">
            {/* <p className="signup--img" /> */}
            {/* <p className="signup-headline">
              <span className="signup-headline2">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </span>
            </p> */}
            <p className="signin--form_notmember" style={{ color: 'color: rgb(78, 65, 65)' }}>
              Alread have an account ? <br />{' '}
              <Link to="/signin">
                {' '}
                <span className="signin-signup">Sign In</span>{' '}
              </Link>
            </p>
          </div>
          <div className="signin--box">
            <div className="typed-logo">
              <h1 className="signin--titles">
                giveMe
                <span className="slideout--dot">.</span>
                <br />
                <h1 className="signin--slogans">myMoney</h1>
              </h1>
            </div>
            {/* <h1 className="signup--header">Sign Up</h1> */}
            <h3 style={{ color: 'red' }}>{this.props.error}</h3>
            <form className="signup--form" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                type="email"
                name="username"
                component="input"
                className="signin--form_username"
                placeholder="Username"
              />
              <br />
              <Field
                type="password"
                name="password"
                component="input"
                className="signin--form_password"
                placeholder="Password"
              />
              <br />
              <Field
                name="fullName"
                component="input"
                className="signin--form_password"
                placeholder="fullName"
              />
              <br />
              <Field
                name="companyName"
                component="input"
                className="signin--form_password"
                placeholder="companyName"
              />
              <br />
              <Field
                name="phone"
                component="input"
                type="number"
                className="signin--form_password"
                placeholder="phone"
              />
              <br />
              <button className="signin--form_button" action="submit">
                Sign Up{' '}
              </button>
            </form>
            <p className="signin--orsign"> Or sign up with </p>
            {/* <div className="signin--buttons">
              <button className="signin--buttons__facebook">
                <i className="fab fa-facebook-square" />facebook
              </button>
              <button className="signin--buttons__google">
                <img
                  src={logo}
                  alt="google logo"
                  className="signin--buttons__google--logo"
                />Google
              </button>
            </div> */}
            {/* <p className="signin--form_notmember">
              {' '}
              Already a member? <Link to="/signin"> Sign in </Link>
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    message: state.error,
  };
};

Signup = connect(
  mapStateToProps,
  { register },
)(Signup);

export default reduxForm({
  form: 'register', // Unique name for the form
  fields: ['username', 'password', 'fullName', 'companyName', 'phone'],
})(Signup);
