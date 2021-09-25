import React, { Component } from 'react';
import Landing from './Components/Landing';
import { Route } from 'react-router-dom';
import SignUp from './Components/Signup';
import Signin from './Components/SignIn';
import EmployerDashboard from './Components/EmployerDashboard';
import Dashboard from './Components/Dashboard';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/SignUp" render={props => <SignUp {...props}/>} />
        <Route path="/Signin" component={Signin} />
        <Route path= '/admin-dashboard' component = {EmployerDashboard} />
        <Route path= '/Dashboard' component = { Dashboard } />
      </div>
    );
  }
}

export default App;
