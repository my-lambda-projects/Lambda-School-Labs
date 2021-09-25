import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import BillingPage from '../components/BillingPage';

describe('<BillingPage />', () => {
  it('renders', () => {
    shallow(<BillingPage />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<BillingPage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain NavBar', () => {
    let app = shallow(<BillingPage />);
    expect(app.find("NavBar").length).toBe(1);
  });
  it('should contain BillingForm', () => {
    let app = shallow(<BillingPage />);
    expect(app.find("BillingForm").length).toBe(1);
  });
  it('should contain div with classname "billing"', () => {
    let app = shallow(<BillingPage/>);
    expect(app.find("div").length).toBe(2);
    expect(app.find(".billing").length).toBe(1);
  });
  it('should contain one button', () => {
    let app = shallow(<BillingPage/>);
    expect(app.find('button').length).toBe(1);
  });
});
