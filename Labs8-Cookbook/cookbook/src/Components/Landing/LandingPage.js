import React, { Component } from "react";
import auth from "../../Auth/Auth.js";

import titleImg from "../../Images/titleImg-min.jpeg";
import { HashLink as Link } from "react-router-hash-link";
import logo from "../../designs/Logo/CookBookLogoWithShadow.svg";
import chevron from "../../designs/Misc/Chevron.svg";
import add_recipe from "../../designs/LandingPage/add_recipe.svg";
import recipes from "../../designs/LandingPage/recipes.svg";
import calendar from "../../designs/LandingPage/calendar.svg";
import grocery from "../../designs/LandingPage/grocery.svg";
import { Helmet } from "react-helmet";

const { isAuthenticated } = auth;

class LandingPage extends Component {
  login() {
    auth.login();
  }

  componentDidMount() {
    if (isAuthenticated()) this.props.history.push("/home");
  }

  render() {
    return (
      <div className="landing-container">
        <Helmet>
          <title>COOKBOOK</title>
        </Helmet>
        <div
          className="above-the-fold"
          style={{ backgroundImage: `url(${titleImg})` }}
        >
          <div className="branding">
            <img className="logo" src={logo} alt="company logo" />

            <div className="title">
              <div className="name">
                <span>C</span>
                <span>O</span>
                <span>O</span>
                <span>K</span>
                <span>B</span>
                <span>O</span>
                <span>O</span>
                <span>K</span>
              </div>

              <p className="hook">All of your recipes. All in one place.</p>
            </div>
          </div>

          <div className="call-to-action" onClick={this.login.bind(this)}>
            login / register
          </div>

          <div className="learn-more">
            <p>
              <Link smooth to="#lp-content">
                learn more
              </Link>
            </p>
            <img className="chevron" src={chevron} alt="v" />
          </div>
        </div>

        <div className="below-the-fold" id="lp-content">
          <div className="landing-add-recipe">
            <img
              className="add-recipe-image"
              src={add_recipe}
              alt="add_recipe"
            />
            <p className="add-recipe-text">
              Add recipes from any website into your collection.
            </p>
          </div>

          <div className="landing-recipes">
            <p className="recipes-text">
              Easily search and filter the recipes in your collection, and view
              all of the information for any recipe.
            </p>
            <img className="recipes-image" src={recipes} alt="recipes" />
          </div>

          <div className="landing-calendar">
            <img className="calendar-image" src={calendar} alt="calendar" />
            <p className="calendar-text">
              Plan your meals by scheduling recipes for any amount of days.
            </p>
          </div>

          <div className="landing-grocery">
            <p className="grocery-text">
              Generate a grocery list of the ingredients you'll need for a
              customized date range.
            </p>
            <img className="grocery-image" src={grocery} alt="grocery" />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
