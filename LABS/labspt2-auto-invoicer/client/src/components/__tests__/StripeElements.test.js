import React from "react";
import { shallow } from "enzyme";

import StripeElements from "../StripeElements/index";
import StripeCheckoutForm from "../StripeCheckoutForm/index";
import Typography from "@material-ui/core/Typography";

// NOTE: test checks the StripeElements contains StripeCheckoutForm & Typography
// test cannot check StripeProvider - TypeError: expects a string, object or component constructor

it("contains StripeCheckoutForm component", () => {
  const wrapped = shallow(<StripeElements />);
  expect(wrapped.find(StripeCheckoutForm).length).toEqual(1);
});

it("contains Typography from Material-UI", () => {
  const wrapped = shallow(<StripeElements />);
  expect(wrapped.find(Typography).length).toEqual(1);
});
