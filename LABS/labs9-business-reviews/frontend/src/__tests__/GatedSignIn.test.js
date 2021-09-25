import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import GatedSignInComponent from '../components/GatedSignInComponent';

describe('<GatedSignInComponent />', () => {
  it('renders', () => {
    shallow(<GatedSignInComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<GatedSignInComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
