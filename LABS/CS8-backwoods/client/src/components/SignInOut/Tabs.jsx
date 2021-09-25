import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      }
    }
  }
});
const styles = {
  root: {
    flexGrow: 1
  }
};

const TabContainer = props => {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};
const CenteredTabs = props => {
  const {
    classes,
    tabState,
    handleChange,
    handleTabChange,
    handleSignUp,
    handleSignIn,
    firstName,
    lastName,
    email,
    password,
    validatePassword
  } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Tabs
          value={tabState}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>
        <TabContainer>
          {tabState === 0 && (
            <SignUpForm
              handleChange={handleChange}
              handleSignUp={handleSignUp}
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
              validatePassword={validatePassword}
            />
          )}
          {tabState === 1 && (
            <SignInForm
              handleChange={handleChange}
              handleSignIn={handleSignIn}
              email={email}
              password={password}
            />
          )}
        </TabContainer>
      </Paper>
    </MuiThemeProvider>
  );
};

CenteredTabs.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  tabState: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  validatePassword: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(CenteredTabs);
