import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import UserContext from '../../context/UserContext';

import CompanyFormDialog from '../CompanyFormDialog';

const InvoiceDetails = props => {
  const context = useContext(UserContext);

  const [formState, setFormState] = useState({
    number: '',
    description: '',
    notes: '',
    terms: '',
    discount: '',
    shipping: ''
  });

  const handleInputChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    props.onInputChange({ ...formState });
  }, [formState]);

  // const { classes } = props;

  const {
    number,
    description,
    notes,
    terms,
    discount,
    tax,
    shipping
  } = formState;

  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12} />
        <Grid item xs={3}>
          <TextField
            id="number"
            name="number"
            label="Invoice #"
            value={number}
            fullWidth
            required
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="description"
            name="description"
            label="Description"
            value={description}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="terms"
            name="terms"
            label="Terms"
            value={terms}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="notes"
            name="notes"
            label="Notes"
            value={notes}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="discount"
            name="discount"
            label="Discount"
            value={discount}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={3}>
          <TextField
            id="shipping"
            name="shipping"
            label="Shipping"
            value={shipping}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={3}>
          <TextField
            id="tax"
            name="tax"
            label="Tax"
            value={tax}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InvoiceDetails;
