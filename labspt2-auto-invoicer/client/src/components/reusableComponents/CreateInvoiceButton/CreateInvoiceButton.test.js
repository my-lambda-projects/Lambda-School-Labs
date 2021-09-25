import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import CreateInvoiceButton from "../CreateInvoiceButton";

describe("<CreateInvoiceButton />", () => {
  it("renders Create Invoice Button", () => {
    const { asFragment } = render(<CreateInvoiceButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
