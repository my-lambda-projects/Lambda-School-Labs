import React from 'react';
import styled from 'styled-components';
import img from '../../src/assets/movebyteslogo.png';
import steel from '../../src/assets/brushsteel2.jpg';
import { FaUserPlus } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaUserLock } from 'react-icons/fa';
import './pricingtable.css';

//NEW STUFF
import './CTAButton.css';
//match return button size, match signout button size
//add modal uploaded info
//fix blue button to outline, with blue styling
const LandingContainerDiv = styled.div`
  width: 100%;
  height: 73vh;
  min-height: 500px;
  margin: 0 auto;
`;
const HeaderDiv = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 390px) {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
`;
const HeaderIMG = styled.img`
  height: 100%;
  margin-left: 5%;
  max-height: 60px;
  max-width: 260px;
  // margin: 0 auto;
  @media (max-width: 768px) {
    min-width: 35%;
  }
  @media (max-width: 390px) {
    width: 80%;
    margin: 0 auto;
  }
`;

// const TitleH3 = styled.h3`
// margin: 0;
//     margin-left: 2%
//     text-align: start;
//     font-size: 3rem;
//     color: black;
//     @media (max-width: 390px) {
//       margin: 0 auto;
//       text-align: center;
//       font-size: 3rem;
//     }
// `;

const LandingCardsContainer = styled.div`
  width: 100%;
  // height: 100vh;
  // margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url(${steel});
  background-size: cover;
  height: 78%;
  @media (max-width: 390px) {
    width: 100%;
    align-items: center;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  width: 28%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const ImageDiv = styled.div`
width: 90%
padding-top: 5%;

display: flex;
justify-content: space-around;
margin: 40px auto;
height: fit-content;
@media(max-width: 1000px) {
  flex-direction: column;
}
@media(max-width: 653px) {
  flex-direction: column;
}
`;
const FreeTierDiv = styled.div`
  width: 100%;
`;
const Services = styled.div`
  width: 100%;
`;
const LineHeightH4 = styled.h4`
  line-height: 1.5;
`;

const LoginContainer = styled.div`
  width: 10%;
  min-width: 175px;
  display: flex;
  margin: 10px 5% 10px 0;
  border-radius: 10px;
  background-color: #206db5;
  @media (max-width: 460px) {
    display: none;
  }
`;

const LoginDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  min-height: 40px;
  background-color: #206db5;
  border-radius: 10px;
  @media (max-width: 390px) {
  }
`;

const MenuDiv = styled.div`
  width: 100%;
  height: 100%;
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
  border-radius: 10px;
  display: flex;
    align-items: center;
    justify-content: center;
  }
`;

//NEW STUFF
const CTA = styled.div`
  cursor: pointer;
  display: flex;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
`;
const hiddenStyle = {
  opacity: '1',
  position: 'absolute',
  // top: "0",
  // left: "0",
  // bottom: "0",
  // right:"0",
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  borderMargin: 0,
  cursor: 'pointer',
  zIndex: 1
};

const emailStyle = {
  marginTop: '.83em',
  marginRight: '5px'
};

export const LandingView = props => {
  return (
    <LandingContainerDiv>
      <HeaderDiv>
        <HeaderIMG src={img} alt='mblogo' />
        <LoginContainer>
          <LoginDiv>
            <MenuDiv onClick={props.lockOpen}>
              <LinkStyles>Log In</LinkStyles>
            </MenuDiv>
          </LoginDiv>
        </LoginContainer>
      </HeaderDiv>
      <LandingCardsContainer>
        <CTA className='play-btn'>
          <div onClick={props.lockOpen} style={hiddenStyle} />
        </CTA>
      </LandingCardsContainer>
      <ImageDiv>
        <FlexDiv>
          <MdEmail size={40} color='#206DB5' style={emailStyle} />
          <FreeTierDiv>
            <h2>Email Large Files</h2>
            <LineHeightH4>
              Send files up to 2MB to recipients. Ensure they received them with
              email confirmation, and check if they've downloaded with view and
              download tracking.{' '}
            </LineHeightH4>
          </FreeTierDiv>
        </FlexDiv>
        {/* <AwsImg src={awsimg} alt="awslogo"/> */}

        <FlexDiv>
          <FaUserPlus size={40} color='#206DB5' style={emailStyle} />
          <br />
          <Services>
            <h2>Unlock Pro Tier!</h2>
            <LineHeightH4>
              For longer download and view history upgrade to Pro Tier Service.
              Gain access to 70 day file storage and support for 4MB files!
            </LineHeightH4>
          </Services>
        </FlexDiv>

        <FlexDiv>
          <FaUserLock size={40} color='#206DB5' style={emailStyle} />
          <br />
          <Services>
            <h2>Send With Confidence</h2>
            <LineHeightH4>
              Our service partners with industry leaders such as Amazon Web
              Services, Auth0, SendGrid, and Stripe to keep your files and info
              safe.
            </LineHeightH4>
          </Services>
        </FlexDiv>
      </ImageDiv>

      <ImageDiv>
        <div className='price-table-wrapper'>
          <div className='pricing-table'>
            <h2 className='pricing-table__header'>- BASIC -</h2>
            <h3 className='pricing-table__price'>Free</h3>
            <a
              onClick={props.lockOpen}
              className='pricing-table__button'
              href='http://www.google.com'
            >
              Join Now!
            </a>
            <ul className='pricing-table__list'>
              <li>Files up to 2 megabytes</li>
              <li>50GB storage space</li>
              <li>Host files for up to 7 days</li>
              <li>24 hour support</li>
            </ul>
          </div>
          <div className='pricing-table featured-table'>
            <h2 className='pricing-table__header'>- PREMIUM -</h2>
            <h3 className='pricing-table__price'>$9.99</h3>
            <a
              target='_blank'
              className='pricing-table__button'
              href='http://www.google.com'
              rel='noopener noreferrer'
            >
              Join Now!
            </a>
            <ul className='pricing-table__list'>
              <li>Files up to 4 gigabytes</li>
              <li>100GB storage space</li>
              <li>Host files for up to 1 month</li>
              <li>24 hour support</li>
            </ul>
          </div>
        </div>
      </ImageDiv>
      <div id='cubeContainer'>
        <div id='cubeWrapper'>
          <div className='head'>
            <h1>MEET THE TEAM</h1>
          </div>
          <div id='cubes'>
            <a href='https://github.com/agreb17'>
              {' '}
              <div className='cube p2'>
                <div className='name'>
                  <h1>Anthony</h1>
                  <p>Kentucky</p>
                </div>
                <div className='innerBorder' />
                <div className='darken' />
                <div className='content' />
              </div>
            </a>
            <a href='https://github.com/ThomasKisner'>
              <div className='cube p1'>
                <div className='name'>
                  <h1>Tom</h1>
                  <p>South Carolina</p>
                </div>
                <div className='innerBorder' />
                <div className='darken' />
                <div className='content' />
              </div>
            </a>
            <a href='https://github.com/cassidyjamesw'>
              <div className='cube p3'>
                <div className='name'>
                  <h1>James Cassidy</h1>
                  <p>New York</p>
                </div>
                <div className='innerBorder' />
                <div className='darken' />
                <div className='content' />
              </div>
            </a>
            <a href='https://github.com/kkhaag'>
              <div className='cube p4'>
                <div className='name'>
                  <h1>Keith H</h1>
                  <p>California</p>
                </div>
                <div className='innerBorder' />
                <div className='darken' />
                <div className='content' />
              </div>
            </a>
            <a href='https://github.com/akshay-gadkari'>
              <div className='cube p5'>
                <div className='name'>
                  <h1>Akshay</h1>
                  <p>California</p>
                </div>
                <div className='innerBorder' />
                <div className='darken' />
                <div className='content' />
              </div>
            </a>
          </div>
          <a href='https://github.com/bummings'>
            <div className='cube p6'>
              <div className='name'>
                <h1>Edd</h1>
                <p>Philadelphia</p>
              </div>
              <div className='innerBorder' />
              <div className='darken' />
              <div className='content' />
            </div>
          </a>
          <div className='moreTeam'>
            <a href='https://lambdaschool.com/'>
              <span>Trained by Lambda</span>
              <span className='fas fa-angle-right' />
            </a>
          </div>
        </div>
      </div>
    </LandingContainerDiv>
  );
};

export default LandingView;
