import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import InvoiceList from "../InvoiceList";

describe("<InvoiceList />", () => {
  it("renders Invoice List view", () => {
    const { asFragment } = render(
      <Router>
        <InvoiceList />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
