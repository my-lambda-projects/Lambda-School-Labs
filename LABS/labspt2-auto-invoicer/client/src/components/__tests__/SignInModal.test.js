import React from "react";
import { mount } from "enzyme";
import SignInModal from "../SignInModal/index";

import { ReactComponent as GoogleLogo } from "../../assets/btn_google_light_normal_ios.svg";
import { ReactComponent as FacebookLogo } from "../../assets/f-ogo_RGB_HEX-58.svg";

let wrapped;

beforeEach(() => {
  wrapped = mount(<SignInModal />);
});

afterEach(() => {
  wrapped.unmount();
});

it("shows GoogleLogo and FacebookLogo", () => {
  expect(wrapped.find(GoogleLogo).length).toEqual(1);
  expect(wrapped.find(FacebookLogo).length).toEqual(1);
});
