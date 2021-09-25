import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import SideNavigation from "../SideNavigation";

describe("<SideNavigation />", () => {
  it("renders Side Navigation component", () => {
    const { asFragment } = render(
      <Router>
        <SideNavigation />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
