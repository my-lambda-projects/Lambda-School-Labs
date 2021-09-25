import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Button, Input } from 'reactstrap';
import base from './base';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/EditLoan.css';

class EditAssignment extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      assignment: '',
      loanId: '',
      assignmentId: '',
      phase: '',
      text: '',
      complete: '',
      loanType: '',
    };
  }

  componentWillMount() {
    const params = window.location.href;
    const assignmentId = params.substring(params.lastIndexOf('/') + 1, params.lastIndexOf('-'));
    const loanId = params.substring(params.lastIndexOf('-') + 1, params.lastIndexOf('+'));
    axios
      .get(`${base}/loan/${loanId}`)
      .then((res) => {
        const loans = res.data.loanType;
        const assignment = res.data.assignments.filter(assign => assign._id === assignmentId);
        this.setState({
          assignment,
        });
        this.initState(loanId, assignmentId, loans);
      })
      .catch((err) => {
        throw err;
      });
  }

  initState(loanId, assignmentId, loanType) {
    this.setState({
      loanType,
      loanId,
      assignmentId,
      complete: this.state.assignment[0].complete,
      text: this.state.assignment[0].text,
      phase: this.state.assignment[0].phase,
    });
  }

  handleDropDownComplete = (e) => {
    this.setState({ complete: e.target.value });
  };

  handleDropDownPhase = (e) => {
    this.setState({ phase: e.target.value });
  };

  handleNewAssignment = (e) => {
    this.setState({ text: e.target.value });
  };

  submitDeleteAssignment = () => {
    const body = {
      loanId: this.state.loanId,
      assignmentId: this.state.assignmentId,
    };
    axios
      .post(`${base}/assignmentdelete`, body)
      .then(() => {
        console.log('Assignment deleted successfully!');
      })
      .catch((err) => {
        throw err;
      });
    const str = '/add_assignment/';
    const url = str + this.state.loanId;
    window.location = url;
  };

  phaseDropDown() {
    const type = this.state.loanType;
    if (type === 'new') {
      return (
        <select value={this.state.phase} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      );
    } else if (type === 'construction') {
      return (
        <select value={this.state.phase} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      );
    } else if (type === 'refinance') {
      return (
        <select value={this.state.phase} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      );
    }
    return (
      <select value={this.state.phase} onChange={this.handleDropDownPhase}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    );
  }

  submitEditedAssignment = () => {
    const body = {
      loanId: this.state.loanId,
      assignmentId: this.state.assignmentId,
      text: this.state.text,
      phase: this.state.phase,
      complete: this.state.complete,
    };
    axios
      .post(`${base}/assignmentedit`, body)
      .then(() => {
        console.log('Assignment edited successfully!');
      })
      .catch((err) => {
        throw err;
      });
    const str = '/add_assignment/';
    const url = str + this.state.loanId;
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
      <div className="EditAssignment">
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
            <BreadcrumbItem tag="a" href={`/edit_loan/${this.state.loanId}`}>
              Edit Loan
            </BreadcrumbItem>
            <BreadcrumbItem active>Edit Assignment</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Edit Assignment</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              Edit Phase:
              {this.phaseDropDown()}
              <br />
              <br />
              Edit Complete Status:
              <select value={this.state.complete} onChange={this.handleDropDownComplete}>
                <option value="true">Complete</option>
                <option value="false">Incomplete</option>
              </select>
              <br />
              <br />
              Edit Assignment:{' '}
              <Input
                type="textarea"
                name="text"
                value={this.state.text}
                onChange={this.handleNewAssignment}
              />
              <br />
            </fieldset>
          </form>
          <Button color="warning" onClick={this.submitEditedAssignment}>
            Submit Changes
          </Button>{' '}
          <Button color="danger" onClick={this.submitDeleteAssignment}>
            Delete Assignment
          </Button>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default EditAssignment;
