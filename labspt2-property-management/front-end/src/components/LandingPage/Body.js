import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HomeSection from "./HomeSection";
import Pricing from "./Pricing";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Body(props) {
  const { classes } = props;
  return (
    <div className={classes.root} id="body">
      <HomeSection />
      <Pricing />
    </div>
  );
}

Body.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Body);
