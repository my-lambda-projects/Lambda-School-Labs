/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="landing">
    <div className="background">
      <video autoPlay muted loop className="background__video">
        <source src="/video/people_talking.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="content">
      <div className="content__header"><img src="/images/logo-teal.gif" alt="Bangarang Bingo" /></div>
      <div className="content__textbox">
        <p>Inject fun into your next gathering, party, or event with custom bingo cards.</p>
        <p>
          Making bingo cards can be time consuming and difficult, but now there’s an easy way to make beautiful,
          print ready bingo cards. Simply input your words, choose some styling options, and we do the rest!
        </p>
      </div>
      <div className="content__button"><Link to="/login" className="links__button">Make Your Bingo Card Now!</Link></div>
      <div className="link"><Link to="/aboutUs">About Us</Link></div>
    </div>
    <style jsx scoped>
    {`
    .landing {
      min-height: 100%;
      
    }
    .background {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      z-index: 0;
      min-height: 100vh;
  }
  .background__video {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    -ms-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background: url(polina.jpg) no-repeat;
    background-size: cover; 
  }
  
  .content {
    position: relative;
    padding-top: 300px;
    padding-top: 40vh;
    text-align: center;    
      width: 100%;
  }
  
  .content__textbox {
      background: rgba(0, 0, 0, 0.7);
      color: #f1f1f1;
      min-width: 100%;
      padding: 5px 0px 5px 0px;
  }
  
  .content__textbox p {
      font-family: 'Quicksand', Verdana, Geneva, Tahoma, sans-serif;
      font-weight: 500;
      margin: 20px;
  }
  
  .content__header img{
      width: 80%;
      max-width: 350px;
      display: block;
      text-align: center;
      margin: 0 auto;
  }
  
  .content__button {
      margin: 25px 0px 25px 0px;
  }
  
  .content :global(a.links__button) {
      text-decoration: none;
      border: none;
      background: #239999;
      padding: 10px;
      margin: 10px;
      border-radius: 30px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
  }
  .link :global(a) {
    color: #fff;
    text-decoration: none;
    padding: 10px 0;
    display: inline-block;
  }
    `}
    </style>
  </div>
);

export default Landing;
