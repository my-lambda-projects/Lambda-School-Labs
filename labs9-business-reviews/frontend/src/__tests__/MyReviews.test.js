import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import MyReviewsComponent from '../components/MyReviews';

describe('MyReviewsComponent />', () => {
  it('renders', () => {
    shallow(<MyReviewsComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<MyReviewsComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
