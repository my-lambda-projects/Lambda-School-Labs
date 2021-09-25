import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const ContactInfo = props => {
  const { name, phoneNumber } = props.contactInfo;
  const [ contactState, setContactState ] = useState({name, phoneNumber})

  useEffect(() => {
    return props.setState({...contactState});
  },[contactState]);

  const changeHandler = e => {
    const { name, value } = e.target;
    setContactState({...contactState, [name]: value })
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Confirm Name & Phone Number
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <TextField
            name="name"
            label="Confirm your Name"
            fullWidth
            value={contactState.name}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            name="phoneNumber"
            label="Phone Number(Optional)"
            fullWidth
            onChange={changeHandler}
            value={contactState.phoneNumber}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ContactInfo;
