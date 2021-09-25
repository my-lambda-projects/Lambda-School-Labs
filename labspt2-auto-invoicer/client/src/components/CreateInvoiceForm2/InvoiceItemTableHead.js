import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    //minWidth: 700
    [`@media (max-width: 600px)`]: {
      display: "none"
    }
  }
});

const InvoiceItemTableHead = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} style={{ backgroundColor: "#4fc878" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: 14, color: "white" }} align="left">
              Item
            </TableCell>
            <TableCell style={{ fontSize: 14, color: "white" }} align="left">
              Quantity
            </TableCell>
            <TableCell style={{ fontSize: 14, color: "white" }} align="left">
              Rate
            </TableCell>
            <TableCell style={{ fontSize: 14, color: "white" }} align="left">
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(InvoiceItemTableHead);
