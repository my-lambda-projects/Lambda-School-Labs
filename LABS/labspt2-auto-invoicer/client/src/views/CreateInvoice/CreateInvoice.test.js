import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import CreateInvoice from "../CreateInvoice";

describe("<CreateInvoice />", () => {
  it("renders Create Invoice view", () => {
    const { asFragment } = render(<CreateInvoice />);
    expect(asFragment()).toMatchSnapshot();
  });
});
