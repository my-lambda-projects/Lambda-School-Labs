import React from "react";

import { shallow } from "enzyme";

import { UserConsumer } from "../../contexts/UserContext";
import CreateInvoiceForm2 from "../CreateInvoiceForm2";

// NOTE: Will switch over to Invoice-Steppers when ready again

test("contains CreateInvoiceForm2", () => {
  const TestComponent = () => (
    <UserConsumer value="Provided Value">
      <CreateInvoiceForm2 />
    </UserConsumer>
  );
  const element = shallow(<TestComponent />);
  expect(
    element
      .find(CreateInvoiceForm2)
      .dive()
      .text()
  ).toBe("<CreateInvoiceForm2 />");
});
