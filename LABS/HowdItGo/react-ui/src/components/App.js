import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import AccountPage from './Account';
import PasswordPage from './Password';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from '../constants/routes';
import Dashboard from "./dashboard";
import Navigation from "./Navigation";

const App = () => (
  <Router>
    <div>
<Navigation/>
      <Route exact path={routes.DASHBOARD} component={() => <Dashboard />} />
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.PASSWORD} component={() => <PasswordPage />} />

    </div>
  </Router>
);
export default App;
