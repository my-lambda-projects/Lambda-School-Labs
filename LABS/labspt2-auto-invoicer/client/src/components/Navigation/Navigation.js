import React, {useContext} from 'react';

import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles'

import UserContext from '../../context/UserContext'
import AccountBar from './AccountBar'
import NavLinksBar from './NavLinksBar';

import './Navigation.css';
import style from './styles'


const Navigation = props => {
  const context = useContext(UserContext)
  const { classes } = props;

  const appBarSize = props.loggedIn ? `128px` : `64px`;

  return (
  <AppBar className={classes.mainNavContainer} style={{height: appBarSize}}>
    <AccountBar 
      loggedIn={props.loggedIn}
      handleSignIn={props.handleSignIn}
      handleSignOut={props.handleSignOut} 
    />
    {props.loggedIn ?
      <NavLinksBar /> :
    null
  }
  </AppBar>
)};

export default withStyles(style)(Navigation);