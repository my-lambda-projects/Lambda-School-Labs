import React from "react";
import { shallow } from "enzyme";

import Invoices from "../Invoices/index";
import EmptyInvoices from "../EmptyInvoices/index";
import EditDialog from "../EditDialog.js/index";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

it("contains AppBar component from material-ui", () => {
  const wrapped = shallow(<Invoices />);
  expect(wrapped.find(AppBar).length).toEqual(0);
});

it("contains Create Button component", () => {
  const wrapped = shallow(<Invoices />);
  expect(wrapped.find(Button).length).toEqual(0);
});

it("contains EmptyInvoices component", () => {
  const wrapped = shallow(<Invoices />);
  expect(wrapped.find(EmptyInvoices).length).toEqual(0);
});

it("contains EditDialog component", () => {
  const wrapped = shallow(<Invoices />);
  expect(wrapped.find(EditDialog).length).toEqual(0);
});

it("contains Tooltip component", () => {
  const wrapped = shallow(<Invoices />);
  expect(wrapped.find(Tooltip).length).toEqual(0);
});
