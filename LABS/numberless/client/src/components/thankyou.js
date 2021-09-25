import React, { Component } from 'react';
import './styles/thankyou.css';
import { Link } from 'react-router-dom';
import Landing from './landing.js';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3030';

class ThankYou extends Component {
  state = { charity: '', user: '' };

  // get the current user from db
  getUser = () => {
    const currentUser = sessionStorage.getItem('user');
    axios
      .get(`${SERVER_URL}/users/${currentUser}`)
      .then(response => {
        this.setState({
          user: response.data
        });
        //console.log(response.data);
      })
      .catch(() => {
        console.error('error getting data');
      });
  };

  getCharity = () => {
    let charity = '';

    axios
      .get(`${SERVER_URL}/charities/${charity}`)
      .then(response => {
        this.setState({
          user: response.data
        });
        //console.log(response.data);
      })
      .catch(() => {
        console.error('error getting data');
      });
  };

  render() {
    return (
      <div className="thankyou">
        <div>
          <img
            src={require('./static/thankyou.jpg')}
            height="150"
            width="150"
            placeholder="Thanks"
          />
          <p className="title">Thank You!</p>
          <p>YOUR VOTE HAS BEEN CAST</p>
        </div>

        <div>
          <p>This months donation has been allocated to {this.state.charity}</p>
        </div>

        <div>
          <Link to="/landing">
            <input
              className="thankyou-button"
              value="RETURN HOME"
              type="submit"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default ThankYou;
