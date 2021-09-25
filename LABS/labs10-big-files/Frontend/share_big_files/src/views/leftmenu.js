import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SmallDiv = styled.div`
  display: none;
  @media (max-width: 460px) {
    display: block;
    height: auto;
    width: 95%;
    margin: 0 auto;
    margin-bottom:30px;
  }
`;

const Box = styled.div`
width: 100%;
background-color: white;
border-radius: 7px; 
// background: linear-gradient(
//   white, blue 50%, lightgray 50%,white
// );
// background-size: 100% 202%;
// transition: all 0.2s ease;
// animation: down-bump 0.4s ease;
&:hover {
  // background-position: 100% 100%;
  // animation: up-bump 0.4s ease;
}
`;

const LinkStyles = styled.h1`
  color:  black
  font-size: 2rem;
  // &:hover {
  //   color: blue;
  }
  @media (max-width: 460px) {
    font-size: 2.75rem;
    font-weight: bold;
    margin: 0;
    margin-bottom: 1%; 
    text-align: center;
    background-color: #206db5;
    color: white;
    border-radius: 6px;
  
  }
`;



const LeftMenu = () => {
  return (
    <SmallDiv>
    <Box>
      <Link to="/add">
        <LinkStyles>Home</LinkStyles>
      </Link>
    </Box>
    <Box>
      <Link to="/account">
        <LinkStyles>Account</LinkStyles>
      </Link>
    </Box>
     
    </SmallDiv>
  );
};

export default LeftMenu;
