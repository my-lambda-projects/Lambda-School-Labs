/* 
  - This component will have to be loaded into the Landing Page (might be added to other components as well)
  - Buttons to:
      1. Sign Up
      2. Sign In
      3. Sign Out
  - Make it look pretty :D
  - 
*/
import React from 'react';

class Navigation extends React.Component {
  state = {
    example: ''
  }

  render() {
    return (
      <h1>Hello World, I am the Navigation Component</h1>
    );
  } // --> render() brace

} // --> class brace

export default Navigation;