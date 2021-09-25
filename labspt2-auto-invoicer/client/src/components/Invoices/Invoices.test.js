import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import Invoices from "../Invoices";

describe("<Invoices />", () => {
  it("renders Invoices", () => {
    const { asFragment } = render(
      <Router>
        <Invoices />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
