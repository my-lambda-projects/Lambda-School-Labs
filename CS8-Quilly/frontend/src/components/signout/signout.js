import React, { Component } from 'react';
import axios from 'axios';

import config from '../../config/config';
import './signout.css';

class Accountlogout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(`${config.serverUrl}/user/logout`)
      .then((response) => {
        this.props.history.replace('/');
      })
      .catch((error) => {
        console.error(`HANDLE SUBMIT ERROR: ${error}!`);
      });
  }

  render() {
    return (
      <div className="Accountlogout">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Signout" className="signoutBtn" />
        </form>
      </div>
    );
  }
}

export default Accountlogout;
