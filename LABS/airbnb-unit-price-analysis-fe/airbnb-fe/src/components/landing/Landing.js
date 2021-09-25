import React from "react";
import styled from "styled-components";
import ScrollableAnchor from "react-scrollable-anchor";

import device from "../../devices";
import Quadrant1 from "./Quadrant1";
import Quadrant2 from "./Quadrant2";
import Quadrant3 from "./Quadrant3";
import Quadrant4 from "./Quadrant4";
import Footer from "./Footer";

import { useAuth0 } from "../../react-auth0-wrapper";

const LandingContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const QuadrantLimiter = styled.div`
  height: 100%;
  width: 80%;
`;

function Landing() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <LandingContainerDiv>
      <Quadrant1 />

      <Quadrant2 />

      <Quadrant3 />

      <Quadrant4 />
      <Footer />
    </LandingContainerDiv>
  );
}

export default Landing;
