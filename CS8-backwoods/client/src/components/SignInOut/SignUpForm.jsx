import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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

class SignUpForm extends React.Component {
  componentWillReceiveProps() {
    const { password } = this.props;
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }

  render() {
    const {
      classes,
      handleSignUp,
      firstName,
      handleChange,
      lastName,
      email,
      password,
      validatePassword
    } = this.props;
    return (
      <ValidatorForm className={classes.container} onSubmit={handleSignUp}>
        <MuiThemeProvider theme={theme2}>
          <TextField
            required
            label="First Name"
            className={classes.textField}
            type="text"
            value={firstName}
            onChange={handleChange("firstName")}
            margin="normal"
            name="firstName"
          />
          <TextField
            required
            label="Last Name"
            className={classes.textField}
            type="text"
            value={lastName}
            onChange={handleChange("lastName")}
            margin="normal"
            name="lastName"
          />
          <TextField
            required
            label="Email"
            className={classes.textField}
            type="email"
            value={email}
            onChange={handleChange("email")}
            autoComplete="email"
            margin="normal"
            name="email"
          />

          <TextValidator
            validators={["required"]}
            name="password"
            required
            label="Password"
            className={classes.textField}
            type="password"
            value={password}
            onChange={handleChange("password")}
            autoComplete="current-password"
            margin="normal"
            errorMessages={["this field is required"]}
          />
          <TextValidator
            validators={["isPasswordMatch", "required"]}
            name="repeatPassword"
            required
            label="Confirm Password"
            className={classes.textField}
            type="password"
            value={validatePassword}
            onChange={handleChange("validatePassword")}
            autoComplete="current-password"
            margin="normal"
            errorMessages={["password mismatch", "this field is required"]}
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
      </ValidatorForm>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleSignUp: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  validatePassword: PropTypes.string.isRequired
};

export default withStyles(styles)(SignUpForm);
