import React, { Component } from 'react';
import { Button } from 'reactstrap'
import axios from 'axios';

import UserBox from './userBox';
import CharityBox from './charityBox';
import UserModal from './userModal';

import './admin.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3030';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      adminUsers: [],
      charities: [],
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    const user = axios.get(`${SERVER_URL}/users/${sessionStorage.getItem('user')}`);
    user.then(activeUser => {
      if (!activeUser.data.admin) {
        this.props.history.push('login');
      }
    })
  }

  fetchUsers() {
    return axios.get(`${SERVER_URL}/adminusers`);
  }

  fetchCharities() {
    return axios.get(`${SERVER_URL}/charities`);
  }

  componentDidMount() {
    const _this = this;
    axios.all([this.fetchUsers(), this.fetchCharities()])
      .then(axios.spread(function (users, charities) {
        _this.setState({
          adminUsers: users.data,
          charities: charities.data
        });
    }));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (
      <div>
        <div className="adminContainer">
          <h1>Admin Users</h1>
          <UserBox users={ this.state.adminUsers } />
          <UserModal toggle={ this.toggle } modal={ this.state.modal } />
          <h1>Charities</h1>
          <CharityBox charities={ this.state.charities } />
        </div>
      </div>
    )
  }
}

export default Admin;