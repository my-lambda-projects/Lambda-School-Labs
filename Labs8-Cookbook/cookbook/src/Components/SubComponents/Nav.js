import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import renderIf from "render-if";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        {renderIf(this.props.location.pathname !== "/home/create")(
          <Link
            className="create-nav"
            to="/home/create"
            style={{ textDecoration: "none", color: "#D85E50" }}
          >
            <span className="span">ADD RECIPE</span>
          </Link>
        )}
        {renderIf(!this.props.location.pathname.includes("/home/recipe"))(
          <Link
            className="recipes-nav"
            to="/home/recipes"
            style={{ textDecoration: "none", color: "#343e5a" }}
          >
            <span className="span">RECIPES</span>
          </Link>
        )}
        {renderIf(this.props.location.pathname !== "/home/calendar")(
          <Link
            className="calendar-nav"
            to="/home/calendar"
            style={{ textDecoration: "none", color: "#F5E6DC" }}
          >
            <span className="span">CALENDAR</span>
          </Link>
        )}
        {renderIf(this.props.location.pathname !== "/home/dashboard")(
          <Link
            className="dashboard-nav"
            to="/home/dashboard"
            style={{ textDecoration: "none", color: "#ffc988" }}
          >
            <span className="span">GROCERY LIST</span>
          </Link>
        )}
        {renderIf(this.props.location.pathname !== "/home/settings")(
          <Link
            className="settings-nav"
            to="/home/settings"
            style={{ textDecoration: "none", color: "#B3C1CC" }}
          >
            <span className="span">SETTINGS</span>
          </Link>
        )}
      </div>
    );
  }
}

export default withRouter(Nav);
