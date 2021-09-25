import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import TextArea from "../TextArea";

describe("<TextArea />", () => {
  it("renders TextArea", () => {
    const { asFragment } = render(<TextArea />);
    expect(asFragment()).toMatchSnapshot();
  });
});
