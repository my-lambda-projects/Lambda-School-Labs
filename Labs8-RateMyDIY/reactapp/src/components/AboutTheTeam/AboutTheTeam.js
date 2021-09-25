// Import Dependencies
import React from 'react';
// import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';
import { Link } from "react-router-dom";
// styled-components
const AboutTheTeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  min-width: 600px;
  height: auto;
  background: #eff;
  margin: 10px auto;
`;
const NavWrapper = styled.div`
  display: flex;
`;
const AboutTheTeam = () => {
  return (
    <AboutTheTeamWrapper>
      <NavWrapper><Link to="/">Back</Link></NavWrapper>
      This application is a place that you can share your DIY projects and receive feedback.  It is free for all!
    </AboutTheTeamWrapper>
  );
}

export default AboutTheTeam;