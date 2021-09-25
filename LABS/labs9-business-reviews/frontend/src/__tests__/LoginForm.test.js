import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import LoginFormComponent from '../components/LoginForm';

describe('<LoginComponent />', () => {
  it('renders', () => {
    shallow(<LoginFormComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<LoginFormComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain 1 h4 with text "Dont have an account?"', () => {
    let app = shallow(<LoginFormComponent />);
    expect(app.find("h4").length).toBe(1);
    expect(app.find("h4").text()).toMatch("Don't have an account?");
  });
  it('should contain one Link', () => {
    let app = shallow(<LoginFormComponent />);
    expect(app.find("Link").length).toBe(1);
  });
  it('should contain 2 label elements', () => {
    let app = shallow(<LoginFormComponent />);
    expect(app.find("label").length).toBe(2);
  });
  it('should contain one input element', () => {
    let app = shallow(<LoginFormComponent />);
    expect(app.find("input").length).toBe(1);
  });
});
