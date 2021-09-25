import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import UserContext from '../../context/UserContext';

import CompanyFormDialog from '../CompanyFormDialog';

const InvoiceCompany = props => {
  const context = useContext(UserContext);

  const [dialogState, setDialogState] = useState(false);

  const handleCompanySelect = async e => {
    if (e.target.value === 'new') {
      setDialogState(true);
      props.onCompanySelect({
        _id: '',
        name: '',
        email: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        zipCode: '',
        city: '',
        state: ''
      });
    }

    if (e.target.value !== 'new') {
      await context.getCompany(e.target.value);
      // props.onCompanySelect({
      //   _id: context.company._id,
      //   name: context.company.name,
      //   email: context.company.email,
      //   phoneNumber: context.company.phoneNumber,
      //   address1: context.company.address1,
      //   address2: context.company.address2,
      //   zipCode: context.company.zipCode,
      //   city: context.company.city,
      //   state: context.company.state
      // });
    }
  };

  const handleClose = () => {
    setDialogState(false);
  };

  useEffect(() => {
    props.onCompanySelect({
      _id: context.company._id,
      name: context.company.name,
      email: context.company.email,
      phoneNumber: context.company.phoneNumber,
      address1: context.company.address1,
      address2: context.company.address2,
      zipCode: context.company.zipCode,
      city: context.company.city,
      state: context.company.state
    });
  }, [context.company]);

  // const { classes } = props;

  return (
    <React.Fragment>
      <TextField
        id="company"
        select
        label="Company"
        value={props.company._id}
        onChange={handleCompanySelect}
        helperText="Select a company"
        margin="normal"
      >
        {context.user.companies.map(company => (
          <MenuItem key={company._id} value={company._id}>
            {company.name}
          </MenuItem>
        ))}
        <MenuItem value="new">Add New Company</MenuItem>
      </TextField>
      {dialogState ? <CompanyFormDialog onClose={handleClose} /> : null}
      {props.company._id ? (
        <Grid container spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={props.company.name}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={props.company.email}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={props.company.phoneNumber}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="address1"
              label="Address Line 1"
              value={props.company.address1}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address Line 2"
              value={props.company.address2}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              value={props.company.zipCode}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              value={props.company.city}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State"
              value={props.company.state}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

export default InvoiceCompany;
