import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class index extends Component {
  constructor() {
    super();
    this.state = {
      itemDescription: "",
      itemQuantity: "",
      itemRate: "",
      itemAmount: "",
      subtotal: "",
      discount: "",
      tax: "",
      shipping: "",
      total: "",
      amountPaid: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit2(this.state);
  };

  render() {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    id="itemDescription"
                    name="itemDescription"
                    placeholder="Item Description"
                    value={this.state.itemDescription}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="itemQuantity"
                    name="itemQuantity"
                    placeholder="Item Quantity"
                    value={this.state.itemQuantity}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="itemRate"
                    name="itemRate"
                    placeholder="Rate"
                    value={this.state.itemRate}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="itemAmount"
                    name="itemAmount"
                    placeholder="Amount"
                    value={this.state.itemAmount}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell rowSpan={6} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  <TextField
                    id="subtotal"
                    name="subtotal"
                    placeholder="Subtotal"
                    value={this.state.subtotal}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>Discount</TableCell>
                <TableCell align="right">
                  <TextField
                    id="discount"
                    name="discount"
                    placeholder="Discount"
                    value={this.state.discount}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>Tax</TableCell>

                <TableCell align="right">
                  <TextField
                    id="tax"
                    name="tax"
                    placeholder="Tax"
                    value={this.state.tax}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>Shipping</TableCell>
                <TableCell align="right">
                  <TextField
                    id="shipping"
                    name="shipping"
                    placeholder="Shipping"
                    value={this.state.shipping}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">
                  <TextField
                    id="total"
                    name="total"
                    placeholder="Total"
                    value={this.state.total}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>Amount Paid:</TableCell>
                <TableCell align="right">
                  <TextField
                    id="amountPaid"
                    name="amountPaid"
                    placeholder="Amount Paid"
                    value={this.state.amountPaid}
                    onChange={event => this.changeHandler(event)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <button onClick={event => this.onSubmit(event)}>Submit</button>
        </Paper>
      </div>
    );
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(index);
