import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import Aircrafts from './Aircraft/Aircrafts';
import Flights from './Flights/Flights';
import Settings from './User/Settings';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import Instructors from './User/Instructors';
import Billing from './Billing/Billing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/aircrafts" component={Aircrafts} />
        <Route path="/billing" component={Billing} />
        <Route path="/flights" component={Flights} />
        <Route path="/settings" component={Settings} />
        <Route path="/instructors" component={Instructors} />
      </div>
    );
  }
}

export default App;
