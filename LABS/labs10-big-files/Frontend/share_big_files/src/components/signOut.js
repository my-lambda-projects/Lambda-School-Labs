import React from "react";
import styled from "styled-components";
import history from "../history";
import { FaSignOutAlt } from "react-icons/fa";


function signOutHandler(){
console.log('Sign out handler fired')
localStorage.clear('accessToken');
localStorage.clear('expiresAt');
history.push("/");
window.location.reload();

}

const SignOutDiv = styled.div`
  width: 151px;
  height: 49px;
  border-radius: 5px;
  margin: 3% auto;
  background-color: #206db5; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

`;
const WhiteBorder = styled.div`
height:100%;
width: 1px;
border-right: 1px solid white;
padding-left: 3.5%;
`;

const SignOutH2 = styled.h2`
line-height: 2;
  color: white;
  font-size: 2rem;
  font-style: Raleway
  font-weight: bold;
  margin: 0; 
  padding-left: 4.5%;
  width: fit-content;
  height: fit-content; 
  `;


 

const SignOut = props => {
  return  (
         <SignOutDiv onClick={signOutHandler}>
         <FaSignOutAlt size={30} color="#ffffff" />
         <WhiteBorder></WhiteBorder>
         <SignOutH2>Sign Out</SignOutH2>
       </SignOutDiv>
  )
};

export default SignOut;
