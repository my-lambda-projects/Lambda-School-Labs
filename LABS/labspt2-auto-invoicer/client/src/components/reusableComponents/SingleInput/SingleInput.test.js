import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import SingleInput from "../SingleInput";

describe("<SingleInput />", () => {
  it("renders SingleInput", () => {
    const { asFragment } = render(<SingleInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
