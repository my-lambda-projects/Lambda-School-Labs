import React, { Component } from 'react';
import './styles/voting.css';
import VotingCard from './votingcard.js';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3030';

// you will have to insert a voting-card component
// similar to the way you had a post container in you instagram app
// the voting-card component will go through the database
// and select the following for each charity of the month:
// charity of the month image
// charity of the month name
// the voting card component will then have 2 buttons:
// details button - opens popup with charityinfo page
// select button - need to keep track of charity votes somehow

// charity info page - depending on how the details button works, i have to build this also
// title of charity
// extended info about charity
// close button - return to voting page
// select as winner button - again, need to keep track of charity votes somehow

class Voting extends Component {
  constructor() {
    super();
    this.state = {
      charities: [],
      user: {}
    };
  }

  componentDidMount() {
    this.getCharities();
    this.getUser();
  }
  // get the current user' pledge
  getUser = () => {
    const currentUser =
      sessionStorage.getItem('user') || '5b0dcc2e2547e340a3892521';
    console.log(sessionStorage.getItem('user'));
    axios
      .get(`${SERVER_URL}/users/${currentUser}`)
      .then(response => {
        this.setState({
          user: response.data
        });
        console.log(response.data);
      })
      .catch(() => {
        console.error('error getting data');
      });
  };
  // get the current active charities

  getCharities = () => {
    const charities = [];
    axios
      .get(`${SERVER_URL}/charities`)
      .then(response => {
        response.data.forEach(e => {
          if (e.active === true) {
            charities.push(e);
          }
        });
        this.setState({
          charities: charities
        });
      })
      .catch(() => {
        console.error('error getting data');
      });
  };

  addCharityVotes = () => {};

  render() {
    return (
      <div className="voting">
        <header>
          <h1 className="votingHeading">VOTE</h1>
          <h3 className="votingHeading">FOR THIS MONTHS CHARITY</h3>
        </header>

        <div>
          <VotingCard charities={this.state.charities} user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default Voting;
