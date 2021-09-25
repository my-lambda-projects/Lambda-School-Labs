import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const BillTo = props => {
  return props.billToItems.map((val, idx) => {
    let address1Id = `address1-${idx}`,
      address2Id = `address2-${idx}`,
      cityId = `city-${idx}`,
      stateId = `state-${idx}`,
      zipId = `zip-${idx}`,
      emailId = `email-${idx}`;

    return (
      <React.Fragment key={idx}>
        <Typography variant="h4" gutterBottom>
          Bill To
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={address1Id}
              data-id={idx}
              id={address1Id}
              value={props.billToItems[idx].name}
              className="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name={address2Id}
              data-id={idx}
              id={address2Id}
              value={props.billToItems[idx].name}
              className="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={cityId}
              data-id={idx}
              id={cityId}
              value={props.billToItems[idx].name}
              className="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name={stateId}
              data-id={idx}
              id={stateId}
              value={props.billToItems[idx].name}
              className="state"
              label="State/Province/Region"
              fullWidth
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={zipId}
              data-id={idx}
              id={zipId}
              value={props.billToItems[idx].name}
              className="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={emailId}
              data-id={idx}
              id={emailId}
              value={props.billToItems[idx].name}
              className="email"
              label="Client Email"
              fullWidth
              autoComplete="billing country"
              variant="filled"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });
};

export default BillTo;

{
  /* <Grid item xs={4}>
                <form
                  onSubmit={this.handleFormSubmit}
                  onChange={this.handleBillToItemsChange}
                >
                  <BillTo billToItems={this.state.billToItems} />
                </form>
              </Grid> */
}

// billToItems: [
//   { address1: "", address2: "", city: "", state: "", zip: "", email: "" }
// ],
