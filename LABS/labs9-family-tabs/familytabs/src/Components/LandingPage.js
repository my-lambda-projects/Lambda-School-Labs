import React, { Component } from 'react';
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";
import Header from "./Header.js"


const StyledTop = styled.div`
  color: white;
  margin: 0 0 25px 0;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`

`;
const MainContainer = styled.div`

`;

const MainElements = styled.div`
    display: flex;
    justify-content: space-between;
    opacity: 100%;
    color: #242943;
    font-family:'Roboto', sans-serif; 
    margin: 0 150px 0 150px;

`;

const LeftLanding = styled.div`
    display: flex ; 
    flex-direction: column;
    width: 35%;
    margin: 15px;
    color: #ffffff;
`;

const Title = styled.h1`
    margin: 0 0 0 0;
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 92px;
    padding:0;
    font-weight: 700;
`;

const BottomBorder = styled.div`
    border-bottom: 2px solid #D4B36E;
    height: 20px;
    width: 100%;
`;

const RightLanding = styled.div`
    display: flex;
    width: 65%;
    margin: 15px;
`;

const CarouselDiv = styled.div`
    @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
    display: flex;
    margin: 50px 20px 0px 0px;
`;

const StartContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;

    @media (max-width: 768px) {
    justify-content: center;
    margin-left: 100px;
  }
`;

const Content = styled.p `
    text-align: left;
    color: #ffffff;
    font-size: 18px;
    line-height: 1.5;
    padding: 15px 15px 0 15px;
    margin: 30px 0 0 0;
`;

const TitleContent = styled.p `
    display: flex;
    justify-content: flex;
    color: #ffffff;
    font-size: 16px;
    margin: 30px 0px 10px 20px;
    padding-right: 15px;
    color: #3985ac;

    @media (max-width: 768px) {
    display: none;
  }
`;

const GoButton = styled.button `
    color: white;
    background: #242943;
    border: 2px solid #ffffff; 
    padding: 15px 50px 15px 50px;
    margin: 5px 0 0 0;
    width: 250px; 
    height: 50px;
    margin-right: 5px;
    :hover {
    border-color: #3985ac;
    color: #3985ac;
    cursor: pointer;
    }
`;



class LandingPage extends Component { 
  componentDidMount(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('scopes')
  }

  signUpLink = () => {
    this.props.history.push('/signup');
  }

    render() {
      return (
        <MainContainer>
          <StyledTop>
            <Header colorBorder="colorBorder"/>
          </StyledTop>
          <StyledBottom>
          <MainElements>
              <LeftLanding>
                <TitleContent>keep tabs on the whole family with</TitleContent>
                <Title>Family Tabs</Title>
                <BottomBorder></BottomBorder>
                  <Content>
                  - KEEP TRACK OF YOUR CHILDREN'S EVENTS! 
                  </Content>
                  <Content>
                  - NEVER MISS ANOTHER GAME! 
                  </Content>
                  <Content>
                  - PUT THE KIDS IN CONTROL!
                  </Content>
                <StartContainer>
                <ButtonContainer>
                    <GoButton onClick={this.signUpLink}>GET STARTED!</GoButton>
                </ButtonContainer>
              </StartContainer>
              </LeftLanding>

              <RightLanding>
                <CarouselDiv>
                   <InfoCarousel />
                </CarouselDiv>
              </RightLanding>
          </MainElements>
          </StyledBottom>
        </MainContainer>
      )
    }
  }
  
  export default LandingPage;