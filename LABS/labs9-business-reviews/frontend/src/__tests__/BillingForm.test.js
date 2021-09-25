import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import BillingFormComponent from '../components/BillingForm';

describe('<BillingFormComponent />', () => {
  it('renders', () => {
    shallow(<BillingFormComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<BillingFormComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain 1 div', () => {
    let app = shallow(<BillingFormComponent />);
    expect(app.find("div").length).toBe(1);
  });
  it('should contain 1 p tag', () => {
    let app = shallow(<BillingFormComponent />);
    expect(app.find("p").length).toBe(1);
  });
  it('should contain 1 h1 element', () => {
    let app = shallow(<BillingFormComponent />);
    expect(app.find("h1").length).toBe(1);
    expect(app.find('h1').text()).toMatch("Bonafind Subscription");
  });
  it('should contain 1 form', () => {
    let app = shallow(<BillingFormComponent />);
    expect(app.find("form").length).toBe(1);
  });
  it('should contain 2 inputs', () => {
    let app = shallow(<BillingFormComponent />);
    expect(app.find("input").length).toBe(2);
  });
});
