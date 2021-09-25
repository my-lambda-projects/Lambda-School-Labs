import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';

import { Button } from 'mdbreact';
import PropTypes from 'prop-types';
// import centerPng from './graphics/landing-center-graphic.png';


import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/home.css';
import Logo from './graphics/Logo256x256.png';

export default class Home extends Component {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      // text: props.text,
    };
  }

  render() {
    return (
      <div className="home--container">
        <div className="home--landing_container">
          <h1>Kids on Stage!</h1>

          <img src={Logo} alt="logo" />

          <h2>A queue notification system for any event!</h2>

          <Link to={this.props.checkAuth ? '/events/new' : '/signin'}>
            <Button className="home--button" color="success" size="lg">
              Create Event <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
