import React from 'react';
import Accountlogin from '../components/accountlogin/accountlogin';
import Accountsignup from '../components/accountsignup/accountsignup';
import Background from '../img/2background.jpg';
import Logo from '../img/Quilly Full Logo - Blue Text.svg';

const Homepage = (props) => {
  return (
    <div className="homePage">
      <img src={Background} className="background" alt="background" />
      <img src={Logo} id="logo" alt="logo" />
      <div className="homeDescription">
        <p>Need help visualizing your job search?</p>
        <p>Our tools will help you on your journey of landing your dream job.</p>
        <div className="frontPageButtonContainer">
          <Accountsignup {...props} />
          <Accountlogin {...props} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
