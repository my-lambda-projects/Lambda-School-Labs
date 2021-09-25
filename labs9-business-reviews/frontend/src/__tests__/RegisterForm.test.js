import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import RegisterFormComponent from '../components/RegisterForm';

describe('RegisterFormComponent />', () => {
  it('renders', () => {
    shallow(<RegisterFormComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<RegisterFormComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<RegisterFormComponent/>);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain 3 label elements', () => {
    let app = shallow(<RegisterFormComponent/>);
    expect(app.find("label").length).toBe(3);
  });
});
