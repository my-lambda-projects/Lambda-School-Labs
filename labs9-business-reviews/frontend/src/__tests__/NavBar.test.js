import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import NavBarComponent from '../components/NavBar';

describe('NavBarComponent />', () => {
  it('renders', () => {
    shallow(<NavBarComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<NavBarComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
