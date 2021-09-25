import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";

import MyAutoInvoicerIcon from "../../assets/myai.png";
import styles from "./styles";
import UserContext from "../../context/UserContext";

import SelectCompany from "./SelectCompany";
import AccountMenu from "./AccountMenu";

function AccountBar(props) {
  const context = useContext(UserContext);
  const { loggedIn, classes } = props;
  return (
    <Toolbar className={classes.accountBarContainer}>
      {
        <Link to={loggedIn ? `/user/${context.user._id}/dashboard` : `/`}>
          <div className={classes.icon}>
            <img alt="" src={MyAutoInvoicerIcon} width="32" height="32" />
            <Typography className={classes.iconText}>myAutoInvoicer</Typography>
          </div>
        </Link>
      }
      <div className={classes.rightContainer}>
        {loggedIn ? (
          <span className={classes.accountMenu}>
            <SelectCompany />
            <AccountMenu handleSignOut={props.handleSignOut} />
          </span>
        ) : (
          <div className={classes.navLinksRight}>
            {/* <Typography className={classes.link}>Features</Typography>
            <Typography className={classes.link}>Get Started</Typography> */}
            <Typography
              variant="overline"
              className={classes.link}
              onClick={props.handleSignIn}
            >
              Sign In
            </Typography>
          </div>
        )}
      </div>
    </Toolbar>
  );
}

export default withStyles(styles)(AccountBar);
