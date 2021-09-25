import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import LoginComponent from '../components/Login';

describe('<LoginComponent />', () => {
  it('renders', () => {
    shallow(<LoginComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<LoginComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<LoginComponent />);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain GatedSignIn', () => {
    let app = shallow(<LoginComponent />);
    expect(app.find("GatedSignIn").length).toBe(1);
  });
});
