import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import base from './base';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/LoanList.css';

export default class LoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      loanList: [],
    };
  }

  componentWillMount() {
    const body = { token: this.state.tokenId };
    axios
      .post(`${base}/user`, body)
      .then((res) => {
        const managerID = { loanManagerId: res.data.id };
        axios
          .post(`${base}/getmanagerloans`, managerID)
          .then((loandata) => {
            const loanArr = loandata.data;
            this.setState({ loanList: loanArr });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    // getter
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    if (this.state.loanList.length > 0) {
      return (
        <div>
          <div>
            <Navbar />
            <SidebarNav />
            <div className="Loanlist">
              <div className="BreadCrumb">
                <Breadcrumb>
                  <BreadcrumbItem tag="a" href="/">
                    Home
                  </BreadcrumbItem>
                  {' > '}
                  <BreadcrumbItem active>Loans</BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="Loanlist-link-container">
                <Link to="manager_loans">
                  <h1>Loan 1</h1>
                </Link>
                <p>Current Phase: {this.state.currentPhase}</p>
                <p>Current Assignment: {this.state.currentAssignent}</p>
                <Link to="manager_loans">
                  <h3>See Details</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="Loanlist">
        <SidebarNav />
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="Loanlist-title-containter">
          <h1> Add a new Loan</h1>
        </div>
        <div className="Loanlist-image-container">
          <Link to="/create_loan">
            <img
              className="Loanlist-image-item"
              src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-256.png"
              alt="plus_sign"
            />
          </Link>
        </div>
      </div>
    );
  }
}
