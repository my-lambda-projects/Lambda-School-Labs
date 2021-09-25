import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import ResetPasswordComponent from '../components/ResetPassword';

describe('ResetPasswordComponent />', () => {
  it('renders', () => {
    shallow(<ResetPasswordComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<ResetPasswordComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<ResetPasswordComponent/>);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain one h1 with text "Forgot your password?"', () => {
    let app = shallow(<ResetPasswordComponent/>);
    expect(app.find("h1").length).toBe(1);
    expect(app.find("h1").text()).toMatch("Forgot your password?");
  });
  it('should contain one form element', () => {
    let app = shallow(<ResetPasswordComponent/>);
    expect(app.find("form").length).toBe(1);
  });
  it('should contain one label', () => {
    let app = shallow(<ResetPasswordComponent/>);
    expect(app.find("label").length).toBe(1);
  });
  it('should contain two input elements', () => {
    let app = shallow(<ResetPasswordComponent/>);
    expect(app.find("input").length).toBe(2);
  });
});
