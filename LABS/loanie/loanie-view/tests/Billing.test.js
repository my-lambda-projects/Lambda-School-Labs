import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MyStoreCheckout from '../src/Component/StripeBilling/MyStoreCheckout';

configure({ adapter: new Adapter() });
const wrapper = shallow(<MyStoreCheckout />);

describe('<MyStoreCheckout />', () => {
  it('should contain Elements', () => {
    expect(wrapper.find('Elements')).to.have.length(1);
  });
});
