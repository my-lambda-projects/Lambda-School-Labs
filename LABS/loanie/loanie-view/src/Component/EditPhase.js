import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Button, Input } from 'reactstrap';
import base from './base';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/EditLoan.css';

class EditPhase extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      phase: '',
      loanId: '',
      phaseId: '',
      phaseNo: '',
      description: '',
      title: '',
    };
  }

  componentWillMount() {
    const params = window.location.href;
    const phaseId = params.substring(params.lastIndexOf('/') + 1, params.lastIndexOf('-'));
    const loanId = params.substring(params.lastIndexOf('-') + 1, params.lastIndexOf('+'));
    axios
      .get(`${base}/loan/${loanId}`)
      .then((res) => {
        const phase = res.data.phases.filter(phases => phases._id === phaseId);
        this.setState({
          phase,
        });
        console.log('edit phase', phase);
        this.initState(loanId, phaseId, phase);
      })
      .catch((err) => {
        throw err;
      });
  }

  initState(loanId, phaseId, phase) {
    this.setState({
      loanId,
      phaseId,
      title: phase[0].phaseTitle,
      description: phase[0].description,
      phaseNo: phase[0].phase,
    });
  }

  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  submitEditedPhase = () => {
    const body = {
      loanId: this.state.loanId,
      phaseId: this.state.phaseId,
      phaseTitle: this.state.title,
      description: this.state.description,
    };
    axios
      .post(`${base}/phaseedit`, body)
      .then(() => {
        console.log('Phase edited successfully!');
      })
      .catch((err) => {
        throw err;
      });
    const url = `/my_loan/${this.state.loanId}`;
    window.location = url;
  };

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

    return (
      <div className="EditPhase">
        <SidebarNav />
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/loan_list">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href={`/my_loan/${this.state.loanId}`}>
              Loan Details
            </BreadcrumbItem>
            <BreadcrumbItem active>Edit Phase</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Edit Phase</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              Phase Number: {this.state.phaseNo}
              <br />
              <br />
              Edit Phase Title:{' '}
              <Input
                type="textarea"
                name="text"
                value={this.state.title}
                onChange={this.handleTitle}
              />
              <br />
              <br />
              Edit Phase Description:{' '}
              <Input
                type="textarea"
                name="text"
                value={this.state.description}
                onChange={this.handleDescription}
              />
              <br />
            </fieldset>
          </form>
          <Button color="warning" onClick={this.submitEditedPhase}>
            Submit Changes
          </Button>{' '}
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default EditPhase;
