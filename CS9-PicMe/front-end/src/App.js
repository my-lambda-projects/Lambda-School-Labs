import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Billing from './components/billing';
import HomePage from './components/homepage';
import Layout from './components/top-nav-bar-layout';
import ProfileSettings from "./components/profile-settings";
import Upload from "./components/upload";
import Uploads from "./components/uploads";
import MyCollectionPage from './components/MyCollectionPage';
// import { BrowserRouter } from "react-router-dom";
import Browse from './components/browse';
import friendsUploads from "./components/friendsUploads";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Friends from "./components/friends";
import { HashRouter } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Layout>
            <PrivateRoute exact path="/billing" component={Billing}/>
            <PrivateRoute exact path="/friends" component={Friends}/>
            <PrivateRoute exact path="/upload" component={Upload}/>
            <PrivateRoute exact path="/uploads" component={Uploads}/>
            <PrivateRoute exact path="/settings" component={ProfileSettings}/>
            <PrivateRoute exact path="/browse" component={Browse} />
            <PrivateRoute exact path="/collection" component={MyCollectionPage} />
            <PrivateRoute path="/friend/uploads" component={friendsUploads}/>
            <Route exact path="/aboutus" component={AboutUs}/>
            <Route exact path="/contact" component={ContactUs}/>
          </Layout>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
