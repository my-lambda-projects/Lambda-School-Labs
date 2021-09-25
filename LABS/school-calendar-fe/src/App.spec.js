import React from 'react';
import { shallow} from 'enzyme';
import App, {initializeAnalytics} from './App';
import {LoginButton} from './components/Welcome'

// Grab the module that we want to mock part of
var auth = require('./contexts/auth');

// Replace the real useAuth() function with a mock function we can control
auth.useAuth = jest.fn(
  () => {
    console.log("*** Mock useAuth **")

    return { googleApi: jest.fn() }
  });




describe('Initializing Components', () => {
  it('should render initializeAnalytics', () => {
    const component = shallow(<initializeAnalytics />);

    expect(component).toMatchSnapshot();
  });

  it('should render App correctly', () => {
    const component = shallow(<App/>);

    expect(component).toMatchSnapshot();
  });



  it('should render login button correctly', ()=>{
    const component = shallow(<LoginButton/>);
    // console.log('login', component.debug())
    let button = component.find('span');
    expect(button.text()).toBe('Sign in with Google')

    

  })

});






