import React from 'react';

import Modal from '../reusableComponents/Modal';
import { ReactComponent as GoogleLogo } from '../../assets/btn_google_light_normal_ios.svg';
import { ReactComponent as FacebookLogo } from '../../assets/f-ogo_RGB_HEX-58.svg';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './SignInModal.css';

const styles = theme => ({
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    width: 230,
    height: 46,
    borderRadius: 2,
    margin: '4px 0',
    boxShadow: '0 3px 6px rgba(0,0,0,0.20), 0 3px 6px rgba(0,0,0,0.20)'
  }
});

const SignInModal = props => {
  const { classes } = props;
  return (
    <Modal close={props.click}>
      <div className="logins">
        <Paper elevation={1} className={classes.paper}>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}>
            <div className="google-login">
              <GoogleLogo /> <span>Continue with Google</span>
            </div>
          </a>
        </Paper>
        <Paper elevation={1} className={classes.paper}>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/facebook`}>
            <div className="facebook-login">
              <FacebookLogo /> <span>Continue with Facebook</span>
            </div>
          </a>
        </Paper>
      </div>
    </Modal>
  );
};

export default withStyles(styles)(SignInModal);
