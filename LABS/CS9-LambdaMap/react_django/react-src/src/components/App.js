import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import HpProfileView from "./HpProfileView/hpProfileView";
import JSprofile from "./jobseeker-profile/JSprofile";
import MainLanding from "./landing-page/main-landing/MainLanding";
import ClientLanding from "./landing-page/client-landing/ClientLanding";
import HPlanding from "./landing-page/hp-landing/HPlanding";
import HPMapView from "./map/hp-map/hpmap";
import JSMapView from "./map/client-map/jsmap";
import JSlistView from "./list-views/jobseekers-HPview/JSlistView";
import CompanySettings from "./settings/HP-settings/CompanySettings";
import StudentSettings from "./settings/studentSettings/StudentSettings";
import JobslistView from "./list-views/jobspage-JSview/JobslistView";
import Billing from "./billing/billing";
import JSviewJS from "./jobseeker-profile/JSviewJS";
import HPviewHP from "./HpProfileView/HPviewHP";
import UserProfile from "./jobseeker-profile/UserProfile";

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* Sign in and register page */}
        <Route exact path="/" component={MainLanding} />
        
        {/* Job Seeker routes, will start getting private routing implemented */}
        <Route path="/jslanding/" component={ClientLanding} />
        <Route path="/jsmap/" component={JSMapView} />
        <Route path="/jobslist/" component={JobslistView} />
        <Route path="/jsview/:id/" component={JSviewJS} />  {/* <--- allows js to view other js profiles */}
        <Route path="/userprofile/" component={UserProfile} />
        <Route path="/hpprofile/:id" component={HpProfileView} />
        <Route path="/jssettings/" component={StudentSettings} />
        {/* <Route path="/jsfavorites/" component={} /> */}
        {/* <Route path="/jsmessages/" component={} /> */}
        
        {/* Hire Partner routes */}
        <Route path="/hplanding/" component={HPlanding} />
        <Route path="/hpmap/" component={HPMapView} />
        <Route path="/jobseekers/" component={JSlistView} />
        <Route path="/jsprofile/:id/" component={JSprofile} />
        <Route path="/hpview/:id" component={HPviewHP} />  {/* <--- allows hp to view other hp profiles */}
        <Route path="/settings/" component={CompanySettings} />
        <Route path="/billing" component={Billing} />
        {/* <Route path="/hpfavorites/" component={} /> */}
        {/* <Route path="/hpmessages/" component={} /> */}
      </div>
    );
  }
}

export default App;
