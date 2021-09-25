import React from "react";
import { mount } from "enzyme";
import Landing from "../Landing/index";

//import components within Landing
import HeadlineText from "../LandingText/HeadlineText";
import LandingCTA from "../LandingText/LandingCTA";
import LandingFeaturesText from "../LandingText/LandingFeaturesText";
import { LandingGetStarted } from "../LandingGetStarted";

let wrapped;

beforeEach(() => {
  wrapped = mount(<Landing />);
});

afterEach(() => {
  wrapped.unmount();
});

it("shows HeadlineText, LandingCTA, LandingFeaturesText, and LandingGetStarted", () => {
  expect(wrapped.find(HeadlineText).length).toEqual(1);
  expect(wrapped.find(LandingCTA).length).toEqual(1);
  expect(wrapped.find(LandingFeaturesText).length).toEqual(1);
  expect(wrapped.find(LandingGetStarted).length).toEqual(1);
});
