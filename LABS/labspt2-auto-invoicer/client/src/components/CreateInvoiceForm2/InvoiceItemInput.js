import React from "react";
//import "./InvoiceItemsInput.css";
import { TextField } from "@material-ui/core";

import {
  withStyles,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    //maxWidth: 600
  }
});

const InvoiceItemsInput = props => {
  return props.invoiceItems.map((val, idx) => {
    let itemId = `item-${idx}`,
      quantityId = `quantity-${idx}`,
      rateId = `rate-${idx}`,
      amountId = `amount-${idx}`;

    const { classes } = props;

    return (
      <Paper className={classes.root} key={idx}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <TextField
                  type="text"
                  name={itemId}
                  data-id={idx}
                  id={itemId}
                  value={props.invoiceItems[idx].name}
                  className="item"
                  placeholder={`Item #${idx + 1}`}
                  InputProps={{
                    //style: { fontSize: 14 },
                    disableUnderline: true
                  }}
                  //variant="filled"
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="text"
                  name={quantityId}
                  data-id={idx}
                  id={itemId}
                  value={props.invoiceItems[idx].name}
                  className="quantity"
                  placeholder={`Quantity #${idx + 1}`}
                  InputProps={{
                    //style: { fontSize: 14 },
                    disableUnderline: true
                  }}
                  //variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="text"
                  name={rateId}
                  data-id={idx}
                  id={rateId}
                  value={props.invoiceItems[idx].name}
                  className="rate"
                  placeholder={`Rate #${idx + 1}`}
                  InputProps={{
                    //style: { fontSize: 14 },
                    disableUnderline: true
                  }}
                  //variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="text"
                  name={amountId}
                  data-id={idx}
                  id={amountId}
                  value={props.invoiceItems[idx].name}
                  className="amount"
                  placeholder={`Amount #${idx + 1}`}
                  InputProps={{
                    //style: { fontSize: 14 },
                    disableUnderline: true
                  }}
                  //variant="outlined"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  });
};

export default withStyles(styles)(InvoiceItemsInput);
