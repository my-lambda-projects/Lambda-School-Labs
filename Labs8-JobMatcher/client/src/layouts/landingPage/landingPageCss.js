import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const LandingDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  font-size: 16px;
  // padding-top: 100px;
  background-color: #2e3141;
  background-image: linear-gradient(
      to top,
      rgba(46, 49, 65, 0.8),
      rgba(46, 49, 65, 0.8)
    ),
    url(/static/media/bg-lg.c712a03e.jpg);
  background-size: auto, cover;
  background-position: center, center;
  color: white;
  position: absolute;
  top: 0;
  z-index: 10;
  filter: ${props =>
    props.is_menuOpen ? "blur(1.8px) brightness(0.6)" : null};
  transition: all 0.6s;
`;
export const LandingHeading = styled.h1`
  animation: movieInLeftSlow 3s;
  font-size: 70px;

  @keyframes movieInLeftSlow {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    80% {
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }
`;
const MoveInLeft = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;
export const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${MoveInLeft} 2s;
  width: 80%;
  margin: auto;
`;

export const StyledLink = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #9c17ff;
  color: white;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 16px 2px #2e2e2e62;
  transition: all 0.3s;
  display: inline-block;
  &:hover {
    text-decoration: none;
    font-size: 17px;
    margin: 9px;

    color: white;
    box-shadow: 0 10px 16px 2px #2e2e2e62;
  }
`;
export const StyledSvg = styled.path`
  fill: #9c17ff;
  stroke: #000990;
  stroke-miterlimit: 10;
  position: absolute;
  bottom: 0;
`;
