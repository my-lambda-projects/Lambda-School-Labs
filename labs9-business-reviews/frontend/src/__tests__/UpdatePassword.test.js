import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import UpdatePasswordComponent from '../components/UpdatePassword';

describe('UpdatePasswordComponent />', () => {
  it('renders', () => {
    shallow(<UpdatePasswordComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<UpdatePasswordComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<UpdatePasswordComponent />);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain two div elements', () => {
    let app = shallow(<UpdatePasswordComponent />);
    expect(app.find("div").length).toBe(2);
  });
  it('should contain one form', () => {
    let app = shallow(<UpdatePasswordComponent />);
    expect(app.find("form").length).toBe(1);
  });
  it('should contain two label elements', () => {
    let app = shallow(<UpdatePasswordComponent />);
    expect(app.find("label").length).toBe(2);
  });
  it('should contain three input elements', () => {
    let app = shallow(<UpdatePasswordComponent />);
    expect(app.find("input").length).toBe(3);
  });
});

