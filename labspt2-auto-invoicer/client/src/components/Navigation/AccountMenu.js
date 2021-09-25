import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import UserContext from "../../context/UserContext";
import Typography from "@material-ui/core/Typography";

const AccountMenu = props => {
  const { history } = props;
  const context = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-owns={open ? "menu-bar" : null}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        id="menu-bar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: -45,
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => history.push(`/user/${context.user._id}/settings`)}
        >
          <Typography variant="caption">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={props.handleSignOut}>
          <Typography variant="caption">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(AccountMenu);
