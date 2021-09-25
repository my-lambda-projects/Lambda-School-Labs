import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import LandingNavComponent from '../components/LandingNav';

describe('<LandingNavComponent />', () => {
  it('renders', () => {
    shallow(<LandingNavComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<LandingNavComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain 6 divs', () => {
    let app = shallow(<LandingNavComponent />);
    expect(app.find("div").length).toBe(5);
  });
  it('should contain 3 a tags with proper text', () => {
    let app = shallow(<LandingNavComponent />);
    expect(app.contains(
      <div className="menu__menuItems">
        <a href="#Businesses">businesses</a>
        <a href="#Reviewers">reviewers</a>
        <a href="/billing">go pro ✔</a>
      </div>
    )).toBe(true);
  });
  it('should contain SearchBar', () => {
    let app = shallow(<LandingNavComponent />);
    expect(app.find("SearchBar").length).toBe(1);
  });
});
