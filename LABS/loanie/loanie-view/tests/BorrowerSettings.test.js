import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import BorrowerSettings from '../src/Component/BorrowerSettings';

configure({ adapter: new Adapter() });
const wrapper = shallow(<BorrowerSettings />);

describe('<BorrowerSettings />', () => {
  it('should contain a navbar', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });
});
