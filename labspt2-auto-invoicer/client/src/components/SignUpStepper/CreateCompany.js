import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const CreateCompany = props => {
  const {
    name,
    email,
    phoneNumber,
    address1,
    address2,
    zipCode,
    city,
    state
  } = props.companyState;
  const [ company, setCompany ] = useState(
    name,
    email, 
    phoneNumber,
    address1,
    address2,
    zipCode,
    city,
    state
    )

  useEffect(() => {
    return props.setState({...company})
  },[company]);

  const changeHandler = e => {
    const { name, value } = e.target;
    setCompany({...company, [name]: value })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Your First Company
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={9}>
          <TextField name='name' onChange={changeHandler} required label="Chose a name" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name='email' onChange={changeHandler} required  label="Email" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name='phoneNumber' onChange={changeHandler} required label="Phone Number" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name='address1'
            onChange={changeHandler}
            required
            label="Address Line 1"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name='address2'
            onChange={changeHandler}
            label="Address Line 2"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name='zipCode'
            onChange={changeHandler}
            required
            label="Zip Code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name='city'
            onChange={changeHandler}
            required
            label="City"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            name='state' 
            onChange={changeHandler}
            required
            label="State"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CreateCompany;
