import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Billing from "./components/billing/Billing";
import { StripeProvider } from "react-stripe-elements";
import Question from "./components/question/Question";
import Main from "./components/question/Main";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Navigation from "./components/landing/Navigation";
import Decision from "./components/question/Decision";

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_zwL3UU7M5FXPJkHognp6dYFr">
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Route exact path="/" component={Landing} />
            <Route exact path="/landing-page" component={Landing} />
            <Route exact path="/billing/:id" component={Billing} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/question-page" component={Question} />
            <Route exact path="/mainpage" component={Main} />
            <Route path="/decision/decisionCode/:id" component={Decision} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/logout" component={Landing} />
          </div>
        </BrowserRouter>
      </StripeProvider>
    );
  }
}

export default App;
