import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, codeLogin } from '../../actions/auth';

import signin from './signin.jpg';
import backgroundImage from './signin.jpg';

const styles = {
  backgroundImage: `url(${backgroundImage})`,
  // backgroundSize: 'cover',
};

class codeVerification extends Component {
  state = {
    username: this.props.history.location.state ? this.props.history.location.state.username : '',
    code: '',
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    return (
      <div className="signin" style={styles}>
        <div className="signin-foreground">
          <div className="signin-imgbox">
            <img className="signin--img" src={signin} alt="img" />
            <p className="signin-headline">
              {/* <br /> <span className="signin-headline2">Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris</span> */}
            </p>
            <p className="signin--form_notmember">
              Not a member? <br />{' '}
              <Link to="/signup">
                {' '}
                <span className="signin-signup">Sign up</span>{' '}
              </Link>
            </p>
          </div>
          <div className="signin--box">
            <div className="typed-logo">
              <h1 className="signin--titles">
                giveMe
                <span className="slideout--dot">.</span>
                <br />
                <p className="signin--slogans">myMoney</p>
              </h1>
            </div>
            {/* <h1 className="signin--header">Sign In</h1> */}
            <h3 style={{ color: 'red' }}>{this.props.message}</h3>
            <form className="signin--form">
              <input
                value={this.state.username}
                name="username"
                className="signin--form_username"
                placeholder="Username"
                onChange={this.handleFormChange}
                required
              />
              <br />
              <input
                value={this.state.code}
                type="text"
                name="code"
                maxLength={6}
                minLength={6}
                className="signin--form_password"
                placeholder="Verification Code"
                onChange={this.handleFormChange}
                required
              />
              <br />
              <button
                className="signin--form_button"
                onClick={e => {
                  e.preventDefault();
                  this.props.codeLogin(this.state, this.props.history);
                }}
                value="Sign In"
              >
                Sign In
              </button>
            </form>
            <div className="alternate-login">
              <p className="alternate-login_text">
                <Link to="/signin">
                  <span>Signin with password</span>
                </Link>
              </p>
            </div>
            {/* <p className="signin--form_options"> Or sign In with </p> */}
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
              Not a member? <Link to="/signup"> Sign up </Link>
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    message: state.auth.message,
  };
};

export default connect(
  mapStateToProps,
  { login, codeLogin },
)(codeVerification);

// export default reduxForm({
//   form: 'logIn', // Unique name for the form
// })(Signin);
