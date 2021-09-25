import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import InvoiceItemsInput from "../InvoiceItemsInput";

describe("<InvoiceItemsInput />", () => {
  it("renders Invoice Items Input", () => {
    const { asFragment } = render(
      <Router>
        <InvoiceItemsInput
          invoiceItems={[{ item: "test", quantity: 2, rate: "1.00" }]}
        />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
