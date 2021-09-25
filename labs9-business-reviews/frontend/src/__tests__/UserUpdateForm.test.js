import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import UserUpdateFormComponent from '../components/UserUpdateForm';

describe('UserUpdateFormComponent />', () => {
  it('renders', () => {
    shallow(<UserUpdateFormComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<UserUpdateFormComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
