import React, { Component } from "react";
import { connect } from "react-redux";
import "./getstarted.css";
import { addUser } from "../../store/actions/userActions";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
import StripeCheckout from "react-stripe-checkout";
import CheckOut from "../landingpage/eatwellimage.png";

class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      zip: null,
      healthCondition: "",
      visable: false,
      modal: false
    };
    this.onToken.bind(this);
  }
  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    this.props.history.push("/");
  };
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
    } else {
      this.props.history.push("/");
    }
  };
  onToken = token => {
    console.log("onToken", token);
  };
  render() {
    return (
      <div className="homepage-main-fence-getstarted">
        <div className="user-profile-card">
          <StripeCheckout
            amount="499"
            billingAddress
            description="EatWell Meal Tracker"
            image={CheckOut}
            locale="auto"
            name="eat-well.app"
            label="Get Premium!"
            panelLabel="Purchase for {{amount}}"
            stripeKey="pk_test_rMbD3kGkxVoOsMd0meVqUlmG"
            token={this.onToken}
            zipCode
          />
          <Link to="/homepage/getstarted" style={{ textDecoration: "none" }}>
            <div className="user-profile-card-getstarted">Get Started!</div>
          </Link>
          <Link to="/homepage/settings" style={{ textDecoration: "none" }}>
            <div className="user-profile-card-settings">Settings</div>
          </Link>
          <a onClick={this.logout} style={{ textDecoration: "none" }}>
            <div className="user-profile-card-logout">Logout</div>
          </a>
          <h1 className="user-profile-card-cta">
            Hey, [username] let's
            <h1 className="user-profile-card-cta-logo">EatWell!</h1>
          </h1>
          <div className="user-profile-card-infobox">
            <p className="user-profile-card-infobox-date">
              Today is:
              <br />
              <Moment format="LLLL">{this.props.dateToFormat}</Moment>
            </p>
            <p className="user-profile-card-infobox-last-meal">
              Your last meal was:
            </p>
            <p className="user-profile-card-infobox-next-meal">
              Your next meal will be in:
            </p>
          </div>
          <div className="">Total Stats</div>
          <div
            className="user-profile-card-stats"
            style={{ textDecoration: "none" }}
          >
            <Link
              to="/homepage/meals/new"
              className="stat-divider"
              style={{ textDecoration: "none" }}
            >
              <h3 className="stat-text">Meals</h3>
            </Link>
            <Link
              to="/homepage/recipes"
              className="stat-divider"
              style={{ textDecoration: "none" }}
            >
              <h3 className="stat-text">Recipes</h3>
            </Link>
            <Link
              to="/homepage/alarms"
              className="stat-divider"
              style={{ textDecoration: "none" }}
            >
              <h3 className="stat-text">Alarms</h3>
            </Link>
          </div>
          <div
            className="user-profile-card-stats-live"
            style={{ textDecoration: "none" }}
          >
            <Link
              to="/homepage/meals/new"
              className="stat-divider-live"
              style={{ textDecoration: "none" }}
            >
              <h3 className="stat-text-live">Meals</h3>
            </Link>
            <Link
              to="/homepage/recipes"
              className="stat-divider-live"
              style={{ textDecoration: "none" }}
            >
              <h3 className="stat-text-live">Recipes</h3>
            </Link>
            <Link
              to="/homepage/alarms"
              className="stat-divider-live"
              style={{ textDecoration: "none" }}
            >
              <h3 className="stat-text-live">Alarms</h3>
            </Link>
          </div>
          <div className="user-profile-card-body">
            <p className="user-profile-card-body-text">
              Eat. Track. Analyze. <br />
              <p className="user-profile-card-body-text-logo">EatWell</p>
            </p>
          </div>
        </div>
        <div className="get-started-container">
          <Link
            to="/homepage/recipes"
            className="get-started-cta-link"
            style={{ textDecoration: "none" }}
          >
            <h1 className="get-started-cta">Get Started Here!</h1>
          </Link>
          <div class="inapp-choice-wrapper">
            <div class="box recipes">
              Step 1: Recipes
              <br />
              <p className="recipes-text">
                It all starts with the recipe. Click recipe and start adding
                your ingredients!
              </p>
            </div>

            <div class="box meals">
              Step 3: Meals <br />
              <p className="meals-text">Name your meal and add the recipe.</p>
            </div>
            <div class="box ingredients">
              Step 2: Ingredients <br />
              <p className="ingredients-text">
                From your recipe modal, enter the ingredients and save them.
              </p>
            </div>
            <div class="box alarms">
              Step 4: Alarms
              <br />
              <p className="alarms-text">
                And last, set your alarms to remind you to eat.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  meals: state.mealsReducer.meals
});

export default connect(
  mapStateToProps,
  { addUser }
)(withRouter(GetStarted));
