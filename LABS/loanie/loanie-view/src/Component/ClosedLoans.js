import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardText,
  CardColumns,
  CardBody,
} from 'reactstrap';
// import { connect } from 'react-redux';
// import { getManagerLoans } from '../Actions';
import base from './base';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class ClosedLoans extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      loanManagerId: '',
      loans: [],
    };
  }

  componentDidMount() {
    const body = { token: this.state.tokenId };
    axios
      .post(`${base}/user`, body)
      .then((res) => {
        this.setState({
          loanManagerId: res.data._id,
        });
        this.handleGetClosedLoans();
      })
      .catch((err) => {
        throw err;
      });
    // this.props.dispatch(getManagerLoans("000000000000000000000001"));
  }

  handleGetClosedLoans = () => {
    const body = {
      loanManagerId: this.state.loanManagerId,
    };
    axios
      .post(`${base}/getmanagerloans`, body)
      .then((res) => {
        this.setState({ loans: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };

  handleGetAllClosedLoans = () => {
    const closedLoans = this.state.loans.filter(loan => loan.openLoan === false);
    return closedLoans;
  };

  render() {
    const loans = this.handleGetAllClosedLoans();
    const cards = [];
    loans.forEach((loan, index) => {
      cards.push(
        <div className="ClosedLoan-style">
          <Card>
            <CardHeader>Loan {index + 1}</CardHeader>
            <CardBody>
              <CardText>
                <ul className="list-unstyled">
                  <li>Client email: {loan.clientEmail}</li>
                  <li>Current Status: {loan.currentStatus}</li>
                  <Link to={`my_loan/${loan._id}`}>See Details</Link>
                </ul>
              </CardText>
            </CardBody>
          </Card>
        </div>);
    });

    let noCards = null;
    if (loans.length === 0) {
      noCards = [];
      noCards.push(
        <div className="NoClosedLoans-header">
          <h2> No closed loans! </h2>
        </div>);
      noCards.push(<SideBarNav />);
    }

    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Closed Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <CardColumns>{cards}</CardColumns>
        {noCards}
      </div>
    );
  }
}
