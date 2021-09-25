import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import auth from "../../Auth/Auth.js";
import Header from "../SubComponents/Header";
import Nav from "../SubComponents/Nav";
import CurrentPage from "../SubComponents/CurrentPage";
import Create from "./SubPages/Create";
import Recipes from "./SubPages/Recipes";
import Calendar from "./SubPages/Calendar";
import GroceryList from "./SubPages/GroceryList";
import Settings from "./SubPages/Settings";
import RecipeView from "./SubPages/RecipeView";
import { Helmet } from "react-helmet";

class Home extends Component {
  componentDidMount() {
    if (!auth.isAuthenticated()) this.props.history.push("/");
    else if (this.props.location.pathname === "/home")
      this.props.history.push("/home/recipes");
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Nav />
        <CurrentPage />
        <Helmet>
          <title>COOKBOOK</title>
        </Helmet>
        <div className="home-container">
          <div className="home-content">
            <Switch>
              <Route exact path="/home/create" component={Create} />
              <Route exact path="/home/recipes" component={Recipes} />
              <Route exact path="/home/calendar" component={Calendar} />
              <Route exact path="/home/dashboard" component={GroceryList} />
              <Route exact path="/home/settings" component={Settings} />
              <Route path="/home/recipe/" component={RecipeView} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
