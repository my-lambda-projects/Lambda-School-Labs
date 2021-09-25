import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import InvoiceItemTable from "../InvoiceItemTable";

describe("<InvoiceItemTable />", () => {
  it("renders Invoice Item Table", () => {
    const { asFragment } = render(<InvoiceItemTable />);
    expect(asFragment()).toMatchSnapshot();
  });
});
