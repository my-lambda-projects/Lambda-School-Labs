import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SingleBusinessComponent from '../components/SingleBusiness';

describe('SingleBusinessComponent />', () => {
  it('renders', () => {
    shallow(<SingleBusinessComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<SingleBusinessComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
