import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import styled from "styled-components";

const StyledMain = styled.div `

max-width: 100%;
    background-color: #242943;
   

  @media (min-width: 1024px) and (max-width: 1281px) {
    max-width: 100%;
   

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 100%;
    
 

  }
  }

  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
  }
`

const Content = styled.div `
background: #242943;
display: flex;
justify-content: space-evenly;

margin-top: 90px;
padding: 30px;
@media (min-width: 768px) and (max-width: 1024px) {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 20px;
    
  }

  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 20px;

  }
`;




const StyledCard = styled.div `
    width: 500px;
    background: #242943;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border: 2px solid #d4b36e;
    padding: 20px 20px 30px 20px;
    margin: px 0 0 0 0;
    h2 {
      font-family: "Merriweather", sans-serif;
      font-size: 22px;
      color: white;
      margin: 30px 0 20px;
      line-height:1.5;
    }
    p{
      font-size:18px;
      color:white;
      margin:15px 25px;;
      line-height:1.5;
      text-align:left;
    }
    
    @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 20px;

  }

`;


const BulletPoints = styled.div `
    margin: 0px 0px 20px 40px;


`;
const LinkContainer = styled.div `
display: flex;
justify-content: center;


`;
const StyledLink = styled(Link)`
  
  border: 2px solid white;
  width: 250px;
  height: 50px;
  padding-top: 15px;
  align-content: center;
  color: #ffffff;
  :hover {
    text-decoration: none;
    border-color: #3985ac;
    color: #3985ac;
  }
`;


const StyledTitle = styled.h1 `
    
    margin: 0 0 0 0;
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 60px;
    padding:0;
    font-weight: 500;
    padding-top: 30px;
`;


class StyledSignUp extends Component { 

    render() {
      
      return (
      <StyledMain>
        <StyledTitle>Get Started With Family Tabs!</StyledTitle>
        <Content>
        <StyledCard>
        <h2>FAMILY TABS PREMIUM</h2>
        <p>
              For only $9.99 a month, the premium account upgrades your experience, and includes:
        </p>
        <BulletPoints>
              <p> - Three admin accounts</p> 
               <p>- Unlimited amount of child accounts.</p>
         </BulletPoints>
         <p>
              With Family Tabs Premium, it's even easier to keep tabs on the
              whole family!
        </p>
        <LinkContainer>
        <StyledLink to="/verify">Sign Up for Family Tabs Premium!
        </StyledLink>
        </LinkContainer>
        </StyledCard>
        <StyledCard>
        <h2>FAMILY TABS STANDARD</h2>
        <p>
              The standard free account lets you experience the full range of Family Tabs features. It includes:
        </p>
        <BulletPoints>
              <p> - Two admin accounts</p> 
               <p>- Two child accounts.</p>
         </BulletPoints>
         <p>
              Get started today, and keep tabs on the
              whole family!
        </p>
        <LinkContainer>
        <StyledLink to="/verify">Sign Up for Family Tabs!</StyledLink>
        </LinkContainer>
        </StyledCard>
        </Content>
        </StyledMain>

      )
    }
  }
  
  export default StyledSignUp;