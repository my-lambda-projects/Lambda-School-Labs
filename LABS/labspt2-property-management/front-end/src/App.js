import React, { Component } from "react";
import "./assets/css/App.css";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
// import RegisterTwo from './components/auth/register2';
import Pricing from "./components/LandingPage/Pricing";
import { logPageView } from "./utils/analytics";
import { initGA } from "./utils/analytics";
import LandingView from "./components/LandingPage/LandingView";
import { Route } from "react-router-dom";
// import { Link } from 'react-router-dom';
import PropertyList from "./components/properties/propertyList";
import TenantSideMenu from "./components/tenantViews/tenantSideMenu";
import SideMenu from "./components/adminViews/adminSideMenu";
import Workorderlist from "./components/WorkOrders/workorderList";
import Workorderform from "./components/WorkOrders/workorderform";
import AddProperty from "./components/properties/addProperty";
import DisplayProperty from "./components/properties/displayProperty";
import EditProperty from "./components/properties/editProperty";
import TenantSettings from "./components/tenantViews/tenantSettings";
import TenantDashboard from "./components/tenantViews/tenantDashboard";
import TenantPayments from "./components/tenantViews/tenantPayments";
import Billing from "./components/adminViews/adminBilling.js";
import AdminSettings from "./components/adminViews/adminSettings";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import AddTenant from "./components/AddTenant/addTenant";

library.add(faEnvelope, faKey);

// const url = process.env.home || 'http://localhost:9000';

//const url = 'http://localhost:9000';
const url = "https://tenantly-back.herokuapp.com";
const axios = require("axios");
const decode = require("jwt-decode");

class App extends Component {
  state = {
    loggedIn: null
  };

  componentDidMount() {
    initGA();
    logPageView();
    this.authenticate();
  }

  authenticate = () => {
    const token = localStorage.getItem("jwtToken");
    const auth = {
      headers: {
        Authorization: token
      }
    };
    if (token) {
      axios
        .get(url, auth)
        .then(res => {
          if (res.data) {
            this.setState({ loggedIn: true });
          } else {
            throw new Error();
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("Register and/or login to receive a token");
    }
  };

  isAdmin() {
    console.log(decode(localStorage.getItem("jwtToken")).isLandlord)
    return decode(localStorage.getItem("jwtToken")).isLandlord;
  }

  logOut = () => {
    console.log("logged out");
    localStorage.removeItem("jwtToken");
    this.setState({ loggedIn: false });
    // this.props.history.push('/');
  };

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <Route exact path={"/"} component={LandingView} />
          <Route exact path={"/register"} component={Register} />
          <Route path={"/register/plan"} component={Pricing} />
          <Route
            exact
            path={"/login"}
            render={props => (
              <Login {...props} authenticate={this.authenticate} />
            )}
          />
        </div>
      );
    } else if (this.isAdmin()) {
      return (
        <div className="dashboard-container">
          <div className="left-side">
            <Route path="/" render={() => <SideMenu logOut={this.logOut} />} />
          </div>
          <div className="right-side">
            <Route path="/properties" component={PropertyList} />
            <Route exact path="/billing" component={Billing} />
            <Route path="/worklist" component={Workorderlist} />
            <Route path="/view-property/:id" component={DisplayProperty} />
            <Route path="/add-property" component={AddProperty} />
            <Route exact path="/add-tenant" component={AddTenant} />
            <Route exact path="/edit/:id" component={EditProperty} />
            <Route exact path="/workorders/form" component={Workorderform} />
            <Route exact path="/settings" component={AdminSettings} />
          </div>
        </div>
      );
    } else if (!this.isAdmin()) {
      return (
        <div className="dashboard-container">
          <div className="left-side">
            <Route
              path="/"
              render={() => <TenantSideMenu logOut={this.logOut} />}
            />
          </div>
          <div className="right-side">
            <Route path="/dashboard" component={TenantDashboard} />
            <Route exact path="/payments" component={TenantPayments} />
            <Route exact path="/maintenance" component={Workorderform} />
            <Route exact path="/settings" component={TenantSettings} />
          </div>
        </div>
      );
    }
  }
}

export default App;
