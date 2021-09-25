import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Settings from '../src/Component/Settings';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Settings />);

describe('<Settings />', () => {
  it('should contain a navbar', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });
});
