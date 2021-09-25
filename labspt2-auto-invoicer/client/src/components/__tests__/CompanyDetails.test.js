import React, { PropTypes } from "react";

import { shallow, mount } from "enzyme";

import SelectCompany from "../Settings/CompanyDetails/SelectCompany";
import ViewCompanyDetails from "../Settings/CompanyDetails/ViewCompanyDetails";
import EditCompanyDetails from "../Settings/CompanyDetails/EditCompanyDetails";

import { UserConsumer } from "../../contexts/UserContext";

// enzyme shallow render supports .dive() which allows deeply rendering a part of
// shallow rendered component

test("contains SelectCompany, ViewCompanyDetails and EditCompanyDetails", () => {
  const TestComponent = () => (
    <UserConsumer value="Provided Value">
      <SelectCompany />
      <ViewCompanyDetails />
      <EditCompanyDetails />
    </UserConsumer>
  );
  const element = shallow(<TestComponent />);
  expect(
    element
      .find(SelectCompany, EditCompanyDetails)
      .dive()
      .text()
  ).toBe("<SelectCompany />");
});
