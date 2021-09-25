import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios';
import base from './base';
import '../CSS/SideBar.css';

export default class SideBarNav extends Component {
  constructor() {
    super();
    this.state = {
      userType: sessionStorage.getItem('userType'),
      userName: '',
    };
  }
  componentDidMount() {
    const body = { token: sessionStorage.getItem('tokenId') };
    if (body.token !== null) {
      axios
        .post(`${base}/user`, body)
        .then((res) => {
          this.setState({ userName: res.data.name });
        })
        .catch((err) => {
          throw err;
        });
    }
  }
  render() {
    if (this.state.userType === 'managerUser') {
      return (
        <div className="menu-container">
          <Menu>
            <Link to="/settings">
              <h4 className="menu-items">
                <b>{this.state.userName}</b>
              </h4>
            </Link>
            <a className="menu-items" href="/create_loan">
              Create Loan
            </a>
            <a className="menu-items" href="/open_loans">
              Open Loans
            </a>
            <a className="menu-items" href="/closed_loans">
              Closed Loans
            </a>
            <a className="menu-items" href="/billing">
              Billing
            </a>
            <a className="menu-items" href="/settings">
              Settings
            </a>
          </Menu>
        </div>
      );
    } else if (this.state.userType === 'standardUser') {
      return (
        <div className="menu-container">
          <Menu>
            <Link to="/user_settings">
              <h4 className="menu-items">
                <b>{this.state.userName}</b>
              </h4>
            </Link>
            <a className="menu-items" href="/">
              Home
            </a>
            <a className="menu-items" href="/my_loans">
              My Loans
            </a>
            <a className="menu-items" href="/billing">
              Subscribe (Loan Officers only)
            </a>
            <a className="menu-items" href="/user_settings">
              Settings
            </a>
          </Menu>
        </div>
      );
    }
    return <div />;
  }
}
