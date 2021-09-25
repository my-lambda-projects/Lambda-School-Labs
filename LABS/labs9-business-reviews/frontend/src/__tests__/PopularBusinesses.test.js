import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import PopularBusinessesComponent from '../components/PopularBusinesses';

describe('PopularBusinessesComponent />', () => {
  it('renders', () => {
    shallow(<PopularBusinessesComponent />);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<PopularBusinessesComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should contain h1.business__header with text "Popular Businesses', () => {
    let app = shallow(<PopularBusinessesComponent/>);
    expect(app.find(".business__header").length).toBe(1);
    expect(app.find(".business__header").text()).toBe("Popular Businesses");
  });
  it('should contain div with id #Businesses', () => {
    let app = shallow(<PopularBusinessesComponent/>);
    expect(app.find("#Businesses").length).toBe(1);
  });
});
