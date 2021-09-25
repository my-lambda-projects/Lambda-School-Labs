import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import renderIf from "render-if";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CurrentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNav: false
    };
  }

  // decides nav icons color when it mounts
  componentDidMount() {
    this.navIconColors();
  }

  // decides colors of nav icon when pathname changes
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.navIconColors();
    }
  }

  // helper function: colors of phone nav icon changes depending on path.
  navIconColors() {
    if (this.props.location.pathname === "/home/create") {
      document.getElementById("nav-icon").style.color = "#fed092";
      document.getElementById("nav-icon").style.backgroundColor = "#de6a5a";
    } else if (this.props.location.pathname.includes("/home/recipe")) {
      document.getElementById("nav-icon").style.color = "#f5e9df";
      document.getElementById("nav-icon").style.backgroundColor = "#343e5a";
    } else if (this.props.location.pathname === "/home/calendar") {
      document.getElementById("nav-icon").style.color = "#bcc9d2";
      document.getElementById("nav-icon").style.backgroundColor = "#f5e9df";
    } else if (this.props.location.pathname === "/home/dashboard") {
      document.getElementById("nav-icon").style.color = "#343e5a";
      document.getElementById("nav-icon").style.backgroundColor = "#fed092";
    } else if (this.props.location.pathname === "/home/settings") {
      document.getElementById("nav-icon").style.color = "#de6a5a";
      document.getElementById("nav-icon").style.backgroundColor = "#bcc9d2";
    }
  }

  toggleNav = () => {
    this.setState({ displayNav: !this.state.displayNav });
  }

  handleNavClass = () => {
    if (this.state.displayNav) {
      return 'phone-nav-show';
    } else {
      return 'phone-nav-hide';
    }
  }

  render() {
    return (
      <div className="cp-phone-nav">
        <div className="current-page">
          {renderIf(this.props.location.pathname === "/home/create")(
            <Link
              onClick={() => this.toggleNav()}
              to="/home/create"
              style={{ textDecoration: "none", color: "#D85E50" }}
            >
              <div onClick={() => this.toggleNav()} className="pg-bar create-cp">ADD RECIPE</div>
            </Link>
          )}
          {renderIf(this.props.location.pathname.includes("/home/recipe"))(
            <Link
              onClick={() => this.toggleNav()}
              to="/home/recipes"
              style={{ textDecoration: "none", color: "#2E3650" }}
            >
              <div onClick={() => this.toggleNav()} className="pg-bar recipes-cp">RECIPES</div>
            </Link>
          )}
          {renderIf(this.props.location.pathname === "/home/calendar")(
            <Link
              onClick={() => this.toggleNav()}
              to="/home/calendar"
              style={{ textDecoration: "none", color: "#F5E6DC" }}
            >
              <div onClick={() => this.toggleNav()} className="pg-bar calendar-cp">CALENDAR</div>
            </Link>
          )}
          {renderIf(this.props.location.pathname === "/home/dashboard")(
            <Link
              onClick={() => this.toggleNav()}
              to="/home/dashboard"
              style={{ textDecoration: "none", color: "#ffc988" }}
            >
              <div onClick={() => this.toggleNav()} className="pg-bar dashboard-cp">GROCERY LIST</div>
            </Link>
          )}
          {renderIf(this.props.location.pathname === "/home/settings")(
            <Link
              onClick={() => this.toggleNav()}
              to="/home/settings"
              style={{ textDecoration: "none", color: "#B3C1CC" }}
            >
              <div onClick={() => this.toggleNav()} className="pg-bar settings-cp">SETTINGS</div>
            </Link>
          )}
        </div>

        <div className="dropdown">

          <div className="nav-icon" id="nav-icon" onClick={() => this.toggleNav()}>
            <FontAwesomeIcon icon="ellipsis-v" className="icon" />
          </div>

          <div className={this.handleNavClass()}>
            {renderIf(this.props.location.pathname !== "/home/create")(
              <Link
                className="nav-bar"
                to="/home/create"
                style={{ textDecoration: "none", color: "#de6a5a" }}
              >
                <div className="nav-bar" style={{ backgroundColor: "#fed092" }}>ADD RECIPE</div>
              </Link>
            )}
            {renderIf(!this.props.location.pathname.includes("/home/recipe"))(
              <Link
                className="nav-bar"
                to="/home/recipes"
                style={{ textDecoration: "none", color: "#343e5a" }}
              >
                <div className="nav-bar" style={{ backgroundColor: "#f5e9df" }}>RECIPES</div>
              </Link>
            )}
            {renderIf(this.props.location.pathname !== "/home/calendar")(
              <Link
                className="nav-bar"
                to="/home/calendar"
                style={{ textDecoration: "none", color: "#f5e9df" }}
              >
                <div className="nav-bar" style={{ color: "#F5E6DC", backgroundColor: "#bcc9d2" }}>CALENDAR</div>
              </Link>
            )}
            {renderIf(this.props.location.pathname !== "/home/dashboard")(
              <Link
                className="nav-bar"
                to="/home/dashboard"
                style={{ textDecoration: "none", color: "#ffc988" }}
              >
                <div className="nav-bar" style={{ backgroundColor: "#343e5a" }}>GROCERY LIST</div>
              </Link>
            )}
            {renderIf(this.props.location.pathname !== "/home/settings")(
              <Link
                className="nav-bar"
                to="/home/settings"
                style={{ textDecoration: "none", color: "#bcc9d2" }}
              >
                <div className="nav-bar" style={{ backgroundColor: "#de6a5a" }}>SETTINGS</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CurrentPage);
