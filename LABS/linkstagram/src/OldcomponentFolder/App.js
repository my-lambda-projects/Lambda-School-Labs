import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './Component/LandingPage';
import Dashboard from './Component/Dashboard';
import PhotoGallery from './Component/PhotoGallery';
import PhotoPage from './Component/PhotoPage';
import BillingPage from './Component/Billing';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import SettingsPage from './Component/Settings';


import './index.css';

class App extends Component {
  render() {
    return (
      <Router >

        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/gallery" component={PhotoPage} exact />
          <Route path="/user" component={PhotoGallery} exact />
          <Route path="/billing" component={BillingPage} exact />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/settings" exact component={SettingsPage} />
        </Switch>

      </Router>
    );
  }
}

export default App;
