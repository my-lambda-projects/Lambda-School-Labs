import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Accountlogin from '../src/Component/AccountLogin';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Accountlogin />);

describe('<Accountlogin />', () => {
  it('should have 2 div tag elements', () => {
    expect(wrapper.find('div')).have.length(2);
  });
  it('should have a Navbar in the webpage', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
});
