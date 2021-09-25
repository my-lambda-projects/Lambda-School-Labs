import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LandingPage from './LandingPage';

it('matches snapshot', () => {
	const tree = renderer.create(<LandingPage />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Landing Page renders without crashing', () => {
	shallow(<LandingPage />);
});
