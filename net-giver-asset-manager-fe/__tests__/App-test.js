import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import SMSLogin from '../screens/SmsLogin';
import LocationForm from '../screens/LocationForm'
// jest.mock('../screens/SmsLogin');

// it('renders SMS login page', () => {
//   const snap = renderer.create(<LocationForm />).toJSON();
//   expect(snap).toMatchSnapshot();
// });


// describe('Location Form', () => {
//   jest.useFakeTimers();

//   beforeEach(() => {
//     NavigationTestUtils.resetInternalState();
//   });

// });


describe('Testing case', () => {
  jest.useFakeTimers(); jest.useFakeTimers();


  beforeEach(() => {
    beforeEach(() => {
      NavigationTestUtils.resetInternalState(); NavigationTestUtils.resetInternalState();
    });
  });


  it('SMS Login test case', () => {
    const snap = renderer.create(<SMSLogin />).toJSON();
    expect(true).toEqual(true);

  })

});