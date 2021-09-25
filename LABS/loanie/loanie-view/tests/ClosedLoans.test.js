import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ClosedLoans from '../src/Component/ClosedLoans';

configure({ adapter: new Adapter() });
const wrapper = shallow(<ClosedLoans />);

describe('<ClosedLoans', () => {
  it('should contain a navbar on the side for navigation', () => {
    expect(wrapper.find('h2')).to.have.length(1);
  });
});
