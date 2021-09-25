import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import Select from "../Select";

describe("<Select />", () => {
  it("renders Select", () => {
    const { asFragment } = render(
      <Select options={["test", "testing", "more testing"]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
