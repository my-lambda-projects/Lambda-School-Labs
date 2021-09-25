import React, { useState } from 'react'

import ViewCompanyDetails from './ViewCompanyDetails'
import EditCompanyDetails from './EditCompanyDetails'

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles'

const CompanyDetails = props => {
  const [edit, setEdit] = useState(false)

  const toggleView = () => {
    setEdit(!edit)
  }

  const { classes } = props;
  return (
    <Paper className={classes.cards}>
      {!edit ?
      <ViewCompanyDetails 
        toggleView={toggleView}/> :
      <EditCompanyDetails 
      toggleView={toggleView} />}
    </Paper>
  )
}

export default withStyles(styles)(CompanyDetails); 