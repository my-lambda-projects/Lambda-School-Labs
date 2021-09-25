import React, { useState, useEffect } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import StripeCheckoutForm from "../StripeCheckoutForm";

import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

const StripeElements = props => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => setChecked(true), 300);
  }, []);

  return (
    <StripeProvider apiKey="pk_test_aQUyLjBzj0vLD5DfVQv55rFk">
      <div>
        <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
          <Typography
            style={{ marginBottom: 40,textAlign:"center" }} //fontSize: '4rem',
            variant="h4"
            gutterBottom
          >
            1 Month Unlimited
          </Typography>
        </Slide>
        <Elements>
          <StripeCheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default StripeElements;
