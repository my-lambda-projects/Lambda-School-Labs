import React from 'react'
import { Grid, Grow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import UserDetails from './UserDetails';
import CompanyDetails from './CompanyDetails'
import styles from './styles'

const SettingsView = props => {
  const { classes } = props;
  return (
    <Grid 
    container 
    justify='space-around' 
    wrap='wrap'
    className={classes.settingsContainer}>
      <Grow in={true} timeout={1000}>
        <Grid 
          item
          className={classes.cardContainer} >
          <UserDetails />
        </Grid>
      </Grow>
      <Grow in={true} timeout={2000}>
        <Grid 
          item
          className={classes.cardContainer} >
          <CompanyDetails />
        </Grid>
      </Grow>
    </Grid>
  )
}

export default withStyles(styles)(SettingsView);