import React, { useState, useContext, useEffect } from "react";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
// import components here

import EmptyInvoices from "../EmptyInvoices";
import { Link } from "react-router-dom";
import styles from "./style";

import EditDialog from "../EditDialog.js";

// Import Data Here
import UserContext from "../../context/UserContext";
import Delete from "../Delete";

const Invoices = props => {
  const context = useContext(UserContext);
  const invoices = context.company.invoices;
  const userID = context.user._id;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [buttonSize, setButtonSize] = useState("large");
  const [placeHolderText, setPlaceholderText] = useState("Search By Number");
  const [filter, setFilter] = useState("All");
  const filterOptions = ["All", "Late", "Paid", "Due"];

  useEffect(() => {
    rowsPerPageFunc();
    buttonSizeFunc();
    placeHolderTextFunc();
  }, []);

  const rowsPerPageFunc = () => {
    window.innerWidth > 500 ? setRowsPerPage(10) : setRowsPerPage(5);
  };
  const buttonSizeFunc = () => {
    window.innerWidth > 500 ? setButtonSize("large") : setButtonSize("small");
  };
  const placeHolderTextFunc = () => {
    window.innerWidth > 750
      ? setPlaceholderText("Search By Number")
      : setPlaceholderText(" Search By #");
  };
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const dueDate = str => {
    return str.slice(4, 16);
  };
  const ellipsis = str => {
    let shortened = str.length >= 10 ? str.slice(0, 10) + "..." : str;
    return shortened;
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const lateChecker = date => {
    let year = date.slice(11, 15);
    let month = date.slice(4, 7);
    let day = date.slice(8, 10);
    let monthConvertedToNumber = 0;
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let monthInNumberForm = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    for (let i = 0; i < months.length; i++) {
      if (months[i] === month) {
        monthConvertedToNumber = monthInNumberForm[i];
      }
    }
    let dateInNumberForm = parseInt(year + monthConvertedToNumber + day, 10);
    return dateInNumberForm;
  };

  const paidFilter = passedInvoices => {
    let filtered = passedInvoices.filter(singleInvoice => {
      return Number(singleInvoice.balance) === 0;
    });
    if (search) {
      return filtered.filter(singleInvoice => {
        return singleInvoice.number.includes(search);
      });
    } else {
      return filtered;
    }
  };
  const lateFilter = passedInvoices => {
    let filtered = passedInvoices.filter(singleInvoice => {
      return (
        lateChecker(Date()) > lateChecker(String(singleInvoice.dueDate)) &&
        Number(singleInvoice.balance) > 0
      );
    });
    if (search) {
      return filtered.filter(singleInvoice => {
        return singleInvoice.number.includes(search);
      });
    } else {
      return filtered;
    }
  };
  const dueFilter = passedInvoices => {
    let filtered = passedInvoices.filter(singleInvoice => {
      return (
        lateChecker(Date()) <= lateChecker(String(singleInvoice.dueDate)) &&
        Number(singleInvoice.balance) > 0
      );
    });
    if (search) {
      return filtered.filter(singleInvoice => {
        return singleInvoice.number.includes(search);
      });
    } else {
      return filtered;
    }
  };
  const invoiceFilterSearch = passedInvoices => {
    let initInvoices = passedInvoices.filter(singleInvoice => {
      return singleInvoice.hidden === false;
    });
    if (search === "" && filter === "All") {
      return initInvoices;
    } else if (search !== "" && filter === "All") {
      return initInvoices.filter(singleInvoice => {
        return singleInvoice.number.includes(search);
      });
    } else if (filter === "Paid") {
      return paidFilter(initInvoices);
    } else if (filter === "Late") {
      return lateFilter(initInvoices);
    } else if (filter === "Due") {
      return dueFilter(initInvoices);
    }
  };

  const status = (invoice, tooltips) => {
    if (Number(invoice.balance) === 0) {
      return (
        <Tooltip
          placement="left"
          title="Paid"
          classes={{
            tooltip: tooltips
          }}
        >
          <i
            className="material-icons"
            style={{ color: "green", fontSize: 36 }}
          >
            attach_money
          </i>
        </Tooltip>
      );
    } else if (lateChecker(Date()) > lateChecker(String(invoice.dueDate))) {
      return (
        <Tooltip
          placement="left"
          title="Late"
          classes={{
            tooltip: tooltips
          }}
        >
          <i className="material-icons" style={{ color: "red", fontSize: 36 }}>
            attach_money
          </i>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
          placement="left"
          title="Owed"
          classes={{
            tooltip: tooltips
          }}
        >
          <i
            className="material-icons"
            style={{ color: "#FFFF00", fontSize: 36 }}
          >
            attach_money
          </i>
        </Tooltip>
      );
    }
  };

  const { classes } = props;
  const emptyRows =
    { rowsPerPage } -
    Math.min(
      { rowsPerPage },
      context.user.invoices.length - { page } * { rowsPerPage }
    );

  const themes = createMuiTheme({
    typography: {
      fontSize: 30,
      useNextVariants: true
    }
  });
  return (
    <section>
      {invoices.length < 1 ? (
        <EmptyInvoices userID={userID} />
      ) : (
        <Grow in={true} {...{ timeout: 1300 }}>
          <Paper className={classes.root}>
            <div className={classes.rootbar}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#2d2f31"
                }}
              >
                <Toolbar>
                  <Typography
                    className={classes.title}
                    color="inherit"
                    noWrap
                  >
                    Invoices
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder={placeHolderText}
                      name="search"
                        style={{
                          fontSize: "1.3rem"
                        }}
                      onChange={e => setSearch(e.target.value)}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div>
                    <TextField
                      select
                      label="Filter By"
                      className={classes.textField}
                      value={filter}
                      onChange={e => setFilter(e.target.value)}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                    >
                      {filterOptions.map(option => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <Link to={`/user/${userID}/invoice/create`}>
                      <Button
                        variant="button"
                        className={classes.button}
                        size={buttonSize}
                      >
                        Create
                      </Button>
                    </Link>
                  </div>
                </Toolbar>
              </AppBar>
            </div>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h4">Number</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h4">Status</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h4">Name</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h4">Due Date</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h4">Total Due</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h4">Actions</Typography>
                    </TableCell>
                  </TableRow>
                  {invoiceFilterSearch(invoices)
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map(
                      invoice => (
                        console.log(invoice, "test"),
                        (
                          <TableRow
                            className={classes.tableRowHover}
                            key={invoice._id}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{
                                fontSize: 20
                              }}
                            >
                              <Tooltip
                                placement="right"
                                title={invoice.number}
                                classes={{
                                  tooltip: classes.tooltipNumber
                                }}
                              >
                                <div>{ellipsis(invoice.number)}</div>
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{ fontSize: 20 }}
                            >
                              {status(invoice, classes.tooltip)}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: 20 }}
                              align="center"
                            >
                              {capitalizeFirstLetter(invoice.customer.name)}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: 20 }}
                              align="center"
                            >
                              {dueDate(invoice.dueDate)}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: 20 }}
                              align="center"
                            >
                              <Tooltip
                                placement="right"
                                title={invoice.total}
                                classes={{
                                  tooltip: classes.tooltipNumber
                                }}
                              >
                                <div>{ellipsis(invoice.total)}</div>
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              style={{ fontSize: 25 }}
                              align="center"
                            >
                              <div className={classes.shortcuts}>
                                <Link
                                  className="card-links"
                                  to={`/user/${userID}/invoice/${
                                    invoice._id
                                  }/view`}
                                >
                                  <Tooltip
                                    title="View Invoice"
                                    classes={{
                                      tooltip: classes.tooltip
                                    }}
                                  >
                                    <div className={classes.shortcutsCircle}>
                                      <i
                                        className="material-icons"
                                        style={{
                                          color: "#ffffff",
                                          fontSize: 36
                                        }}
                                      >
                                        visibility
                                      </i>
                                    </div>
                                  </Tooltip>
                                </Link>
                                <Tooltip
                                  title="Download PDF"
                                  classes={{
                                    tooltip: classes.tooltip
                                  }}
                                >
                                  <div
                                    onClick={() => {
                                      props.createPDF(invoice);
                                    }}
                                    className={classes.shortcutsCircle}
                                  >
                                    <i
                                      className="material-icons"
                                      style={{
                                        color: "#ffffff",
                                        fontSize: 36
                                      }}
                                    >
                                      save_alt
                                    </i>
                                  </div>
                                </Tooltip>
                                <EditDialog invoice={invoice} />
                                <Delete invoice={invoice} />
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      )
                    )}
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
                        count={invoiceFilterSearch(invoices).length}
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
          </Paper>
        </Grow>
      )}
    </section>
  );
};

export default withStyles(styles)(Invoices);
