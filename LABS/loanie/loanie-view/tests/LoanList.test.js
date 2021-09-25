import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import LoanList from '../src/Component/LoanList';

configure({ adapter: new Adapter() });
const wrapper = shallow(<LoanList />);

describe('<LoanList />', () => {
  it('should contain a navbar', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });
});
