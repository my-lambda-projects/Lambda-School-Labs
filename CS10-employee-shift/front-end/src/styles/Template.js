import styled from "styled-components";

import { device } from "./globals.js";

// STYLES FOR MAIN TEMPLATE

export const MainContainer = styled.div`
width: 100vw,
height: 100vh,
display: flex,
flexDirection: column;
`;

export const ComponentContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
`;

export const TopNavContainer = styled.div`
  position: fixed;
  margin-left: auto;
  top: 2%;
  right: 2%;
`;

export const MainLogo = styled.img`
  width: 180px;
  position: absolute;
  left: 120px;
  top: 14px;
  z-index: 5000;

  @media ${device.laptop} {
    left: calc(50% - 70px);
  }
`;

export const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #bfd4ea;
`;
