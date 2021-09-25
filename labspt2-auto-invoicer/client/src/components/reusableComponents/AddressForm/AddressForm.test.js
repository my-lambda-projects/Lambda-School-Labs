import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import AddressForm from "../AddressForm";

describe("<AddressForm />", () => {
  it("renders Address Form", () => {
    const { asFragment } = render(<AddressForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
