import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Register } from './Register';


describe('Register Component', () => {
  const openButtonSpy = jest.fn();
  global.open = jest.fn();
  const wrapper = shallow(
      <Register openLink={openButtonSpy} />
  );

  test('Run onClick function when login button is clicked', () => {
      wrapper.find('.btn-login').simulate('click');
      expect(global.open).toBeCalled();
  });

  test('Run onClick function when register button is clicked', () => {
      wrapper.find('.btn-register').simulate('click');
      expect(global.open).toBeCalled();
  });
});
