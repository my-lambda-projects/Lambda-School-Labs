import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import MainContentComponent from '../components/MainContent';

describe('MainContentComponent />', () => {
  it('renders', () => {
    shallow(<MainContentComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<MainContentComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain PopularBusinesses and PopularReviewers', () => {
    let main = shallow(<MainContentComponent />);
    expect(main.find("PopularBusinesses").length).toBe(1);
    expect(main.find("PopularReviewers").length).toBe(1);
  })
});
