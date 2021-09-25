import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

describe("App Component tests", () => {
  it("renders App", () => {
    const { asFragment } = render(
      <Router>
        <App />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
