import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Auth.css';
import { forgotPassword } from '../../actions';
import DashboardNotification from '../DashboardNotification/DashboardNotification';

class Fogotpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
      emailSent: null,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      error: props.error,
      emailSent: props.emailSent,
    });
  }
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  };
  forgotPassword = (e) => {
    e.preventDefault();
    this.props.forgotPassword(this.state.email);
    this.setState({
      email: '',
      error: this.props.error,
    });
  };
  renderAlert() {
    if (!this.state.error) return null;
    return (
      <DashboardNotification type="warn">
        {this.state.error}
      </DashboardNotification>
    );
  }
  renderEmailSuccess() {
    if (!this.state.emailSent) return null;
    return (
      <DashboardNotification type="success">
        Reset Password link has been sent to email associated with this account
      </DashboardNotification>
    );
  }

  render() {
    return (
      <div>
        <div className="Auth__Body">
          <div className="Auth__Body__Container">
            <h1 className="Auth__title">Forgot Password</h1>
            {this.renderAlert()}
            {this.renderEmailSuccess()}
            <form onSubmit={this.forgotPassword}>
              <label htmlFor="ForgotPassword__Email">Email</label>
              <input
                id="ForgotPassword__Email"
                onChange={this.handleInput}
                value={this.state.email}
                type="text"
              />
              <button type="submit">Submit</button>
            </form>
            <p>
              New to Housecups?
              <Link to={"/signup"} className="Link">
                {' '}
                Sign Up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    emailSent: state.auth.emailSent,
  };
};

export default connect(mapStateToProps, { forgotPassword })(Fogotpassword);
