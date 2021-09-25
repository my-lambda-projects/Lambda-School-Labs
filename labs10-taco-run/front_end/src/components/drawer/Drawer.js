import React from "react";

// --> Base imports for redux and to use firebase auth
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";

// --> Base Imports for the elements used from @material-ui
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// --> Base Imports for the icons used from @material-ui
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from '@material-ui/icons/Home';
import SvgIcon from "@material-ui/core/SvgIcon";

// --> Boilerplate import from Material-UI reference
import classNames from "classnames";

// Import for menu from Material UI
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from '@material-ui/core/Tooltip';

import './custom.css'

/* This is the boilerplate styling from the Material-UI reference I used */
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    paddingBottom: 100,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 56
    },
    [theme.breakpoints.up("sm")]: {
      paddingBottom: 64
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: 100
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "darkred",
    opacity: "0.9"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  fab: {
    right: "0"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    [theme.breakpoints.down("xs")]: {
      margin: "0"
    }
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1
  },
  topText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      // justifyContent: "center"
    }
  },
  rightText: {    
    [theme.breakpoints.down("xs")]: {
      display: "none",
      marginRight: 0
    }
  },
  navSeparate: {
    display: "flex",
    alignItems: "center",
  },
  navHome: {
    cursor: "pointer",    
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class DrawerBar extends React.Component {
  state = {
    isOpen: false,
    // For menu button
    anchorEl: null
  };

  /*========================= Drawer for Material UI helpers =========================*/

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };

  /*========================= Drawer for Material UI helpers END =========================*/

  /*============================= Navigation Button Helpers =============================*/

  events = () => {
    this.props.history.push("/events");
  };

  profile = () => {
    this.props.history.push("/user-profile");
  };

  createEvent = () => {
    this.props.history.push("/events_create");
  };

  settings = () => {
    this.props.history.push("/user-settings");
  };

  logOut = event => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /*============================= Navigation Button Helpers END =============================*/

  render() {
    const { classes, theme } = this.props; // --> this is to access the style function found below
    // For menu button
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* Seems to only change background color to a lightgrey-ish */}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.isOpen
          })}
        >
          {/* Navigation bar */}
          <Toolbar disableGutters={!this.state.isOpen}>
            <div className={`${classes.topText} hoverclass`}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                onClick={() => {
                  this.props.history.push("/events");
                }}
                className="letsGetTacos"
              >
              <Tooltip title="Events Dashboard">
                <IconButton aria-label="Events Dashboard" >
                  <HomeIcon 
                    className = {`${classes.navHome}`} 
                    onClick = {() => { this.props.history.push("/events") }}
                  />
                </IconButton>
              </Tooltip>                
                Let's Get Tacos                
              </Typography>              
              <div className = {classes.navSeparate}>
                <Typography
                  className={classes.rightText}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  {this.props.auth.displayName}
                </Typography>
                  <Button
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style = {{ fontSize: "1.5rem" }}
                  >
                    <i className="fas fa-user-circle" />
                  </Button>
              </div>              
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      this.props.history.push("/user-profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.props.history.push("/user-settings");
                    }}
                  >
                    Profile Settings
                  </MenuItem>
                  <MenuItem onClick={this.logOut}>Logout</MenuItem>
                </Menu>              
            </div>
          </Toolbar>
          {/* Holds the sandwich bar icon and text from Typography */}
        </AppBar>
        {/* End of navigation bar */}
        {/* Drawer: the little slider thing ! NOTE: A lot of this is boiler-plate */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

/* 
  - Since Material-UI uses `withStyles()`, and redux uses `withRouter()`:
    we had to combine them like this!
*/
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(withStyles(styles, { withTheme: true })(DrawerBar))
);
