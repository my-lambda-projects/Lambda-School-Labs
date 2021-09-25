import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import Landing from "../Landing";

describe("<Landing />", () => {
  it("renders Landing component", () => {
    const { asFragment } = render(<Landing />);
    expect(asFragment()).toMatchSnapshot();
  });
});
