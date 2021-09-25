import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import SidebarNav from '../src/Component/SideBarNav';

configure({ adapter: new Adapter() });
const wrapper = shallow(<SidebarNav userType="managerUser" />);

describe('<SidebarNav />', () => {
  it('should have one links ', () => {
    expect(wrapper.find('div')).have.length(1);
  });
});
