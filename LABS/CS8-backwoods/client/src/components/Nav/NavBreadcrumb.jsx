import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

class NavBreadcrumb extends React.Component {
  nextBreadCrumb() {
    const { user } = this.props;
    const currentLocation = window.location.pathname;
    const t = currentLocation.split("/");
    if (currentLocation === `/${user}`) {
      return null;
    }
    return [
      <i key={1} className="material-icons">
        keyboard_arrow_right
      </i>,
      <div key={2}>{t[t.length - 1]}</div>
    ];
  }

  render() {
    const { user } = this.props;
    return (
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <React.Fragment>
          <div style={{ display: "flex" }}>
            <Typography variant="title" color="inherit" noWrap>
              <Link to={`/${user}`} className="navBarLinks">
                Home
              </Link>
            </Typography>
            {this.nextBreadCrumb()}
          </div>
        </React.Fragment>
      </Slide>
    );
  }
}

NavBreadcrumb.propTypes = {
  user: PropTypes.string.isRequired
};

export default NavBreadcrumb;
