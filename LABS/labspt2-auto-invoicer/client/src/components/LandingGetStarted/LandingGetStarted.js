import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import "./LandingGetStarted.css";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: 280,
    width: "100%"
  },
  greenButton: {
    backgroundColor: "#2d2f31",
    color: "#fff",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#8bc34a"
    }
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  icon: {
    fontSize: 18,
    margin: theme.spacing.unit
  },
  features: {
    alignItems: "center",
    color: "#6EB700",
    display: "flex",
    fontSize: 14
  },
  lockedFeatures: {
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
    display: "flex",
    fontSize: 14
  },
  description: {
    fontSize: 14
  }
});

const LandingGetStarted = props => {
  const { classes } = props;
  return (
    <div className="landing-get-started-container">
      <div className="landing-get-started">
        <div className="get-started-text">
          <Typography variant="h3" style={{ color: "white" }}>
            STOP WAITING AND START INVOICING
          </Typography>
        </div>
        <div className="card">
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    Free
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.features}>
                <CheckIcon className={classes.icon} />
                Unlimited Invoices
              </Typography>
              <Typography className={classes.lockedFeatures}>
                <ClearIcon className={classes.icon} />
                Unlimited Customers
              </Typography>
              <Typography className={classes.lockedFeatures}>
                <ClearIcon className={classes.icon} />
                Unlimited Companies
              </Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
              <Typography variant="body1">
                Simply create a free account and get started with your free
                invoice on the go!
              </Typography>
            </div>
            <div className={classes.section3}>
              <Button
                variant="contained"
                color="primary"
                className={classes.greenButton}
                fullWidth
              >
                <Typography variant="button">Try For free</Typography>
              </Button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    Premium
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h4">
                    $6/month
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.features}>
                <CheckIcon className={classes.icon} />
                Unlimited Invoices
              </Typography>
              <Typography className={classes.features}>
                <CheckIcon className={classes.icon} />
                Unlimited Customers
              </Typography>
              <Typography className={classes.features}>
                <CheckIcon className={classes.icon} />
                Unlimited Companies
              </Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
              <Typography variant="body1">
                Unlimited invoices for unlimited customers. Create an account to
                save your invoices, customers and company settings for
                convenient access.
              </Typography>
            </div>
            <div className={classes.section3}>
              <Button
                variant="contained"
                color="primary"
                className={classes.greenButton}
                fullWidth
              >
                <Typography variant="button">Get Premium</Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(LandingGetStarted);
