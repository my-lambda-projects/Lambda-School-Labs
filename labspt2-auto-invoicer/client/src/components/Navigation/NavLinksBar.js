import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ToolBar from "@material-ui/core/Toolbar";

import UserContext from "../../context/UserContext";
import style from "./styles";
import { Typography } from "../../../node_modules/@material-ui/core";

const NavNavLinksBar = props => {
  const context = useContext(UserContext);
  const { classes } = props;
  return (
    <ToolBar className={classes.navLinksContainer}>
      <NavLink
        className={classes.navLink}
        to={`/user/${context.user._id}/dashboard`}
      >
        <Typography variant="overline">Dashboard</Typography>
      </NavLink>
      <NavLink
        className={classes.navLink}
        to={`/user/${context.user._id}/invoices`}
      >
        <Typography variant="overline">Invoices</Typography>
      </NavLink>
      <NavLink
        className={classes.navLink}
        to={`/user/${context.user._id}/billing`}
      >
        <Typography variant="overline">Billing</Typography>
      </NavLink>
    </ToolBar>
  );
};

export default withStyles(style)(NavNavLinksBar);
