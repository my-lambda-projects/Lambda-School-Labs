import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import CreateInvoiceForm from "../CreateInvoiceForm";

describe("<CreateInvoiceForm />", () => {
  it("renders Create Invoice Form", () => {
    const { asFragment } = render(<CreateInvoiceForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
