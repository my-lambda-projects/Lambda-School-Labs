import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Tabs from "./Tabs";
import "./SignInOut.css";

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: "#48a259"
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      }
    }
  }
});
const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      }
    }
  }
});
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});
const SignInOut = props => {
  const {
    classes,
    styleName,
    isLoggedIn,
    buttonColor,
    handleLogOut,
    buttonVariant,
    handleOpen,
    open,
    handleClose,
    ...rest
  } = props;
  return (
    <div className={styleName}>
      {isLoggedIn ? (
        <Link to="/" className="LandingHomeLink">
          {buttonColor ? (
            <MuiThemeProvider theme={theme1}>
              <Button
                onClick={handleLogOut}
                variant={buttonVariant}
                color="primary"
              >
                log out
              </Button>
            </MuiThemeProvider>
          ) : (
            <MuiThemeProvider theme={theme2}>
              <Button
                onClick={handleLogOut}
                variant={buttonVariant}
                color="primary"
              >
                log out
              </Button>
            </MuiThemeProvider>
          )}
        </Link>
      ) : (
        <div>
          {buttonColor ? (
            <MuiThemeProvider theme={theme1}>
              <Button
                variant={buttonVariant}
                onClick={handleOpen}
                color="primary"
              >
                Sign Up / Sign In
              </Button>
            </MuiThemeProvider>
          ) : (
            <MuiThemeProvider theme={theme2}>
              <Button
                variant={buttonVariant}
                onClick={handleOpen}
                color="primary"
              >
                Sign Up / Sign In
              </Button>
            </MuiThemeProvider>
          )}
        </div>
      )}
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <div style={getModalStyle()} className={classes.paper}>
          <Tabs {...rest} />
        </div>
      </Modal>
    </div>
  );
};

SignInOut.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SignInOutWrapped = withStyles(styles)(SignInOut);

export default SignInOutWrapped;
