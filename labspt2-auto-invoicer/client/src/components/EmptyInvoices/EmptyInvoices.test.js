import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import EmptyInvoices from "../EmptyInvoices";

describe("<EmptyInvoices />", () => {
  it("renders Empty Invoices", () => {
    const { asFragment } = render(<EmptyInvoices />);
    expect(asFragment()).toMatchSnapshot();
  });
});
