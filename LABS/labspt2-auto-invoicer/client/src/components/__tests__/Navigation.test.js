import React from "react";
import { shallow } from "enzyme";

import Navigation from "../Navigation/Navigation";
import AppBar from "@material-ui/core/AppBar";
import AccountBar from "../Navigation/AccountBar";
import NavLinksBar from "../Navigation/NavLinksBar";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Navigation />);
});

it("contains an AppBar component from Material-UI", () => {
  expect(wrapped.find(AppBar));
});

it("contains an AccountBar component", () => {
  expect(wrapped.find(AccountBar).length).toEqual(0);
});

it("contains an NavLinksBar component", () => {
  expect(wrapped.find(NavLinksBar));
});
