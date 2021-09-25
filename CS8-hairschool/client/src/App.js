import React, { Component } from 'react';
import './App.css';
import { Link, Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

import SignUp from './components/Client/SignUp/SignUp';
import SignIn from './components/Client/SignIn/SignIn';

import ClientSchedule from './components/Client/ClientSchedule/ClientSchedule';
import ClientFeedback from './components/Client/ClientFeedback/ClientFeedback';
import Billing from './components/Client/Billing/Billing';
import Settings from './components/Client/Settings/Settings';

import AdminSchedule from './components/Admin/AdminSchedule/AdminSchedule';
import AdminFeedback from './components/Admin/AdminFeedback/AdminFeedback';


class App extends Component {
  render() {
    return (
      <div className="App">
        
        
        <Switch>
          <Route exact path="/" component={LandingPage}/>

          <Route path="/SignUp" component={SignUp}/>
          <Route path="/SignIn" component={SignIn}/>

          <Route path="/User/Schedule" component={ClientSchedule}/>
          <Route path="/User/Feedback" component={ClientFeedback}/>
          <Route path="/User/Billing" component={Billing}/>
          <Route path="/User/Settings" component={Settings}/>
         
          <Route path="/Admin/Schedule" component={AdminSchedule}/>
          <Route path="/Admin/Feedback" component={AdminFeedback}/>
        </Switch>

      </div>
    );
  }
}

export default App;
