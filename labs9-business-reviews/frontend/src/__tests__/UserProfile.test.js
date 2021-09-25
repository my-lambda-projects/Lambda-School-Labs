import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import UserProfileComponent from '../components/UserProfile';

describe('UserProfileComponent />', () => {
  it('renders', () => {
    shallow(<UserProfileComponent match={{ params: '1' }} />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileComponent match={{ params: '1' }} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<UserProfileComponent match={{ params: '1' }} />);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain MyReviews', () => {
    let app = shallow(<UserProfileComponent match={{ params: '1' }} />);
    expect(app.find("MyReviews").length).toBe(1);
  });
});
