import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import base from './base';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import '../CSS/ClientSelectedLoan.css';

export default class ClientSelectedLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      borrower: '',
      type: '',
      amount: '',
      userType: sessionStorage.getItem('userType'),
      phaseContent: '',
      phaseNumber: null,
      phaseTitle: '',
      currentLoanId: '',
      tokenId: sessionStorage.getItem('tokenId'),
      totalPhases: [],
      phaseTitleNumber: '',
      clientEmail: '',
      openLoan: true,
      acceptTexts: true,
      acceptEmails: true,
      phaseId: '',
    };
  }

  componentDidMount() {
    this.getLoanData();
  }

  getLoanData = () => {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`${base}/loan/${getLoanId}`)
      .then((loandata) => {
        // console.log(loandata.data);
        const assignArr = loandata.data.assignments;
        const phaseArr = loandata.data.phases;
        const totalPhaseNo = phaseArr;
        console.log('totalPhase', totalPhaseNo);
        this.setState({
          loanId: getLoanId,
          amount: loandata.data.amount,
          type: loandata.data.loanType,
          phaseNumber: loandata.data.currentStatus,
          currentLoanId: getLoanId,
          totalPhases: totalPhaseNo,
          phaseTitleNumber: loandata.data.currentStatus,
          clientEmail: loandata.data.clientEmail,
          openLoan: loandata.data.openLoan,
        });

        for (let i = 0; i < phaseArr.length; i += 1) {
          if (
            phaseArr[i].phase === this.state.phaseNumber
          ) {
            this.setState({
              phaseId: phaseArr[i]._id,
              phaseContent: phaseArr[i].description,
              phaseTitle: phaseArr[i].phaseTitle,
            });
          }
        }
        if (this.state.type === 'new') {
          this.setState({ type: 'new purchase' });
        }
        for (let j = 0; j < assignArr.length; j += 1) {
          if (this.state.phaseNumber === assignArr[j].phase) {
            this.state.assignments.push(assignArr[j]);
          }
        }
        // axios request to get a user by email.
        const request = { email: loandata.data.clientEmail };
        // console.log('request: ', request);
        axios
          .post(`${base}/userbyemail`, request)
          .then((res) => {
            this.setState({
              borrower: res.data.name,
              acceptTexts: res.data.acceptTexts,
              acceptEmails: res.data.acceptEmails,
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  completedAssignment = (assignmentId, assignmentIndex) => {
    const tempAssignmets = this.state.assignments;
    tempAssignmets[assignmentIndex].complete = !tempAssignmets[assignmentIndex].complete;
    this.setState({ assignments: tempAssignmets });
    const body = {
      loanId: this.state.currentLoanId,
      assignmentId,
      complete: tempAssignmets[assignmentIndex].complete,
    };

    axios
      .post(`${base}/assignmentcomplete`, body)
      .then(console.log('loan marked complete'))
      .catch((err) => {
        throw err;
      });

    // check if all assignments are checked with the current phase.
    // If yes, increment the phase
    let isPhaseComplete = true;
    for (let i = 0; i < this.state.assignments.length; i += 1) {
      if (!this.state.assignments[i].complete) {
        isPhaseComplete = false;
        break;
      }
    }
    if (isPhaseComplete) {
      let phaseIncrement = parseInt(this.state.phaseNumber, 10);
      phaseIncrement += 1;
      if (this.state.totalPhases.length < phaseIncrement) {
        const request = { openLoan: false };
        axios
          .post(`${base}/loan/${this.state.currentLoanId}`, request)
          .then(() => {
            this.setState({ openLoan: false });
            this.sendNewLoanNotification();
            window.location = '/closed_loans';
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
      phaseIncrement += '';

      // let server know phase completed
      // TODO: Also send openLoan to the axios request to update if the loan is open or closed!
      const request = { currentStatus: phaseIncrement };
      axios
        .post(`${base}/loan/${this.state.currentLoanId}`, request)
        .then((res) => {
          const userName = res.data.name;
          this.setState({ borrower: userName, assignments: [] });
          // refreh all data in this component
          this.getLoanData();
          this.sendNewLoanNotification();
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  handlePhaseChange = (event) => {
    const filteredAssign = [];
    const updatePhase = event.target.value;
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`${base}/loan/${getLoanId}`)
      .then((loandata) => {
        const assignArr = loandata.data.assignments;
        const phaseArr = loandata.data.phases;
        for (let j = 0; j < assignArr.length; j += 1) {
          if (updatePhase === assignArr[j].phase) {
            filteredAssign.push(assignArr[j]);
          }
        }
        for (let i = 0; i < phaseArr.length; i += 1) {
          if (phaseArr[i].phase === updatePhase
          ) {
            this.setState({
              phaseId: phaseArr[i]._id,
              phaseTitle: phaseArr[i].phaseTitle,
              phaseContent: phaseArr[i].description,
              assignments: filteredAssign,
              phaseTitleNumber: updatePhase,
            });
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  editPhase = () => {
    if (this.state.userType === 'managerUser') {
      return (
        <Link to={`/edit_phase/${this.state.phaseId}-${this.state.loanId}+`}>{'  '}Edit</Link>
      );
    }
    return (<div />);
  }

  sendNewLoanNotification = () => {
    // axios request to get client name
    const request = { email: this.state.clientEmail };
    axios
      .post(`${base}/userbyemail`, request)
      .then((res) => {
        const clientName = res.data.name;

        // const link = "https://loanie.herokuapp.com/";
        const message = `Hi ${clientName}! Congratulations! Your loan process has now moved to the next phase! If you have any trouble or questions you can contact by phone at 1-800-000-0000 or by email at loaniecs4@gmail.com .`;

        if (this.state.acceptTexts) {
          // axios request to send text notification.
          const textRequest = {
            phoneNumber: res.data.mobilePhone,
            text: message,
          };
          axios
            .post(`${base}/sendsms`, textRequest)
            .then((resp) => {
              console.log('Success! Response from server: ', resp);
            })
            .catch((err) => {
              console.log('Loan creation failed.', err);
            });
        }

        // axios request to send email notification.
        if (this.state.acceptEmails) {
          const emailRequest = {
            email: this.state.clientEmail,
            text: message,
          };
          axios
            .post(`${base}/sendemail`, emailRequest)
            .then((response) => {
              console.log('Success! Response from server: ', response);
            })
            .catch((err) => {
              console.log('Loan creation failed.', err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // getter
    const token = this.state.tokenId;
    const user = this.state.userType;
    let loanRoute = '';
    let progressBarStyle = {};

    if (this.state.totalPhases.length === 5) {
      progressBarStyle = { marginLeft: '8.5em' };
    } else if (this.state.totalPhases.length === 6) {
      progressBarStyle = { marginLeft: '6.8em' };
    } else if (this.state.totalPhases.length === 8) {
      progressBarStyle = { marginLeft: '4.6em' };
    } else {
      progressBarStyle = { marginLeft: '6em' };
    }
    if (user === 'managerUser') loanRoute = '/open_loans';
    else loanRoute = '/my_loans';
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }

    const uneditableAssignments =
      this.state.assignments.map((val) => {
        return (
          <p>
            <input
              type="checkbox"
              defaultChecked={val.complete}
              disabled="disabled"
            /> {val.text}
          </p>
        );
      });

    const editableAssignments =
        this.state.assignments.map((val, index) => {
          const assignmentId = val._id;
          return (
            <p>
              <input
                type="checkbox"
                defaultChecked={val.complete}
                onChange={() => { this.completedAssignment(assignmentId, index); }}
              /> {val.text}
            </p>
          );
        });

    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href={loanRoute}>
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Loan Details</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="ClientLoan-title-container">
          <h1>
            <b>{this.state.phaseTitle}</b>
          </h1>
        </div>
        <div className="ClientLoan-container">
          <div className="ClientLoan-borrower-container">
            <p>
              <b>Borrower: </b>
              {this.state.borrower}
            </p>
            <p>
              <b>Type: </b>
              {this.state.type}
            </p>
            <p>
              <b>Amount:</b> ${this.state.amount}
            </p>
          </div>
          <div className="ClientLoan-progress-container">
            <div className="ClientLoan-phasetitle">
              <h5><b> Click on a number to see its phase </b></h5>
            </div>
            <div className="ClientLoan-phasebutton-container">
              {this.state.totalPhases.map((val, index) =>
                (
                  <div style={progressBarStyle} key={val.phase}>
                    <button
                      key={val.phase}
                      value={val.phase}
                      onClick={this.handlePhaseChange}
                    >
                      {index + 1}
                    </button>
                  </div>
                ))
              }
            </div>
            <br />
            <ProgressBar key={this.state.phaseNumber} />
          </div>
        </div>
        <div className="ClientLoan-phase-container">
          <Card>
            <CardHeader><h5><b>Phase {this.state.phaseTitleNumber}</b>{this.editPhase()}</h5>
            </CardHeader>
            <CardBody>
              <p className="ClientLoan-phase-item">
                {' '}
                <b>{this.state.phaseContent}</b>
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="ClientLoan-input-container">
          <Card>
            <CardHeader>
              <h5>
                <b>Complete these assignments to move to next phase</b>
              </h5>
            </CardHeader>
            <div className="ClientLoan-assignment-container">
              <p>
                <b>
                  Check back to see if your loan officer has checked off or added anymore assignments.
                </b>
              </p>
            </div>
            <div className="ClientLoan-list-container" key={this.state.phaseTitleNumber}>
              {this.state.userType === 'managerUser' ? (
                this.state.openLoan === false ? uneditableAssignments : editableAssignments
                ) : uneditableAssignments
              }
            </div>
          </Card>
        </div>
        <br />
        <p />
        <ClientSideNav />
      </div>
    );
  }
}