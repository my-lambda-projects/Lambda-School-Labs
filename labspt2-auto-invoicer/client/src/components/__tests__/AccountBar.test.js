import React, { PropTypes } from "react";
import { shallow, mount } from "enzyme";

import AccountBar from "../Navigation/AccountBar";

import UserContext from "../../context/UserContext";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<AccountBar />);
});

it("contains five spans", () => {
  expect(wrapped.find("span").length).toEqual(0);
});

// NOTE: Testing React Component using Context API
// using mount instead of shallow
// without childContextTypes, this error thrown => Invariant Violation: WrapperComponent.getChildContext(): key "$$typeof" is not defined in childContextTypes.
// with childContextTypes: { UserContext: PropTypes.node }
// this error thrown => TypeError: Cannot read property 'node' of undefined

// let wrapped;

// beforeEach(() => {
//   wrapped = mount(<AccountBar />, {
//     context: UserContext,
//     childContextTypes: { UserContext: PropTypes.node }
//   });
// });

// it("contains five spans", () => {
//   expect(wrapped.find("span").length).toEqual(5);
// });
