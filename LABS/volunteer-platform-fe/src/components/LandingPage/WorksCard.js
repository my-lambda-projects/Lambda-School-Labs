import React from 'react';
import styled from 'styled-components';
import { device } from '../../styled/deviceBreakpoints';

export const WorksCard = props => {
  return (
    <StyledDiv>
      <h3>{props.title}</h3>
      <img src={props.image} />
      <p>{props.info}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  height: 350px;
  width: 300px;
  background: ${({ theme }) => theme.gray1};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;

  img {
    width: 50%;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-family: ${({ theme }) => theme.bodyText};
    font-size: 14px;
  }

  @media ${device.laptop} {
    margin: 0 10px;
  }

  @media ${device.tablet} {
    width: 80%;
    margin-bottom: 20px;
  }
`;

export default WorksCard;
