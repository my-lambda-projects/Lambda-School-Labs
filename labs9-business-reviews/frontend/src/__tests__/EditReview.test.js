import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import EditReviewComponent from '../components/EditReview';

describe('<EditReviewComponent />', () => {
  it('renders', () => {
    shallow(<EditReviewComponent match={{ params: '1' }} />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain 4 divs', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("div").length).toBe(3);
  });
  it('should contain one form', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("form").length).toBe(1);
  });
  it('should contain one h1 element with text "Edit your review"', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("h1").length).toBe(1);
    expect(app.find("h1").text()).toMatch("Edit your review");
  });
  it('should contain 3 labels', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("label").length).toBe(3);
  });
  it('should contain 2 buttons', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("button").length).toBe(2);
  });
  it('should contain 5 options', () => {
    let app = shallow(<EditReviewComponent match={{ params: '1' }} />);
    expect(app.find("option").length).toBe(5);
  });
});
