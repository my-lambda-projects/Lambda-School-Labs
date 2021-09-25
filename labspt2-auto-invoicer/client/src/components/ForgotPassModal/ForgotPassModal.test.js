import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import ForgotPassModal from "../ForgotPassModal";

describe("<ForgotPassModal />", () => {
  it("renders Forgot Password Modal", () => {
    const { asFragment } = render(<ForgotPassModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
