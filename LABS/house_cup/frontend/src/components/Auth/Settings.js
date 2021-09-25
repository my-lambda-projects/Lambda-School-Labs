import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Auth.css';
import { changeSettings } from '../../actions';
import DashboardNotification from '../DashboardNotification/DashboardNotification';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: undefined,
      settingsChanged: false,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      error: props.error,
      settingsChanged: props.settingsChanged,
    });
  }
  // Rather than having individual input functions.
  handleInput = async (e, type) => {
    e.preventDefault();
    await this.setState({
      [type]: e.target.value,
    });
  };
  changeSettings = async (e) => {
    e.preventDefault();
    await this.props.changeSettings(this.state, this.props.history);
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      error: this.props.error,
      settingsChanged: this.props.changedSettings,
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
  renderSettingsChangeSuccess() {
    if (!this.state.settingsChanged) return null;
    return (
      <DashboardNotification type="success">
        Settings have been changed successfully.
      </DashboardNotification>
    );
  }
  render() {
    return (
      <div>
        <div className="Auth__Body">
          <div className="Auth__Body__Container">
            <h3 className="form__title">Settings</h3>
            {this.renderAlert()}
            {this.renderSettingsChangeSuccess()}
            <form onSubmit={this.changeSettings}>
              <label htmlFor="SettingsForm__Email">Email</label>
              <input
                id="SettingsForm__Email"
                onChange={e => this.handleInput(e, 'email')}
                value={this.state.email}
                type="text"
              />
              <label htmlFor="SettingsForm__Password">New Password</label>
              <input
                id="SettingsForm__Password"
                onChange={e => this.handleInput(e, 'password')}
                value={this.state.password}
                type="password"
              />
              <label htmlFor="SettingsForm__ConfirmPassword">Confirm New Password</label>
              <input
                id="SettingsForm__ConfirmPassword"
                onChange={e => this.handleInput(e, 'confirmPassword')}
                value={this.state.confirmPassword}
                type="password"
              />
              <button 
                type="submit"
                style={{
                  marginTop: 20,
                }}
              >
              Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    changedSettings: state.auth.changedSettings,
  };
};

export default connect(mapStateToProps, { changeSettings })(Settings);
