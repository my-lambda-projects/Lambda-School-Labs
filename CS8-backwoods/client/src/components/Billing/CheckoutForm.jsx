import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { CardElement, injectStripe } from "react-stripe-elements";
import Typography from "@material-ui/core/Typography";
import Snackbar from "../Snackbar/Snackbar";
import WithSnackbar from "../Snackbar/SnackbarHOC";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit() {
    // User clicked submit
    const { stripe, handleSnackbarOpen } = this.props;
    const { token } = await stripe.createToken({ name: "Name" });
    const response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });
    if (response.ok) {
      handleSnackbarOpen("success", "Purchase Completed Successfully!");
    } else {
      handleSnackbarOpen("error", "Cannot Complete Purchase!");
    }
  }

  render() {
    const {
      snackbarVariant,
      snackbarMessage,
      snackbarOpen,
      handleSnackbarClose
    } = this.props;
    return (
      <Paper className="checkoutForm">
        <Snackbar
          snackbarVariant={snackbarVariant}
          snackbarMessage={snackbarMessage}
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
        />
        <div className="checkoutName">
          <Typography className="paymentInfo" variant="headline">
            Payment Information
          </Typography>
        </div>
        <div>
          <CardElement />
        </div>
        <div>
          <Button
            id="buyNowButton"
            onClick={this.submit}
            variant="contained"
            color="primary"
          >
            Complete Purchase
          </Button>
        </div>
      </Paper>
    );
  }
}

CheckoutForm.propTypes = {
  handleSnackbarOpen: PropTypes.func.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired,
  snackbarVariant: PropTypes.string.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  snackbarOpen: PropTypes.bool.isRequired
};

export default injectStripe(WithSnackbar(CheckoutForm));
