import React from "react";
import { Elements } from "react-stripe-elements";
import Fade from "@material-ui/core/Fade";
import CheckoutForm from "./CheckoutForm";
import "./Billing.css";

const BillingForm = () => (
  <Fade in>
    <div className="billing">
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  </Fade>
);

export default BillingForm;
