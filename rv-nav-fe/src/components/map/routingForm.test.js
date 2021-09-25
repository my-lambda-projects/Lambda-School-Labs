import React from "react";
import * as rtl from "react-testing-library";
import "jest-dom/extend-component";
import RoutingForm from "./routingForm";
afterEach(rtl.cleanup);

describe("routing form", () => {
  it("render the form", () => {
    const wrapper = rtl.render(<RoutingForm />)
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});