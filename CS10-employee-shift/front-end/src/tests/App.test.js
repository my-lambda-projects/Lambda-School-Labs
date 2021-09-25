import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import LandingCard from '../components/Organisms/landing_card.js';

import Landing from '../components/Pages/Landing.js';
// import Admin from '../components/Pages/Admin.js';
// import Billing from '../components/Pages/Billing.js';
// import Calendar from '../components/Pages/Calendar.js';
// import Dashboard from '../components/Pages/Dashboard.js';
// import Employees from '../components/Pages/Employees.js';
// import Settings from '../components/Pages/Settings.js'
import Signin from '../components/Pages/Signin.js'
// import Signup from '../components/Pages/Signup.js'



Enzyme.configure({ adapter: new EnzymeAdapter() })


it('renders without crashing', () => {
  const wrapper = shallow(<LandingCard />)
  const appComponent = wrapper.find("[data-test='component-LandingCard']")
  expect(appComponent.length).toBe(1);
});

it('renders login button', () => {
  const wrapper = shallow(<LandingCard />)
  const button = wrapper.find("[data-test='schedule-button']")
  expect(button.length).toBe(1);
})


it('renders signup button', () => {
  const wrapper = shallow(<LandingCard />)
  const button = wrapper.find("[data-test='signup-button']")
  expect(button.length).toBe(1);
})

it('renders signup button', () => {
  const wrapper = shallow(<LandingCard />)
  const button = wrapper.find("[data-test='signin-button']")
  expect(button.length).toBe(1);
})


describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<LandingCard onClick={mockCallBack}>Ok!</LandingCard>));
    button.find("[data-test='schedule-button']").simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<LandingCard onClick={mockCallBack}>Ok!</LandingCard>));
    button.find("[data-test='signup-button']").simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<LandingCard onClick={mockCallBack}>Ok!</LandingCard>));
    button.find("[data-test='signin-button']").simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});

// it('renders without crashing', () => {
//   const wrapper = shallow(<Employees />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Admin />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Billing />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Calendar />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Dashboard />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Settings />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Signin />)
//   console.log(wrapper.debug())
// });

// it('renders without crashing', () => {
//   const wrapper = shallow(<Signup />)
//   console.log(wrapper.debug())
// });