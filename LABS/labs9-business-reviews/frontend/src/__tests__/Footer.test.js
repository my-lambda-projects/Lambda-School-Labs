import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import FooterComponent from '../components/Footer';

describe('<FooterComponent />', () => {
  it('renders', () => {
    shallow(<FooterComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<FooterComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain 1 span', () => {
    let app = shallow(<FooterComponent />);
    expect(app.find("span").length).toBe(1);
  });
  it('should contain 1 div', () => {
    let app = shallow(<FooterComponent />);
    expect(app.find("div").length).toBe(1);
  });
  it('should contain 1 img', () => {
    let app = shallow(<FooterComponent />);
    expect(app.find("img").length).toBe(1);
  });
  it('should contain 1 "a" tag with text "Meet the Team"', () => {
    let app = shallow(<FooterComponent />);
    expect(app.find("a").length).toBe(1);
    expect(app.find("a").text()).toMatch("Meet the Team");
  });
});
