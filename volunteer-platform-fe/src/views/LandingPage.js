import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';
import { message, Icon } from 'antd';

import {
  HowItWorks,
  TopVolunteers,
  TopNonProfits,
} from '../components/LandingPage';
import { device } from '../styled/deviceBreakpoints';
import { useStateValue } from '../hooks/useStateValue';
import { stateConversion } from '../utility/stateConversion';
import heroImage from '../assets/hero_image4.png';
import { setUserSearch } from '../actions';

export const LandingPage = props => {
  const [{ auth }, dispatch] = useStateValue();

  const [location, setLocation] = useState('');

  // just under the top header
  message.config({ top: 72 });

  const handleClick = e => {
    setUserSearch(location, dispatch);
    props.history.push('/dashboard');
  };

  useEffect(() => {
    axios
      .get(`https://geoip-db.com/json/${process.env.REACT_APP_ipinfoKey}`)
      .then(res => {
        let stateAbbrev = Object.keys(stateConversion).find(
          key => stateConversion[key] === res.data.state
        );
        let userCity = res.data.city;
        if (stateAbbrev) {
          setLocation(`${userCity}, ${stateAbbrev}`);
        } else {
          message.warning(
            'Unable to get your location. Please enter your state below.'
          );
        }
      })
      .catch(err => {
        console.log('Error detecting location');
        message.warning(
          'Unable to get your location. Please enter your state below.'
        );
      });
  }, []);

  return (
    <>
      <StyledHeroDiv image={heroImage} collapsed={props.collapsed}>
        <HeroContent collapsed={props.collapsed}>
          <p>
            Compete with friends, meet new ones, give back to the community.
          </p>
          <p style={{ marginBottom: '80px', marginTop: '20px' }}>Win-win.</p>
          <div className="google-autocomplete">
            <Autocomplete
              className="search"
              onPlaceSelected={place => {
                setLocation(place.formatted_address);
              }}
              types={['(regions)']}
              componentRestrictions={{ country: 'us' }}
              defaultValue={location}
            />
            <div className="get-started-btn" onClick={e => handleClick(e)}>
              <Icon type="search" />
            </div>
          </div>
        </HeroContent>
      </StyledHeroDiv>
      <ContentDiv collapsed={props.collapsed}>
        <HowItWorks />
        <TopVolunteers />
        <TopNonProfits />
      </ContentDiv>
    </>
  );
};

export default LandingPage;

const StyledHeroDiv = styled.div`
  height: 50vh;
  width: ${({ loggedIn }) => loggedIn && '100vw'};
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 75%;
    filter: brightness(90%);
    @media ${device.tablet} {
      background-position: 50% 50%;
    }
  }
`;

const HeroContent = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  z-index: 10;
  padding-left: ${({ loggedIn }) => loggedIn && '15rem'};

  @media ${device.laptop} {
  }

  @media ${device.tablet} {
  }

  & h1,
  p {
    color: white;
    margin: 0;
    font-size: 24px;
    padding: 0 20px;
  }

  .google-autocomplete {
    display: flex;
    justify-content: space-between;
    width: 450px;
    max-width: 90%;
    margin: 0 auto;
    height: 55px;

    .search {
      color: black;
      border: 0;
      font-family: ${({ theme }) => theme.bodytext};
      border-radius: 4px 0 0 4px;
      padding-left: 15px;
      font-size: 20px;
      width: 80%;
    }

    .get-started-btn {
      width: 20%;
      border-radius: 0 4px 4px 0;
      background: ${({ theme }) => theme.accent};
      cursor: pointer;
      display: flex;
      justify-content: space-around;
      font-size: 20px;
      align-items: center;

      &:hover {
        background: ${({ theme }) => theme.accent7};
      }

      .anticon {
        font-size: 35px;
      }
    }
  }
`;

const ContentDiv = styled.div`
  && {
    padding-bottom: ${props => props.theme.footerPadding};
    background: ${({ theme }) => theme.gray2};
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 15px auto 45px;
    display: flex;
    flex-direction: column;
    width: 100%;

    @media ${device.laptop} {
      max-width: 90%;
    }
  }
`;
