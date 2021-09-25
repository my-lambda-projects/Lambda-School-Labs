import React, { useState } from 'react'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ViewUserDetails from './ViewUserDetails';
import EditUserDetails from './EditUserDetails';
import styles from '../styles'

export const UserDetails = (props) => {
  const [edit, setEdit] =  useState(false)

  const toggleView = () => {
    setEdit(!edit)
  }

  const { classes } = props;
  return (
    <Paper elevation={5} className={classes.cards}>
      {!edit ? 
      <ViewUserDetails 
        toggleView={toggleView}
      /> :
      <EditUserDetails 
        toggleView={toggleView} 
        />}
    </Paper>
  )
}

export default withStyles(styles)(UserDetails); 
