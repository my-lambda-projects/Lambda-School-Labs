import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner';

import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./components/ExternalApi";
import Calendar from "./components/calendar/Calendar";
import Landing from "./components/landing/Landing";
import Confirmation from "./components/confirmation/Confirmation";
import Listing from "./components/listing/Listing";
import Listing2 from "./components/listing2/Listing2";
import Search from "./components/search/Search";
import Chart from "./components/charts/Chart";
import Chart2 from "./components/charts/Chart2";
import Chart3 from "./components/charts/Chart3";
import Mediator from './components/Mediator';

import Dashboard from "./components/dashboard/Dashboard";

import "./index.css";

import { useAuth0 } from "./react-auth0-wrapper";
import styled from "styled-components";

const MainContainerDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const StyledLoader = styled(Loader)`
  align-self: center;
  margin-top: 50vh;
`;

function App() {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();
  return (
    <MainContainerDiv className="App">
      <Router>
        <header>
          <NavBar />
          {/* {isAuthenticated && (
            <span>
              <Calendar />
            </span>
          )} */}
        </header>
        <Switch>

          {/* **** R O U T E S  F O R  T E S T I N G **** */}
          {/* <Route path="/" exact component={Confirmation} /> */}
          {/* <Route path="/" exact component={Calendar} /> */}
          {/* <Route path="/" exact component={Listing} /> */}
          {/* <Route path="/" exact component={Listing2} /> */}
          {/* <Route path="/" exact component={Dashboard} /> */}
          {/* <Route path="/" exact component={Search} /> */}
          {/* <Route path="/" exact component={Chart} /> */}
          {/* <Route path="/" exact component={Chart2} /> */}
          {/* <Route path="/" exact component={Chart3} /> */}

          {!loading ? <Route path="/" exact component={Landing} /> : <StyledLoader type="TailSpin" color="grey" height={80} width={80} />}

          {/* Created a component who's sole purpose is to redirect to either searchbar or dashboard. */}
          <PrivateRoute path="/mediator" exact component={Mediator} />

          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/confirmation" exact component={Confirmation} />
          <PrivateRoute path="/search" exact component={Search} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
          <PrivateRoute path="/listing" exact component={Listing2} />

        {/* **** D E M O  R O U T E S **** */}

          <Route path="/demo-dashboard" exact component={Dashboard} />
          <Route path="/demo-confirmation" exact component={Confirmation} />
          <Route path="/demo-search" exact component={Search} />
          <Route path="/demo-profile" component={Profile} />
          <Route path="/demo-external-api" component={ExternalApi} />
          <Route path="/demo-listing" exact component={Listing2} />

        </Switch>
      </Router>
    </MainContainerDiv>
  );
}

export default App;
