import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardText, CardBody } from 'reactstrap';
import base from './base';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import '../CSS/MyLoans.css';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      loanList: [],
      userType: sessionStorage.getItem('userType'),
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  componentDidMount() {
    console.log(this.state.userType);
    // console.log('hello');
    // console.log(this.state.tokenId);
    const body = { token: sessionStorage.getItem('tokenId') };
    axios
      .post(`${base}/user`, body)
      .then((res) => {
        const userEmail = { clientEmail: res.data.email };
        // console.log('hello');
        console.log('email to get loans', res.data.email);
        axios
          .post(`${base}/getclientloans`, userEmail)
          .then((loandata) => {
            this.setState({ loanList: loandata.data });
            //  console.log(this.state.loanList);
            console.log(this.state.loanList);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // grab user type and token id to make sure user is authorized
    const token = this.state.tokenId;
    const user = this.state.userType;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    if (user === 'managerUser') {
      return (
        <div>
          <h1> Please login as a standard user </h1>
        </div>
      );
    }
    // renders if loan list is not empty
    if (this.state.loanList.length !== 0) {
      console.log('loanList', this.state.loanList);
      if (this.state.loanList.length === 1) {
        const url = `my_loan/${this.state.loanList[0]._id}`;
        window.location = url;
      }
      return (
        <div>
          <div className="BreadCrumb">
            <Breadcrumb>
              <BreadcrumbItem tag="a" href="/">
                Home
              </BreadcrumbItem>
              <BreadcrumbItem active>Loans</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Navbar />
          <div className="MyLoans-link-container">
            {this.state.loanList.map((val, index) => (
              <div className="MyLoans-loancard">
                <Card>
                  <CardHeader>
                    <Link to={`my_loan/${val._id}`} className="MyLoans-header-text">
                      <b>Loan</b> {index + 1}
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      <ul className="list-unstyled">
                        <li className="MyLoans-text">
                          <b>Current Phase</b>: {val.currentStatus}
                        </li>
                        <li className="MyLoans-text">
                          <b>Loan Type</b>: {val.loanType}
                        </li>
                        <li className="MyLoans-text">
                          <Link to={`my_loan/${val._id}`}>
                            <b>See Details</b>
                          </Link>
                        </li>
                      </ul>
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
          <ClientSideNav />
        </div>
      );
    }
    // renders if loan list is empty and user authorized
    return (
      <div className>
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Navbar />
        <div className="MyLoans-noloans-text">
          <h2>You currently do not have any active loans.</h2>
          <Link to="/billing">Click to subscibe (Loan Officers only)</Link>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
