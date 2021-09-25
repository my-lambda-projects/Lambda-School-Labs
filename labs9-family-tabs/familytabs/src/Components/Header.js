import React, { Component } from "react";
import NavBurger from "./NavBurger";
import FTLogo8 from "./images/FT_Logo_8.png";
import styled from "styled-components";
import PublicRoute from "../context/PublicRoute";
import PrivateRoute from "../context/PrivateRoute";
import LoginButton from "./styled/LoginButton";

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  max-width: 100%;

  @media (max-width: 768px) {
    display: flex;
    align-items:center;
    flex-direction: column-reverse;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  h5 {
    position: absolute;
    left: 65px;
    bottom: -15px;
    font-size: 18px;
    @media (max-width:768px){
      bottom: 10px;
      left:90px;
    }
  }
`;

const BurgerWrapper = styled.div`
  padding-top: 7.5px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const LogoImage = styled.img`
  width: 150px;
  background-color: #242943;
  margin-right: 25px;

  @media (min-width: 1281px) and (max-width: 1450px) {
  }

  @media (min-width: 1024px) and (max-width: 1281px) {
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin: 25px;
  }
`;

const Title = styled.div`
  font-size: 60px;
  color: white;
  font-family: "Merriweather", sans-serif;
`;

const SubTitle = styled.div`
  font-size: 14px;
  padding: 0 0 5px 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #3985ac;
`;

const TitleHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0 0;
  margin: 10px 0;
  width: 100%;  
  border-bottom: ${props => props.colorBorder ? "2px solid #242943" : "2px solid #d4b36e"};
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
`;


class Header extends Component {
  render() {
    return (
      <TopWrapper>
        <ImageWrapper>
          <LogoImage src={FTLogo8} alt="FTLogo8" />
          {this.props.isSubscribed ?  <h5>Premium</h5>: ""}
        </ImageWrapper>

        <TitleHolder colorBorder={this.props.colorBorder}>
          <TitleText>
            <SubTitle>{this.props.subTitle}</SubTitle>
            <Title>{this.props.title}</Title>
          </TitleText>
        </TitleHolder>

        <BurgerWrapper>
          <PublicRoute exact path="/" component={LoginButton} />
          <PrivateRoute path="/home" component={NavBurger} />
        </BurgerWrapper>
      </TopWrapper>
    );
  }
}

export default Header;
