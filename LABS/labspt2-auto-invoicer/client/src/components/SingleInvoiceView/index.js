import React, { useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import UserContext from "../../context/UserContext";

import styles from "./style";

import "./SingleInvoiceView.css";

const SingleInvoiceView = props => {
  const context = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { invoiceID } = props.props.match.params;

  const invoice = context.company.invoices.find(
    invoice => `${invoice._id}` === invoiceID
  );
  const company = invoice.company;
  const customer = invoice.customer;
  const headerellipsis = str => {
    return str.length > 10 ? str.slice(0, 11) : str;
  };
  const itemChecker = items => {
    let emptyItems = [
      { name: "", description: "", cost: "", quantity: "", amount: "" }
    ];
    return items.length > 0 ? items : emptyItems;
  };
  const mobileItemChecker = items => {
    let emptyItems = [{ name: "", quantity: "", amount: "" }];
    return items.length > 0 ? items : emptyItems;
  };
  const itemsLengthChecker = items => {
    return items ? items.length : 0;
  };
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      itemsLengthChecker(invoice.items) - page * rowsPerPage
    );
  const { classes } = props;
  const themes = createMuiTheme({
    typography: {
      fontSize: 30,
      useNextVariants: true
    }
  });
  return (
    <Grow in={true} {...{ timeout: 1300 }}>
      <Paper className={classes.paper}>
        <section>
          <AppBar className={classes.appbar}>
            <Toolbar>
              <Typography
                className={classes.headerTitle}
                color="inherit"
                noWrap
              >
                {capitalizeFirstLetter(company.name)}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="box-container bottom">
            <div className="top-box box">
              <p>
                <strong>
                  <span className="entryName">Invoice #:</span>
                </strong>
                {" " + invoice.number}
                <br />
                <strong>
                  <span className="entryName">Date:</span>
                </strong>
                {headerellipsis(" " + invoice.date)}
                <br />
                <strong>
                  <span className="entryName">Due Date:</span>
                </strong>
                {headerellipsis(" " + invoice.dueDate)}
                <br />
                <strong>
                  <span className="entryName">Total:</span>
                </strong>
                {" $" + invoice.total}
                <br />
                <strong>
                  <span className="entryName">Amount Due:</span>
                </strong>
                {" $" + invoice.balance}
              </p>
            </div>
          </div>
          <div className="box-container bottom">
            <div className="box mobileBorder">
              <p>
                <strong>
                  <span className="entryName">From:</span>
                </strong>
                <br />
                {capitalizeFirstLetter(company.name)}
                <br />
                {company.address1},{" " + company.address2}
                <br />
                {capitalizeFirstLetter(company.city)},
                {" " + company.state.toUpperCase()}
                {" " + company.zipCode}
                <br />
                {company.email}
                <br />
                {" " + company.phoneNumber}
              </p>
            </div>
            <div className="box">
              <p>
                <strong>
                  <span className="entryName">To:</span>
                </strong>
                <br />
                {capitalizeFirstLetter(customer.name)}
                <br />
                {customer.address1},{" " + customer.address2}
                <br />
                {capitalizeFirstLetter(customer.city)},
                {" " + customer.state.toUpperCase()}
                {" " + customer.zipCode}
                <br />
                {customer.email}
                {" " + customer.phoneNumber}
              </p>
            </div>
          </div>
          <div className="box-container bottom">
            <div className="box mobileBorder">
              <p>
                <strong>
                  <span className="entryName">Invoice Description:</span>
                </strong>
                <br />
                {invoice.description ? invoice.description + ".":"None"}
              </p>
            </div>
            <div className="box">
              <p className="subtotalTax">Subtotal: ${invoice.subtotal}</p>
              <p className="shippingDiscount">
                Discount: ${invoice.discount}
              </p>
              <p className="subtotalTax">
                Tax:
                {" " + Number(invoice.tax) * 100}%
              </p>
              <p className="shippingDiscount">
                Shipping: ${invoice.shipping}
              </p>
              <p className="total-due">Total: ${invoice.total}</p>
              <p className="amount-paid">Balance: ${invoice.balance}</p>
            </div>
          </div>
          <div className="box-container">
            <div className="box mobileBorder">
              <p>
                <strong>
                  <span className="entryName">Notes (if applicable):</span>{" "}
                </strong>
                <br />
                {invoice.notes ? invoice.notes + ".":"None"}
              </p>
            </div>
            <div className="box">
              <p>
                <strong>
                  <span className="entryName">Terms (if applicable):</span>
                </strong>
                <br />
                {invoice.terms ? invoice.terms + ".":"None"}
              </p>
            </div>
          </div>
          <div>
            <AppBar className={classes.appbar}>
              <Toolbar>
                <Typography className={classes.title} color="inherit" noWrap>
                  Invoice Items (if applicable)
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          {window.innerWidth > 500 ? (
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{ color: "#8bc34a" }}
                      align="center"
                      className={classes.tablecell}
                    >
                      Name
                    </TableCell>

                    <TableCell
                      style={{ color: "#8bc34a" }}
                      align="center"
                      className={classes.tablecell}
                    >
                      Description
                    </TableCell>

                    <TableCell
                      style={{ color: "#8bc34a" }}
                      align="center"
                      className={classes.tablecell}
                    >
                      Cost
                    </TableCell>

                    <TableCell
                      style={{ color: "#8bc34a" }}
                      align="center"
                      className={classes.tablecell}
                    >
                      Quantity
                    </TableCell>

                    <TableCell
                      style={{ color: "#8bc34a" }}
                      align="center"
                      className={classes.tablecell}
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                  {itemChecker(invoice.items)
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map(item => (
                      <TableRow
                        className={classes.tableRowHover}
                        key={item._id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{
                            fontSize: 25
                          }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ fontSize: 25 }}
                        >
                          {item.description ? item.description:"None"}
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          {item.cost}
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          {item.quantity}
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          {item.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 48 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter style={{ fontSize: 15 }}>
                  <TableRow style={{ fontSize: 15 }}>
                    <MuiThemeProvider theme={themes}>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        backIconButtonProps={{
                          "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                          "aria-label": "Next Page"
                        }}
                        colSpan={3}
                        count={itemsLengthChecker(invoice.items)}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    </MuiThemeProvider>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          ) : (
            <div>
              <table className="btmTable">
                <tbody>
                  <tr className="btmTopRow">
                    <td className="entryName1">Name</td>
                    <td className="entryName1">Quantity</td>
                    <td className="entryName1">Total</td>
                  </tr>
                  {mobileItemChecker(invoice.items).map(item => {
                    const { name, quantity, amount } = item;
                    return (
                      <tr key={item._id}>
                        <td className="items">{name}</td>
                        <td className="items">{quantity}</td>
                        <td className="items">{amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </Paper>
    </Grow>
  );
};

export default withStyles(styles)(SingleInvoiceView);
