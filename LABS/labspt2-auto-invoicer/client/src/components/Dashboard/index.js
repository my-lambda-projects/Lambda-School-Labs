import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import CustomerFormDialog from "../CustomerFormDialog";
import ItemFormDialog from "../ItemFormDialog";

import styles from "./styles";
import InvoicedCard from "./InvoicedCard";
import TopCards from "./TopCards";
import StatisticsCard from "./StatisticsCard";
import TopBar from "./TopBar";
import { Typography } from "@material-ui/core";
import UserContext from "./../../context/UserContext";

import "./index.css";

const Dashboard = props => {
  const [checked, setChecked] = useState(false);
  const { user, company } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => setChecked(true), 800);
  }, []);
  const [customerDialog, setCustomerDialog] = useState(false);
  const [itemDialog, setItemDialog] = useState(false);
  const { classes } = props;
  const handleCustomerDialog = () => {
    setCustomerDialog(!customerDialog);
  };
  const handleItemDialog = () => {
    setItemDialog(!itemDialog);
  };
  let collected = 0;
  let late = 0;
  let unpaid = 0;
  //console.log("I ran", company.invoices);
  company.invoices.map(invoice => {
    collected += parseFloat(invoice.total) - parseFloat(invoice.balance);
    if (moment(invoice.date).isBefore(new Date())) {
      late += parseFloat(invoice.balance);
    } else {
      unpaid += parseFloat(invoice.balance);
    }
    return invoice;
  });

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid
            spacing={24}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            <TopBar name={user.name} checked={checked} />
            <Grid container spacing={24} style={{ marginBottom: 12 }}>
              <Grid item xs={12} md={4}>
                <TopCards checked={checked} timeout={1000}>
                  <div style={{ display: "flex" }}>
                    <div className={classes.iconContainer}>
                      <Tooltip
                        title="Invoices"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <div className={classes.invoicesCircle}>
                          <i
                            className="material-icons"
                            style={{ color: "#ffffff" }}
                          >
                            file_copy
                          </i>
                        </div>
                      </Tooltip>
                    </div>
                    <div className={classes.middleInfo}>
                      <span className={classes.span}>{124}</span>
                      <Typography variant="h5">Total Invoices</Typography>
                    </div>
                    <Tooltip
                      title="Compared to Last Month"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <div className={classes.percentageComparison}>
                        <i
                          className="material-icons"
                          style={{
                            color: "#8bc34a",
                            marginRight: 12
                          }}
                        >
                          arrow_upward
                        </i>
                        <span className={classes.percentagePos}>12.05%</span>
                      </div>
                    </Tooltip>
                  </div>
                </TopCards>
              </Grid>
              <Grid item xs={12} md={4}>
                <TopCards checked={checked} timeout={1400}>
                  <div style={{ display: "flex" }}>
                    <div className={classes.iconContainer}>
                      <Tooltip
                        title="Users"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <div className={classes.usersCircle}>
                          <i
                            className="material-icons"
                            style={{ color: "#ffffff" }}
                          >
                            supervisor_account
                          </i>
                        </div>
                      </Tooltip>
                    </div>
                    <div className={classes.middleInfo}>
                      <span className={classes.span}>{9}</span>
                      <Typography style={{ fontSize: 15 }}>
                        New Customers
                      </Typography>
                    </div>
                    <Tooltip
                      title="Compared to Last Month"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <div className={classes.percentageComparison}>
                        <i
                          className="material-icons"
                          style={{
                            color: "#FF0000",
                            marginRight: 12
                          }}
                        >
                          arrow_downward
                        </i>
                        <span className={classes.percentageNeg}>3.89%</span>
                      </div>
                    </Tooltip>
                  </div>
                </TopCards>
              </Grid>
              <Grid item xs={12} md={4}>
                <TopCards checked={checked} timeout={1800}>
                  <div className={classes.shortcuts}>
                    <Tooltip
                      title="Create a New Invoice"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/user/${user._id}/invoice/create`}>
                        <div className={classes.shortcutsCircle}>
                          <i
                            className="material-icons"
                            style={{
                              color: "rgba(255,255,255,0.9)",
                              fontSize: 36
                            }}
                          >
                            note_add
                          </i>
                        </div>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      title="Add a Payment"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/user/${user._id}/invoices`}>
                        <div className={classes.shortcutsCircle}>
                          <i
                            className="material-icons"
                            style={{
                              color: "rgba(255,255,255,0.9)",
                              fontSize: 36
                            }}
                          >
                            attach_money
                          </i>
                        </div>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      title="Add a New Customer"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <div
                        onClick={handleCustomerDialog}
                        className={classes.shortcutsCircle}
                      >
                        <i
                          className="material-icons"
                          style={{
                            color: "rgba(255,255,255,0.9)",
                            fontSize: 36
                          }}
                        >
                          person_add
                        </i>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title="Add a New Item"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <div
                        onClick={handleItemDialog}
                        className={classes.shortcutsCircle}
                      >
                        <i
                          className="material-icons"
                          style={{
                            color: "rgba(255,255,255,0.9)",
                            fontSize: 36
                          }}
                        >
                          add_to_queue
                        </i>
                      </div>
                    </Tooltip>
                  </div>
                  {customerDialog ? (
                    <CustomerFormDialog onClose={handleCustomerDialog} />
                  ) : null}
                  {itemDialog ? (
                    <ItemFormDialog onClose={handleItemDialog} />
                  ) : null}
                </TopCards>
              </Grid>
            </Grid>
            <Grid container spacing={24} justify="center">
              <Grid item xs={12} md={8}>
                <InvoicedCard invoices={company.invoices} checked={checked} />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatisticsCard
                  unpaid={unpaid}
                  late={late}
                  collected={collected}
                  checked={checked}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
