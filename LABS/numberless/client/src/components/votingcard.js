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
import React, { Component } from 'react';
import './styles/votingcard.css';
// i'm using the below reactjs library "popup" to generate a popup window once the user clicks on the DETAILS button
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3030';

class VotingCard extends Component {
  submitHandler = (charityId, event) => {
    const votes = this.props.user.userPledge / 10;
    axios
      .put(`${SERVER_URL}/charities/${charityId}`, { vote: votes })
      .then(response => {
        console.log('response from post', response);
      })
      .catch(() => {
        console.error('error getting data');
      });

    // change user to voted this month
    const userId = this.props.user._id;
    axios
      .put(`${SERVER_URL}/users/${userId}`, { voted: true })
      .then(response => {
        console.log('response from post', response);
      })
      .catch(() => {
        console.error('error getting data');
      });
  };

  render() {
    return (
      <div>
        {this.props.charities.map(c => {
          return (
            <div key={c._id} className="VotingCard">
              <div className="VotingCard_image">
                <img src={c.image} width="400" height="100" />
              </div>
              <div>
                <h2 className="VotingCard_Header">{c.charity}</h2>
              </div>

              <Popup
                trigger={
                  <div>
                    <button className="VotingCard_button">DETAILS</button>
                  </div>
                }
                position="right center"
                className="VotingCard"
              >
                {close => (
                  <div>
                    <h2 className="VotingCard_Header">{c.charity}</h2>
                    <p className="VotingCard_description">{c.description}</p>
                    <button className="VotingCard_button" onClick={close}>
                      CLOSE
                    </button>
                    <NavLink
                      to={{
                        pathname: '/thankyou',
                        state: { charity: c.charity }
                      }}
                    >
                      <button
                        className="VotingCard_button"
                        name="charityID"
                        onClick={e => this.submitHandler(c._id, e)}
                      >
                        SELECT AS WINNER
                      </button>
                    </NavLink>
                  </div>
                )}
              </Popup>
              <div>
                <NavLink
                  to={{
                    pathname: '/thankyou',
                    state: { charity: c.charity }
                  }}
                >
                  <input
                    type="submit"
                    value="SELECT"
                    className="VotingCard_button"
                    onClick={e => this.submitHandler(c._id, e)}
                  />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default VotingCard;
