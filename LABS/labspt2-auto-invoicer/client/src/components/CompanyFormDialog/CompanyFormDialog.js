import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import UserContext from '../../context/UserContext';

import { CreateCompany } from '../../graphQL/mutations/companies';

const CompanyFormDialog = props => {
  const context = useContext(UserContext);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipCode: '',
    city: '',
    state: ''
  });

  const {
    name,
    email,
    phoneNumber,
    address1,
    address2,
    zipCode,
    city,
    state
  } = formState;

  const handleSaveCompany = async () => {
    const result = await CreateCompany(
      {
        name,
        email,
        phoneNumber,
        address1,
        address2,
        zipCode,
        city,
        state
      },
      context.user._id,
      '_id'
    );
    await context.getCompanies();
    setFormState({
      name: '',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      zipCode: '',
      city: '',
      state: ''
    });
    props.onClose();
  };

  const handleInputChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleZipCodeChange = () => {
    if (formState.zipCode.length > 4) {
      const clientKey =
        'js-5XV4nRgHrRKhBmdufOwIFv2Fd9i2PXzj34LNZiQ9fRdEzalHkUYsVTS27ILfU8Qq';
      const zipcode = formState.zipCode;
      const url = `https://www.zipcodeapi.com/rest/${clientKey}/info.json/${zipcode}/radians`;
      axios
        .get(url)
        .then(res => {
          setFormState({
            ...formState,
            city: res.data.city,
            state: res.data.state
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setFormState({ ...formState, city: '', state: '' });
    }
  };

  useEffect(() => {
    handleZipCodeChange();
  }, [formState.zipCode]);

  return (
    <div>
      <Dialog
        maxWidth="xs"
        open={true}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Company</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            value={name}
            label="Name"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            value={email}
            label="Email"
            type="email"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="phone"
            name="phoneNumber"
            value={phoneNumber}
            label="Phone Number"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="address1"
            name="address1"
            value={address1}
            label="Address 1"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="address2"
            name="address2"
            value={address2}
            label="Address 2"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="zipcode"
            name="zipCode"
            value={zipCode}
            label="Zip Code"
            type="text"
            fullWidth
            required
            onChange={handleZipCodeChange}
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            value={city}
            label="City"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="state"
            name="state"
            value={state}
            label="State"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveCompany} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyFormDialog;
