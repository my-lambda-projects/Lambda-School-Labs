import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const theme2 = createMuiTheme({
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
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320
  },
  menu: {
    width: 200
  }
});

const SignInForm = props => {
  const { classes, handleSignIn, email, handleChange, password } = props;
  return (
    <form className={classes.container} onSubmit={handleSignIn}>
      <MuiThemeProvider theme={theme2}>
        <TextField
          required
          id="required"
          label="Email"
          type="email"
          value={email}
          onChange={handleChange("email")}
          autoComplete="email"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="password-input"
          label="Password"
          value={password}
          onChange={handleChange("password")}
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <div className="submitButton">
          <Button
            variant="contained"
            className={classes.button}
            type="submit"
            color="primary"
          >
            Submit
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </MuiThemeProvider>
    </form>
  );
};

SignInForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleSignIn: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default withStyles(styles)(SignInForm);
