import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import AuthSecured from "../AuthSecured";

describe("<AuthSecured />", () => {
  it("renders Auth Secured components", () => {
    const { asFragment } = render(
      <Router>
        <AuthSecured />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
