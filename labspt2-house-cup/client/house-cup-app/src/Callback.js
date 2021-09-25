import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth from './utils/Auth.js';
import axios from 'axios';


class Callback extends Component {
 
  async componentDidMount() {
    try {
    await auth.handleAuthentication();
    await this.sendUsers();
    this.props.history.replace('/admin/schools');
    } catch(error) {
       console.log(`Error from callback.js:`, error);
    }
  }

    sendUsers = () => {
      const { getAccessToken } = auth;
      const {getProfile} = auth;
      const name = getProfile().name
      const headers = { Authorization: `Bearer ${getAccessToken()}` };
      console.log(`Callback.js line 22`, headers);
      axios.post('http://localhost:5000/users/register', {name:name}, {headers})
          .then( user => {
              console.log(user);
          }).catch(err => {
              console.log(err);
          })
    }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);
