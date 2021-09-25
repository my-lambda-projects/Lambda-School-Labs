import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
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
import base from './base';
// import { getManagerLoans } from '../Actions';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class OpenLoans extends Component {
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
        this.setState({ loanManagerId: res.data._id });
        this.handleGetOpenLoans();
      })
      .catch((err) => {
        throw err;
      });

    // console.log("User email: ", this.props.userLoginDetails.email);
    // console.log("this.props.userLoginDetails: ", this.props.userLoginDetails);
    // this.props.dispatch(getManagerLoans("000000000000000000000001"));
  }

  handleGetOpenLoans = () => {
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

  handleGetAllOpenLoans = () => {
    const openLoans = this.state.loans.filter(loan => loan.openLoan === true);
    return openLoans;
  };

  render() {
    const loans = this.handleGetAllOpenLoans();
    const cards = [];
    loans.forEach((loan, index) => {
      cards.push(<div className="OpenLoans-card-container">
        <Card>
          <CardHeader><b>Loan {index + 1}{'  '}{loan.label}</b></CardHeader>
          <CardBody>
            <CardText>
              <ul className="list-unstyled">
                <li>Client email: {loan.clientEmail}</li>
                <li>Current Status: {loan.currentStatus}</li>
                <Link to={`my_loan/${loan._id}`}>
                  View Details
                </Link>
                {' | '}
                <Link to={`edit_loan/${loan._id}`}>
                  Edit Loan
                </Link>
                {' | '}
                <Link to={`add_assignment/${loan._id}`}>
                  Edit Assignments
                </Link>
              </ul>
            </CardText>
          </CardBody>
        </Card>
      </div>);
      if (index === loans.length - 1) {
        cards.push(
          <div className="OpenLoans-card-container">
            <Card>
              <div className="list-unstyled OpenLoans-imagelist-container">
                <CardHeader><h7><b> Add a New Loan</b></h7></CardHeader>
                <Link to="/create_loan">
                  <img
                    className="OpenLoans-imagelist-item"
                    src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-256.png"
                    alt="plus_sign"
                  />
                </Link>
              </div>
            </Card>
          </div>);
      }
    });

    const noCards = [];
    if (loans.length === 0) {
      return (
        <div>
          <Navbar />
          <div className="BreadCrumb">
            <Breadcrumb>
              <BreadcrumbItem tag="a" href="/">
                Home
              </BreadcrumbItem>
              <BreadcrumbItem active>Loans</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <CardColumns>{cards}</CardColumns>
          {noCards}
          <div className="OpenLoans-image-container">
            <h1> Add a New Loan</h1>
            <Link to="/create_loan">
              <img
                className="OpenLoans-image-item"
                src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-256.png"
                alt="plus_sign"
              />
            </Link>
          </div>
          <SideBarNav />
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <CardColumns>
          {cards}
        </CardColumns>
        {noCards}
      </div>
    );
  }
}

