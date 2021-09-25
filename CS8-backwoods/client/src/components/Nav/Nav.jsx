import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import "./Nav.css";
import SignInOut from "../SignInOut/SignInOut";
import NavBreadcrumb from "./NavBreadcrumb";
import ModalTripSave from "./ModalTripSave";
import styles from "./Nav-M-UI-Styles";

const fade = true;

const Nav = props => {
  const {
    classes,
    theme,
    user,
    emailFromUser,
    mobileOpen,
    handleDrawerToggle,
    checkIfTripSaved,
    isLoggedIn,
    tripSavedModal,
    tripModalFalse,
    navRedirect,
    modalContinue,
    children,
    ...rest
  } = props;

  const isUser = user || emailFromUser;
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {mobileOpen && (
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.IconButton}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className={classes.ChevronIcon} />
            ) : (
              <ChevronLeftIcon className={classes.ChevronIcon} />
            )}
          </IconButton>
        </div>
      )}
      <List component="nav">
        <Link to={`/${isUser}`} className="navBarLinks">
          <ListItem button onClick={e => checkIfTripSaved(e, `/${user}`)}>
            <ListItemText
              disableTypography
              className={classes.ListItemText}
              primary={<Typography variant="title">Trips</Typography>}
            />
          </ListItem>
        </Link>
        <Divider />
        {isLoggedIn && (
          <div>
            <Link to={`/${user}/archived`} className="navBarLinks">
              <ListItem
                button
                onClick={e => checkIfTripSaved(e, `/${user}/archived`)}
              >
                <ListItemText
                  disableTypography
                  className={classes.ListItemText}
                  primary={<Typography variant="title">Archived</Typography>}
                />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${user}/billing`} className="navBarLinks">
              <ListItem
                button
                onClick={e => checkIfTripSaved(e, `/${user}/billing`)}
              >
                <ListItemText
                  disableTypography
                  className={classes.ListItemText}
                  primary={<Typography variant="title">Billing</Typography>}
                />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${user}/settings`} className="navBarLinks">
              <ListItem
                button
                onClick={e => checkIfTripSaved(e, `/${user}/settings`)}
              >
                <ListItemText
                  disableTypography
                  className={classes.ListItemText}
                  primary={<Typography variant="title">Account</Typography>}
                />
              </ListItem>
            </Link>
          </div>
        )}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="absolute">
        <Toolbar className={classes.CoolStuff}>
          <div className="breadAndHanburger">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              <NavBreadcrumb user={user} />
            </Typography>
          </div>
          <SignInOut
            buttonVariant="flat"
            styleName="signInOutMain"
            isLoggedIn={isLoggedIn}
            {...rest}
          />
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Slide direction="right" in={fade} mountOnEnter unmountOnExit>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Slide>
      </Hidden>
      <main className={classes.content} id="globalBackground">
        <div className={classes.toolbar} />
        {children}
      </main>
      <ModalTripSave
        tripSavedModal={tripSavedModal}
        tripModalFalse={tripModalFalse}
        navRedirect={navRedirect}
        modalContinue={modalContinue}
      />
    </div>
  );
};

Nav.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.string.isRequired,
  emailFromUser: PropTypes.string.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  checkIfTripSaved: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(Nav);
