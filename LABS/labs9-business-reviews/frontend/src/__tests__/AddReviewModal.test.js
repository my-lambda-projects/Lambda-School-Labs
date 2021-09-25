import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import AddReviewModal from '../components/AddReviewModal';

describe('<AddReviewModal />', () => {
  it('renders', () => {
    shallow(<AddReviewModal />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<AddReviewModal />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain 4 divs', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find("div").length).toBe(4);
  });
  it('should contain review__modal div', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find(".review__modal").length).toBe(1);
  });
  it('should contain container div', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find(".container").length).toBe(1);
  });
  it('should contain rating div', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find(".rating").length).toBe(1);
  });
  it('should contain review__modal--buttons div', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find(".review__modal--buttons").length).toBe(1);
  });
  it('should contain 5 options', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find("option").length).toBe(5);
  });
  it('should contain 2 buttons', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find("button").length).toBe(2);
  });
  it('should contain a form', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find("form").length).toBe(1);
    expect(app.find(".review__modal--form").length).toBe(1);
  });
  it('should contain h3 element with text "Add a Review"', () => {
    let app = shallow(<AddReviewModal/>);
    expect(app.find("h3").length).toBe(1);
    expect(app.find("h3").text()).toMatch("Add a Review");
  });
});
