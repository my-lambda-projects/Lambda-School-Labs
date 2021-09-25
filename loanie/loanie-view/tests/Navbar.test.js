import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../src/Component/Navbar';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Navbar />);

describe('<Navbar />', () => {
  it('should have a header which is the title of app', () => {
    expect(wrapper.find('h1')).have.length(1);
  });
  it('should have one links', () => {
    expect(wrapper.find('Link')).have.length(1);
  });
  it('should have two buttons', () => {
    expect(wrapper.find('Button')).have.length(2);
  });
});
