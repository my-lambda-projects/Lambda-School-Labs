import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import PopularReviewersComponent from '../components/PopularReviewers';

describe('PopularReviewersComponent />', () => {
  it('renders', () => {
    shallow(<PopularReviewersComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<PopularReviewersComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain one h1 with text "Popular Reviewers"', () => {
    let app = shallow(<PopularReviewersComponent/>);
    expect(app.find("h1").length).toBe(1);
    expect(app.find("h1").text()).toMatch("Popular Reviewers");
  });
});
