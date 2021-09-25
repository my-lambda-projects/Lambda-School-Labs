import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageFeed from '../components/MessageFeed';

Enzyme.configure({ adapter: new Adapter() });

describe('<MessageFeed />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageFeed />, div);
  });
  it('has a function called getMessages', () => {
    const wrapper = shallow(<MessageFeed />);
    expect(typeof wrapper.instance().getMessages).toBe('function');
  });
});
