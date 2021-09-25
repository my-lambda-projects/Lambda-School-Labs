import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class index extends Component {
  constructor() {
    super();
    this.state = {
      invoiceFrom: "",
      invoiceTo: "",
      address1: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="invoiceFrom"
              name="invoiceFrom"
              label="Invoice FROM"
              value={this.state.firstName}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="invoiceTo"
              name="invoiceTo"
              label="Invoice TO"
              value={this.state.lastName}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              value={this.state.address1}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              autoComplete="billing address-level2"
              value={this.state.city}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              value={this.state.state}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zip"
              name="zip"
              label="Zip / Postal code"
              autoComplete="billing postal-code"
              value={this.state.zip}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country"
              autoComplete="billing country"
              value={this.state.country}
              onChange={event => this.changeHandler(event)}
            />
          </Grid>
        </Grid>
        <button onClick={event => this.onSubmit(event)}>Submit</button>
      </div>
    );
  }
}

export default index;
