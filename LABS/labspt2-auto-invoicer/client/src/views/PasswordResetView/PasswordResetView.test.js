import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import PasswordResetView from "../PasswordResetView";

describe("<PasswordResetView />", () => {
  it("renders Password Reset view", () => {
    const { asFragment } = render(<PasswordResetView />);
    expect(asFragment()).toMatchSnapshot();
  });
});
