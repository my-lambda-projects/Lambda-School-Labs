import styled from "styled-components";

import { device } from "./globals.js";


export const BackgroundHolder = styled.div`
    background-color: #4B9CD3;
    width: 100%;
    max-height: 80%;
`;

export const LandingNavBar = styled.div`
    display: flex;
    justify-content: flex-end;
    z-index: 2;
    // border: pink solid;
    background-color: transparent;

    @media ${device.tablet} {
        font-size: 23px;
        min-width: 260px;
    }

    @media ${device.mobileL} {
        font-size: 21px;
        min-width: 200px;
    }
`;

export const WelcomeHolder = styled.div`
    display: flex;
`;

export const WelcomeSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    min-height: 800px;
    text-align: center;
`;

export const MainLogo = styled.img`
    width: 300px;
`;

export const WelcomeH1 = styled.div`
    font-size: 4em;
    margin-top: 45%;
    align-self: center;
    font-size: 45px;
    width: 65%;
    line-height: 50px;
`;


export const WelcomeLogo = styled.div`
    min-height: 800px;
    width: 40%;
    background-color: #13294B;    
`;

export const WelcomeText = styled.div`
    margin-top: 10%;
    font-size: 1.5em;
    align-self: center;
`;

export const ScheduleButton = styled.div`
    align-self: center;
    margin-top: 5%;

    .btn{
        align-self: center;
        background-color: #4B9CD3;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 7px;
        display: flex;
        font-size: 20px;
        font-weight: 300px;
        letter-spacing: 2px;
        position: relative;
        padding: 25px 50px;
        text-align: center;
        width: 260px;
        z-index: 5;
    }

    .btn: hover {
        background-color: #007FAE;
    }

    .btn: action {
        box-shadow: none;
        top: 6px;
    }

    @media ${device.mobileL} {
        font-size: 21px;
        min-width: 200px;
        margin-left: 97%;
    }
`;

export const NavButton = styled.div`
    margin: 5px;
    margin-left: 2px;
    background-color: transparent;

    .signup_btn{
        align-self: flex-end;
        background-color: #4B9CD3;
        border: none;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        font-weight: 20px;
        letter-spacing: 2px;
        padding: 5px 5px;
        position: relative;
        text-align: center;
        width: 100px;
        z-index: 3;
    }

    .signin_btn{
        align-self: flex-end;
        background-color: #4B9CD3;
        border: none;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        font-weight: 20px;
        letter-spacing: 2px;
        padding: 5px 5px;
        position: relative;
        text-align: center;
        width: 100px;
        z-index: 3;
    }

    .btn: hover {
        background-color: #007FAE;
    }

    .btn: action {
        box-shadow: none;
        top: 6px;
    }
`;

export const CircleDiv = styled.div`
    // display: flex;
    // justify-content: center;
    // margin-left: 0%;
    // top: -200px;
    // transistion: 2s;
    // width: 20%;
    // border-width: 2px;
    // border: red solid;

    z-index: 0;
    position: absolute;
    height: 800px;
    margin: 0 auto;
    padding: 0;
    position: relative;
    overflow: hidden;
    text-align: center;
    
    @media ${device.tablet} {
        display: none;
    }

    @media ${device.mobileL} {
        display: none;
    }

`;

export const Circles = styled.div`
    -webkit-animation: scroll 40s infinite;
    -moz-animation: scroll 40s infinite;
    -ms-animation: scroll 40s infinite;
`;

export const CircleImg = styled.img`
    max-width: 100%;
    max-height: 800px;
    margin: 0 auto;
    padding: 200px 0;
    display: block;
    // border: red solid;
`;

/////////landing Details////////////

export const TopContainer = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 200px;
    padding-top: 100px;
`;

export const FontTitle = styled.h1`
  font-family: "PT Sans", sans-serif;
  font-size: 2.7em;
  font-weight: 100;
  color: #767676;
}
`;

export const MidContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const TextBox = styled.div`
    display: flex;
    width: 300px;
    height: 350px;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    padding-top: 70px;
    margin: 5% 15px;
    font-family: "PT Sans", sans-serif;
    text-align: center;
    font-size: 1.2em;
    line-height: 1.5em;
    color: #767676;
`;

export const TitleText = styled.h2`
    font-family: "PT Sans", sans-serif;
    color: #4b9cd3;
    padding: 0 15px; 
`;

export const InnerText = styled.h6`
    align - self: center;
    margin - bottom: 25 px;
`;

export const FontTitle2 = styled.h6`
    font-family: "Josefin Slab", serif;
`;


/////////Landing Learnc////////////

export const Frame1TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "PT Sans", sans-serif;
    font-size: 1.5em;
    padding: 50px;
    text-align: center;
`;

export const FrameHeading = styled.h2`
    font-family: "PT Sans", sans-serif;
    color: #767676;
    font-size: 1.8em;
    font-weight: 100;
`;

export const FrameText = styled.p`
    margin-top: 10px;
    color: #767676;
    width: 900px;
    align-self: center;
    font-size: 0.9em;
    line-height: 1.5em;
`;

export const FrameContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   text-align: center;
`;

export const Frame1 = styled.p`
   width: 100%;
  /* height: 90%; */
`;

export const Frame2 = styled.div`
   font-family: "PT Sans", sans-serif;
   font-weight: 100;
   margin-top: -500px;
   color: #e6e6e6;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-bottom: 340px;
`;

export const Frame2Heading = styled.h2`
   font-family: "PT Sans", sans-serif;
   font-size: 2.8em;
   font-weight: 100;
   color: #fff;
`;
 
export const CtaButton = styled.div`
    margin-top: 35 px;
    border:solid# fff;
    border-width: 2 px;
    align-self: center;
    width: 300 px;
    font-size: 2 em;
    padding:5px 20px;
    color: #fff;
`;



/////////Landing Footer////////////

export const FooterStyles = styled.div`
    display: flex;
    background-color: #4B9CD3;
    justify-content: center;
    flex-direction: row;
    z-index: 5;
`;

export const LandingFoot = styled.footer`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

export const Copyright = styled.span`
    margin-top: 17px;
    margin-right: 20px;
`;

export const LandingLogo = styled.div`
   margin-top: 10px;
   margin-bottom: 10px;
   margin-right: 20px;
`;