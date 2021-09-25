import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

import styles from "./styles";

const TopBar = props => {
  const { checked, classes, name } = props;
  return (
    <Grid style={{ paddingLeft: 0 }} item xs={12}>
      <div className={classes.topBar}>
        <div className={classes.block}>
          <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
            <Typography variant="h4" gutterBottom>
              Welcome,{" "}
              {name.toLowerCase().replace(/\b\w/g, I => I.toUpperCase())}!
            </Typography>
          </Slide>
        </div>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(TopBar);
