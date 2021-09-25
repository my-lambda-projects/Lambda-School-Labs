import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import BillingPage from "../BillingPage";

describe("<BillingPage />", () => {
  it("renders Billing Page view", () => {
    const { asFragment } = render(<BillingPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
