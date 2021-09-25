import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import UpdateUserComponent from '../components/UpdateUser';

describe('UpdateUserComponent />', () => {
  it('renders', () => {
    shallow(<UpdateUserComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<UpdateUserComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<UpdateUserComponent />);
    expect(app.find("NavBar").length).toBe(1);
  });
});
