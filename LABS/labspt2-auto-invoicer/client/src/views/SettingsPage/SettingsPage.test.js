import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import SettingsPage from "../SettingsPage";

describe("<SettingsPage />", () => {
  it("renders Settings Page view", () => {
    const { asFragment } = render(<SettingsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
