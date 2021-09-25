/**
   App.js
   ====================================================
   CREATED: 2018-05-16
   VERSION 0.1.0
   TEAM: Jason Campbell, Manisha Lal, Wesley Harvey
   ABOUT: Main Application Component
   NOTES:
   ----------------------------------------------------
 */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import config from './client.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import Billing from "./components/Billing";
import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <main>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/billing" component={Billing} />
          <SecureRoute path="/profile" component={ProfilePage} />
        </main>
      </div>
    );
  }
}
