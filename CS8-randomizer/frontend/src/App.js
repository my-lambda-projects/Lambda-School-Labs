import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import DropBar from "./navigation/SideBar/SideDrop";
import BottomMenu from "./navigation/SideBar/BottomMenu";
import LogOut from "./navigation/LogOut";

import {
  Landing,
  MagicRandomizer,
  Setup,
  ClassList,
  About,
  SignUp,
  ClassForm,
  Home,
  Billing,
  EditForm
} from "./components";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import "./App.css";
//import Checkout from './components/Checkout'
// Breadcrumb Routes
const routes = {
  // "/": "Index",
  "/home": "Home",
  "/classes": "Classes",
  "/create": "New Class",
  "/classes/:id": ":id",
  "/classes/randomizer/:id": "Randomizer",
  "/classes/edit": "Edit Class",
  "/classes/create": "Create Class",
  "/billing": "Billing",
  "/settings": "Settings"
};

const currentPath = window.location.pathname;


class App extends Component {
  constructor() {
    super();
    this.test = this.test.bind(this);
    this.state = {
      isAuth: false,
      hideNav: true
    };
  }

  test(e) {
    e.preventDefault();
    this.setState({
      isAuth: !this.state.isAuth
    });
  }

  componentDidMount() {
    console.log("Mounted...");
    console.log(this.state.isAuth);
  }

  render() {
    return (
      <Router>
        <div className="App">
          {currentPath == "/" ? (
            <Route
              exact
              path={"/"}
              render={() =>
                this.props.authed ? (
                  <Redirect to="/classes/" />
                ) : (
                  <Landing auth={this.state.isAuth} />
                )
              }
            />
          ) : (
            <div className="MainAppComponents">
              <div className="top" id="top-bar">
                <Breadcrumbs id="Crumb" mappedRoutes={routes} />
                <LogOut className="LogBar" />
              </div>
              <div className="appPanel">
                <DropBar />
                <BottomMenu />
                <Route exact path={"/"} render={() => <Home />} />
                <Route exact path={"/:id/edit"} render={props => <EditForm {...props} />} />
                <Route exact path={"/classes"} render={() => <ClassList />} />
                <Route exact path={"/create"} render={() => <ClassForm />} />
                <Route
                  exact
                  path={"/classes/:id"}
                  // params ={thi}
                  render={props => <MagicRandomizer {...props} />}
                />
                <Route exact path={"/billing"} render={() => <Billing />} />
                <Route exact path={"/about"} render={() => <About />} />
                <Route exact path={"/settings"} render={() => <Setup />} />
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    authed: state.authed
  };
};

export default connect(
  mapStateToProps,
  {}
)(App);
