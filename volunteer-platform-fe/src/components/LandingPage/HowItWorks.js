import React from 'react';
import styled from 'styled-components';
import { WorksCard as Card } from './WorksCard';
import { Icon } from 'antd';
import directions from '../../assets/directions.svg';
import searching from '../../assets/searching.svg';
import selfie from '../../assets/selfie.svg';
import { device } from '../../styled/deviceBreakpoints';

export const HowItWorks = () => {
  return (
    <StyledDiv>
      <h2>How it Works</h2>
      <div className="how-it-works-cards">
        <Card
          title="Find a Volunteer Event"
          image={searching}
          info="Search by key terms, interests, cause areas, location -- and more! Sign up, compete with friends, do more good in the world."
        />
        <StyledIcon type="right" />
        <Card
          title="Sign Up for Event"
          image={directions}
          info="Once you find what you want to do, sign ups are made simple -- expectations are communicated on the sign up. All you need is an account and we will guide you the rest of the way!"
        />
        <StyledIcon type="right" />
        <Card
          title="Show up, Have fun, Compete"
          image={selfie}
          info="When you have found an event, you can set reminders, and invite friends to join or compete on most hours earned. "
        />
      </div>
    </StyledDiv>
  );
};

const StyledIcon = styled(Icon)`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  width: 100%;
  h2 {
    font-size: 24px;
    color: ${({ theme }) => theme.primary8};
    margin-bottom: 25px;

    @media ${device.tablet} {
      text-align: center;
    }
  }

  .how-it-works-cards {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${device.laptop} {
      i {
        display: none;
      }
    }
    @media ${device.tablet} {
      flex-direction: column;
    }
  }
`;
export default HowItWorks;
