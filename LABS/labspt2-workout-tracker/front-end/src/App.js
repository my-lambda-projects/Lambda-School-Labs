import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import auth from './Auth';
import './components/styles/App.sass';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Callback from './Callback';
import ScheduleView from './components/ScheduleView';
import WorkoutsView from './containers/WorkoutsView';
import ProgressView from './containers/ProgressView';
import SettingsView from './components/SettingsView';
import SecuredRoute from './components/SecuredRoute';

class App extends Component {
  componentDidMount() {
    const { renewSession } = auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute path="/schedule" component={ScheduleView} />
        <SecuredRoute path="/workouts" component={WorkoutsView} />
        <SecuredRoute path="/progress" component={ProgressView} />
        <SecuredRoute path="/settings" component={SettingsView} />
      </div>
    );
  }
}

export default App;
