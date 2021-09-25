import React from "react";
import styled from "styled-components"; 
import { FaUserPlus } from "react-icons/fa";

const WhiteBorder = styled.div`
height:100%;
width: 1px;
border-right: 1px solid white;
padding-left: 5.6%;
`;

const UpgradeDiv = styled.div`
  width: 151px;
  height: 49px;
  border-radius: 5px;
  margin: 3% auto;
  background-color: #206db5; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: -53px;
`;

const UpgradeH2 = styled.h2`
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
 
const Upgrade = props => {
  return  (
         <UpgradeDiv >
         <FaUserPlus size={30} color="#ffffff" />
         <WhiteBorder></WhiteBorder>
         <UpgradeH2>Upgrade</UpgradeH2>
       </UpgradeDiv>
  )
};

export default Upgrade;
