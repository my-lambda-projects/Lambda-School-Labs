import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MyLoans from '../src/Component/MyLoans';

configure({ adapter: new Adapter() });
const wrapper = shallow(<MyLoans />);

describe('<MyLoans/>', () => {
  it('should have a header', () => {
    expect(wrapper.find('h1')).have.length(1);
  });
});
