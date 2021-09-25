import React, { Component } from 'react';
import { SettingsTabs, SettingsForm } from '../../presentation/presentation.js';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      oldPassword: '',
      newPassword: '',
      phone: null
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // will need an AJAX post request to update user settings

  };

  render() {
    return (
      <>
        <SettingsForm
          {...this.state}
          {...this.props}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        <SettingsTabs { ...this.state } { ...this.props } />
      </>
    );
  }
}

export default Settings;
