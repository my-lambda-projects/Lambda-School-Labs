import React from "react";
import styled from "styled-components";
// import SignOut from "../components/signOut.js";
import img from "../../src/assets/movebyteslogo.png";
import { Link } from "react-router-dom";

const NavHeaderDiv = styled.div`
  display: flex;
  // flex-direction: column;
  // margin-bottom: 1%;
  background-color: white;
  z-index: 9999;
  border-bottom: 2px solid white;
 @media (max-width: 460px) {
    border-bottom: none;
    margin-bottom: 25px
  }
`;
 
const TitleDiv = styled.div`
  padding-top: 0.5%;
  height: auto;
  width: 83%;
  display: flex;
  align-items: center;
  @media (max-width: 460px) {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    
  }
`;

const TitleH3 = styled.h3`
margin: 0;
    margin-left: 2%
    text-align: start;
    font-size: 3rem; 
    color: black;
    @media (max-width: 460px) {
      margin: 0 auto;
      text-align: center;
      font-size: 3rem;
    }
`;
const NavMenuLink = styled(Link)`
  width: 100%;
  height: 100%;
  font-weight: 400;
`;

const NavMenuLink1 = styled(Link)`
  width: 100%;
  height: 100%;
  border-right: 1px solid lightgray;
  font-weight: 400;
`;

const LinkStyles = styled.div`
  font-size: 2rem;  
  border-radius
  background-color: white;
  color:  white;
  text-align: center;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuWrapper = styled.div`
  width: 13%;
  min-width: 175px;
  display: flex;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #206DB5;
  @media (max-width: 460px) {
    display: none;
  }
`;

const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 40px;
  background-color: #206DB5;
  border-radius: 10px;
  margin-right: 2%;
  @media(max-width: 390px) {
  }
`;

const HeaderIMG = styled.img`
max-height: 60px;
max-width: 260px;
margin: 0 auto;
@media(max-width:390px){
height: 100%;
width: 100%;
}
@media(max-width: 500px){
  height: 40px;
  width: 170px;
}
`;
const NavHeader = props => {
  return (
    <NavHeaderDiv>
      <TitleDiv>
        <TitleH3><Link to="add"><HeaderIMG src={img} alt="mblogo" /></Link></TitleH3>
      </TitleDiv>
      <MenuWrapper>
        <MenuDiv>
          <NavMenuLink1 to="/add">
            <LinkStyles>Home</LinkStyles>
          </NavMenuLink1>
        </MenuDiv>
        <MenuDiv>
          <NavMenuLink to="/account">
            <LinkStyles>Account</LinkStyles>
          </NavMenuLink>
        </MenuDiv>
 
      </MenuWrapper>

    </NavHeaderDiv>
  );
};
export default NavHeader;

//going to have to use useEffect to get params for 2nd thing */
