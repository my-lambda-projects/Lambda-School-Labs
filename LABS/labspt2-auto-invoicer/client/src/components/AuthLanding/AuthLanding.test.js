import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import AuthLanding from "../AuthLanding";

describe("<AuthLanding />", () => {
  it("renders Auth Landing components", () => {
    const { asFragment } = render(
      <Router>
        <AuthLanding />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
