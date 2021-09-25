import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import SignInModal from "../SignInModal";

describe("<SignInModal />", () => {
  it("renders Sign In Modal", () => {
    const { asFragment } = render(<SignInModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
