import React from 'react';
import CreateAlert from './CreateAlert';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

test('Input values in state are updated when typing'), () => {
  const component = renderer.create(
    <CreateAlert />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();



}

test('Input field values are updated when corresponding values in state are updated'), () => {

}
