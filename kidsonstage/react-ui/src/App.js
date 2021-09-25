/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RequireAuth from './components/HOC/RequireAuth';
import WithTracker from './components/HOC/withTracker';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Settings from './components/EditAccount';
import SignIn from './components/Login';
import SignOut from './components/LogOut';
import Register from './components/Register';
import Users from './components/Users';
import Events from './components/Events';
import EventsNew from './components/EventsNew';
// import RfEvents from './components/RfEvents';
import EventDetail from './components/EventDetail';
import Billing from './components/stripe';

import './App.css';

/* eslint-disable react/jsx-max-props-per-line, no-console */

class App extends Component {
  static reload(from) {
    if (process.env.REACT_APP_SupressReload !== 'true') {
      // console.log(`REACT_APP_SupressReload: ${process.env.REACT_APP_SupressReload}`);
      // console.log(`REACT_APP_ReloadTimeOuts: ${process.env.REACT_APP_ReloadTimeOuts}`);
      const timeout = Number(process.env.REACT_APP_ReloadTimeOuts || '2200');
      sessionStorage.setItem('loading', true);
      setTimeout((t) => {
        console.log(`${from} reloading ${t}!`);
        document.location.reload(false);
        sessionStorage.setItem('loading', false);
      }, timeout, timeout);
    }
  }
  static checkAuth() {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');

    if (!id || !token) {
      return false;
      // return;
    }
    return true;
  }
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
    };
  }

  componentDidMount() {
    fetch('/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          message: json.message,
          fetching: false,
        });
      })
      .catch((e) => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false,
        });
      });
  }
  render() {
    const EventsWrapped = WithTracker(RequireAuth(Events));
    const HomeWrapped = WithTracker(Home);
    return (
      <div className="App">
        <NavBar auth={App.checkAuth()} />
        <div className="App--Body">
          {/* <div className="sideNavBar--Container">SideNavBar</div> */}
          <div>
            <Route
              exact path="/"
              render={props => <HomeWrapped {...props} checkAuth={App.checkAuth} />}
            />
            <Route path="/signin" component={WithTracker(SignIn)} />
            <Route path="/users" component={WithTracker(RequireAuth(Users))} />
            <Route path="/signout" component={WithTracker(RequireAuth(SignOut))} />
            <Route path="/signup" component={WithTracker(Register)} />
            <Route path="/settings" component={WithTracker(RequireAuth(Settings))} />
            <Route
              exact path="/events"
              render={props => <EventsWrapped {...props} testArg="x" reload={App.reload} />}
            />
            {/* <Route path="/rfevents" component={withTracker(RequireAuth(RfEvents))} /> */}
            <Route
              exact path="/events/new"
              component={WithTracker(RequireAuth(EventsNew))}
            />
            <Route
              exact path="/events/details"
              component={WithTracker(RequireAuth(EventDetail))}
            />
            <Route
              exact path="/events/purchase"
              component={WithTracker(RequireAuth(Billing))}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
