import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header, Team, AppDescription } from '../components/AllComponents';
import JobSeekr from '../Images/jobSeekr.png';
import CityScape from '../Images/CityScape.png';

const LandingPage = () =>
  (
    <div className="parent">
      <Header />
      <div className="gradient" alt="Job Seekr" id="one" >
        <img src={CityScape} className="png2" alt="hello" />
        <div className="pngBox" >
          <img src={JobSeekr} className="png1" alt="hello" height="422" />

        </div>
        <div className="paragraphs">
          Sweating the small stuff, so you dont have to!
        </div>
        {localStorage.getItem('token') ?
           null :
          
          <NavLink to="billing" className="LoginCTA1">
             Buy Now!
          </NavLink>
          }
      </div>
      <AppDescription />
      <Team />
      <div className="AttentionDiv1" id="two">
        <h1 className="titles">JobSeekr!</h1>
        <p className="paragraphs">Get organized and launch your next career move!</p>
          <NavLink to="billing" className="LoginCTA2" >Buy Now!</NavLink>
      </div>
    </div>
  );

export default LandingPage;
