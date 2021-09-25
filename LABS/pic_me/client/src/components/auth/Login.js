import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { login, resetErrors } from '../../actions';
import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import withRoot from '../../withRoot';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginTop: 20,
    marginBottom: 10
  },
  card: {
    minWidth: 380,
    padding: 20
  }
});

const renderTextField = ({ input, label, type }) => (
  <TextField
    label={label}
    placeholder={label}
    fullWidth
    {...input}
    type={type}
    margin="normal"
  />
);

class Login extends Component {
  componentWillMount() {
    this.props.resetErrors();
  }

  submitFormHandler = ({ email, password }) => {
    this.props.login(email, password, this.props.history);
  };

  renderAlert() {
    if (this.props.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.error}
        </div>
      );
    }
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <Grid className={classes.root} container justify="center">
          <Card className={classes.card}>
            <div>{this.renderAlert()}</div>
            <div>
              <Button
                variant="raised"
                color="secondary"
                fullWidth
                className={classes.button}
                href="https://labpicme.herokuapp.com/api/users/auth/twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
                Login with twitter
              </Button>
            </div>
            <div>
              <form onSubmit={handleSubmit(this.submitFormHandler)}>
                <div>
                  <Field
                    name="email"
                    label="email"
                    component={renderTextField}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    label="password"
                    type="password"
                    component={renderTextField}
                  />
                </div>
                <div>
                  <Button
                    className={classes.button}
                    variant="raised"
                    size="large"
                    type="submit"
                    fullWidth
                    disabled={pristine || submitting}
                  >
                    Log in
                  </Button>
                </div>
              </form>
            </div>
            <CardContent>
              <Link to="/signup">
                <Typography variant="body1" gutterBottom align="center">
                  Don't have an account? Sign up
                </Typography>
              </Link>

              <Link to="/forgotpassword">
                <Typography variant="body1" gutterBottom align="center">
                  Forgot password?
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

Login = connect(
  mapStateToProps,
  {
    login,
    resetErrors
  }
)(Login);

const LoginWrapped = withRoot(withStyles(styles)(Login));

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
})(LoginWrapped);
