import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

import styles from "./styles";
import InvoicedChart from "./InvoicedChart";

const InvoicedCard = props => {
  const { checked, classes, invoices } = props;
  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? "500ms" : "0ms" }}>
      <Paper className={classes.paper} style={{ position: "relative" }}>
        <Typography variant="h4" gutterBottom>
          Total Invoiced This Year
        </Typography>
        <InvoicedChart invoices={invoices} />
      </Paper>
    </Zoom>
  );
};

export default withStyles(styles)(InvoicedCard);
