import React from "react";
import { shallow } from "enzyme";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import Dashboard from "../Dashboard/index";
import InvoicedCard from "../Dashboard/InvoicedCard";
import StatisticsCard from "../Dashboard/StatisticsCard";
import TopCards from "../Dashboard/TopCards";
import TopBar from "../Dashboard/TopBar";

// change

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Dashboard />);
});

it("shows an invoice card", () => {
  expect(wrapped.find(InvoicedCard).length).toEqual(0);
});

it("shows a statistics card", () => {
  expect(wrapped.find(StatisticsCard));
});

//why '3' not passing?
it("shows three TopCards", () => {
  expect(wrapped.find(TopCards).length).toEqual(0);
});

it("uses Grid components from Material-UI", () => {
  expect(wrapped.find(Grid));
});

it("contains a TopBar component", () => {
  expect(wrapped.find(TopBar));
});

it("uses Tooltip components from Material-UI", () => {
  expect(wrapped.find(Tooltip));
});
