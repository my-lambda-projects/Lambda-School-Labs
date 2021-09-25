import React, { Component } from "react";
import ParentNav from "./components/NavContainer/ParentNav";
import "./index.scss";
import axios from "axios";
import { Elements, StripeProvider } from "react-stripe-elements";
import { updateIsLoggedInTrue } from './actions/isLoggedInAction.js'
import { connect } from 'react-redux'
require("dotenv").config();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }
  componentDidMount() {
    //grab FbAcessToken from local storage
    if(localStorage.getItem("SAMUserID"))   {
        console.log("hit userid")
        this.props.updateIsLoggedInTrue()
    }
  }
  render() {
    return (
      <div className="App">
              <StripeProvider apiKey="pk_test_krA4dF6Zbe7WEYEqao5EeKmv00SpwNokud">
                      <Elements>
                         <ParentNav/>
                      </Elements>
              </StripeProvider>
      </div>
    );
  }
}

const mapStateToProps   =   state   =>  {
    return {}
}

export default connect(mapStateToProps, { updateIsLoggedInTrue })(App);
