import React from "react";

import { ReactComponent as InvoicesSVG } from "../../assets/undraw_printing_invoices_5r4r.svg";
import { ReactComponent as ChartsSVG } from "../../assets/undraw_finance_0bdk.svg";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    background: "#ffffff"
  },
  features: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "1.6rem",
    maxWidth: 1080,
    padding: "100px 0",
    width: "100%"
  },
  top: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%"
  },
  topText: {
    maxWidth: 360,
    padding: "8px",
    width: "100%"
  },
  bottom: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 40,
    width: "100%"
  },
  bottomText: {
    maxWidth: 460,
    padding: "8px",
    width: "100%"
  }
};

const LandingFeaturesText = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <div className={classes.features}>
        <div className={classes.top}>
          <InvoicesSVG />
          {/* <img src="/assets/placeholder-460x300.png" /> */}
          <div className={classes.topText}>
            <Typography variant="h4">
              Create, send and track invoices in minutes.
            </Typography>
            <br />
            <Typography variant="body1">
              Create customer profiles, save recurring items and invoice your
              customers from anywhere, so you can get paid faster!
            </Typography>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottomText}>
            <Typography variant="h4">
              Comprehensive dashboard provides all your data at a glance.
            </Typography>
            <br />
            <Typography variant="body1">
              Gain insight into your best customers, including those who need a
              friendly nudge. Forecast your business cashflow so you can plan
              accordingly.
            </Typography>
          </div>
          <ChartsSVG />
          {/* <img src="/assets/placeholder-460x250.png" /> */}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(LandingFeaturesText);
