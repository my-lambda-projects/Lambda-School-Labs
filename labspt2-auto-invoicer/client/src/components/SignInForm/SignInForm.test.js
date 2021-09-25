import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import SignInForm from "../SignInForm";

describe("<SignInForm />", () => {
  it("renders Sign In Form Component", () => {
    const { asFragment } = render(<SignInForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
