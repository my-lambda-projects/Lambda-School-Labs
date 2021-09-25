import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import Modal from "../Modal";

describe("<Modal />", () => {
  it("renders Modal", () => {
    const { asFragment } = render(<Modal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
