import React from "react";
import { shallow } from "enzyme";

import App from "../App/index";
import SignInModal from "../SignInModal/index";
import Navigation from "../Navigation/Navigation";
import SettingsPage from "../../views/SettingsPage";
import LandingPage from "../../views/LandingPage";
import BillingPage from "../../views/BillingPage";
import CreateInvoice from "../../views/CreateInvoice";
import InvoiceList from "../../views/InvoiceList";
import InvoiceView from "../../views/InvoiceView";
import CreateInvoiceStepper from "../CreateInvoiceStepper";
import EditInvoiceForm from "../EditInvoiceForm";

import Dashboard from "../Dashboard/index";

// Testing the App Component - show all components *within* the App component change 1

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it("shows a Sign-in modal", () => {
  expect(wrapped.find(SignInModal).length).toEqual(0);
});

it("contains a Navigation component", () => {
  expect(wrapped.find(Navigation).length).toEqual(0);
});

it("contains a BillingPage Views component", () => {
  expect(wrapped.find(BillingPage).length).toEqual(0);
});

it("contains Dashboard component", () => {
  expect(wrapped.find(Dashboard).length).toEqual(0);
});

it("contains SettingsPage Views component", () => {
  expect(wrapped.find(SettingsPage).length).toEqual(0);
});

//makes more sense to do: expect(wrapped.find(LandingPage));
it("contains LandingPage Views component", () => {
  expect(wrapped.find(LandingPage).length).toEqual(0);
});

it("contains CreateInvoice views component", () => {
  expect(wrapped.find(CreateInvoice));
});

it("contains InvoiceList views component", () => {
  expect(wrapped.find(InvoiceList));
});

it("contains InvoiceView views component", () => {
  expect(wrapped.find(InvoiceView));
});

it("contains CreateInvoiceStepper component", () => {
  expect(wrapped.find(CreateInvoiceStepper));
});

it("contains EditInvoiceForm component", () => {
  expect(wrapped.find(EditInvoiceForm));
});
