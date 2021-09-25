import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import AddLogo from "../AddLogo";

describe("<AddLogo />", () => {
  it("renders Add Logo", () => {
    const { asFragment } = render(<AddLogo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
