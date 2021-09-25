import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import LandingText from "../LandingText";

describe("<LandingText />", () => {
  it("renders Landing Text", () => {
    const { asFragment } = render(<LandingText />);
    expect(asFragment()).toMatchSnapshot();
  });
});
