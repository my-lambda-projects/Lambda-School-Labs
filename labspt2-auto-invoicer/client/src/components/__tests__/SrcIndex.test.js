import React from "react";

import { shallow } from "enzyme";

import { GlobalState } from "../../context/GlobalState";
import { CompanyConsumer } from "../../contexts/CompanyContext";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import App from "../App/index";

// NOTE: .toBe("<Route />") should be .toBe("<App />")?

test("contains App in GlobalState context", () => {
  const TestComponent = () => (
    <GlobalState value="Provided Value">
      <App />
    </GlobalState>
  );
  const element = shallow(<TestComponent />);
  expect(
    element
      .find(App)
      .dive()
      .text()
  ).toBe("<Route />");
});

test("contains App in CompanyConsumer context", () => {
  const TestComponent = () => (
    <CompanyConsumer value="Provided Value">
      <App />
    </CompanyConsumer>
  );
  const element = shallow(<TestComponent />);
  expect(
    element
      .find(App)
      .dive()
      .text()
  ).toBe("<Route />");
});

test("contains App in MuiThemeProvider", () => {
  const TestComponent = () => (
    <MuiThemeProvider theme="theme">
      <App />
    </MuiThemeProvider>
  );
  const element = shallow(<TestComponent />);
  expect(
    element
      .find(App)
      .dive()
      .text()
  ).toBe("<Route />");
});
