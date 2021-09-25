import React from 'react';
import renderer from 'react-test-renderer';
import TextMsg from '../../screens/TextMsg';

it(`TextMsg page renders correctly`, () => {
    const tree = renderer.create(<TextMsg />).toJSON();

    expect(tree).toMatchSnapshot();
});
