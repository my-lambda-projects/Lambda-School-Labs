import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import CalendarDatePicker from "../CalendarDatePicker";

describe("<CalendarDatePicker />", () => {
  it("renders Calendar Date Picker", () => {
    const { asFragment } = render(<CalendarDatePicker />);
    expect(asFragment()).toMatchSnapshot();
  });
});
