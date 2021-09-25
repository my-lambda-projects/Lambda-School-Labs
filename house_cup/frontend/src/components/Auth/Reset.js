import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../actions';
import DashboardNotification from '../DashboardNotification/DashboardNotification';


class Resetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      error: null,
    };
  }
  componentDidMount() {
    const token = this.props.location.search.substr(1);
    localStorage.setItem('token', token);
  }
  componentWillReceiveProps(props) {
    this.setState({
      error: props.error,
    });
  }
  handleInput = (e, type) => {
    e.preventDefault();
    this.setState({
      [type]: e.target.value,
    });
  };
  resetPassword = (e) => {
    e.preventDefault();
    this.props.resetPassword(this.state, this.props.history);
    this.setState({
      password: '',
      confirmPassword: '',
      error: this.props.error,
    });
  };
  renderAlert() {
    if (!this.state.error) return null;
    return <DashboardNotification type="warn">{this.state.error}</DashboardNotification>;
  }
  render() {
    return (
      <div>
        <div className="Auth__Body">
          <div className="Auth__Body__Container">
            <h1 className="Auth__title">Reset Password</h1>
            {this.renderAlert()}
            <form onSubmit={this.resetPassword}>
              <label htmlFor="ResetForm__Password">New Password</label>
              <input
                id="ResetForm__Password"
                onChange={e => this.handleInput(e, 'password')}
                value={this.state.password}
                type="password"
              />
              <label htmlFor="ResetForm__ConfirmPassword">Confirm Password</label>
              <input
                id="ResetForm__ConfirmPassword"
                onChange={e => this.handleInput(e, 'confirmPassword')}
                value={this.state.confirmPassword}
                type="password"
              />
              <button type="submit">Submit</button>
            </form>
            <p>
              New to Housecup?
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
  };
};

export default connect(mapStateToProps, { resetPassword })(Resetpassword);
