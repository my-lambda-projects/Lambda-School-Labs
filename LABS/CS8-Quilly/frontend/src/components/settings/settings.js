import React, { Component } from 'react';
import './settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settingsBody">
        <div className="settingsContainer">
          <form className="settingsForm">
            <div className="inputContainer">
              <label>E-Mail:</label>
              <input type="email" name="E-Mail" className="settingsInput" />
              <label>Old Password:</label>
              <input type="password" name="oldpassword" className="settingsInput" />
              <label>New Password:</label>
              <input type="password" name="newpassword" className="settingsInput" />
              </div>
            <input type="submit" value="Submit" className="settingsBtn" />
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
