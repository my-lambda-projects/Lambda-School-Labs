import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import styled from "styled-components";
import { Card } from "@blueprintjs/core";
import Header from "./Header";


const StyledMain = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) and (max-width: 1281px) {
    padding: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 0;
  }
`;

const StyledTop = styled.div`
  color: white;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  padding: 25px 150px 0 150px;
  display: flex;
  flex-direction: column;
`;

const  SignUpTop = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

// const Title = styled.h1`
//     margin: 0 0 0 0;
//     display: flex;
//     justify-content: center;
//     color: #ffffff;
//     font-size: 50px;
//     padding:0;
//     font-weight: 700;
// `;

// const BottomBorder = styled.div`
//     border-bottom: 2px solid #D4B36E;
//     height: 20px;
//     width: 100%;
// `;

const Content = styled.p `
    text-align: left;
    color: #ffffff;
    font-size: 18px;
    line-height: 1.5;
    padding: 20px 20px 0 20px;
    margin: 10px 0 30px 0;
`;

const SubTitle = styled.h3`
    margin: 0 0 10px 0;
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 25px;
    padding:0;
    font-weight: 200;
`;

const SubContent = styled.p `
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    line-height: 1.5;
    padding: 20px 20px 0 20px;
    margin: 5px 0 10px 0;
`;

const CardContainer = styled.div`
  border: 2px #242943;
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
`;

const StyledCard = styled(Card)`
  border: 2px solid #D4B36E;
  background-color: #242943;
  margin: 15px 15px 15px 15px;
  border-radius: 25px;
`;

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;


class SignUp extends Component { 

    render() {
      
      return (
      <StyledMain>

          <StyledTop>
          <Header title="Sign Up"/>
          </StyledTop>

          <StyledBottom>
          <SignUpTop>
              <Content>Family Tabs free accounts automatically offers a single parent account with up to two children. For only 9.99 a month the Premium account includes three admins and 
                unlimited amount of children accounts. Your information is always safe with us, and will never be sold to third parties under any circumstances. With Family Tabs we make it 
                easy to keep tabs on the whole family!</Content>
              <CardContainer>
              <StyledCard>
              <SubTitle>Standard Family Tabs Option</SubTitle>
              <SubContent>Enjoy two Admin accounts and two child accounts with our free standard option</SubContent>
              <StyledLink to="/verify">Sign Up for Family Tabs!</StyledLink>
              </StyledCard>
              <StyledCard>
              <SubTitle>Premium Family Tabs Option</SubTitle>
              <SubContent>Have a larger brood? Add an extra Admin account, and unlimited child accounts with our Premium option for just $9.99 a month!</SubContent>
              <StyledLink to="/verify">Sign Up for Family Tabs Premium!</StyledLink>
              </StyledCard>
              </CardContainer>
          </SignUpTop>
          </StyledBottom>
        </StyledMain>
      )
    }
  }
  
  export default SignUp;





// const BottomBorder = styled.div`
//   border-bottom: 2px solid #D4B36E;
//   height: 20px;
//   width: 100%;
//   margin: 0px 0px 50px 0px;
 

// `;
// const Title = styled.p `
//    display: flex;
 
//     color: #ffffff;
//     font-size: 16px;
//     padding-left: 5px;
//     color: #3985ac;
//     width: 20%;
//     margin: 0px 0px 10px 125px; 
  

  

// `;

// const BillingWrapper=styled.div `



// `;

// const BillingTitle = styled.div `
//     display: flex;
//     flex-direction: column;
//     align-items: center;



// `;

// const CardContainer = styled.div `
 
//     display: flex;
//     justify-content: center;
// `;



// export default class Billing extends Component {
//   render() {
//     return (
//     <BillingWrapper>
//         <BillingTitle>
//         <Title>upgrade to a premium account</Title>
//         <Title>Billing</Title>
//         <BottomBorder></BottomBorder>
//         </BillingTitle>
//       <CardContainer>
//       <BillingCard />

//       </CardContainer>
//       </BillingWrapper>
//     )
//   }
// }