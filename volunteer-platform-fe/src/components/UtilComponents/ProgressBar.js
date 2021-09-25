import React from 'react';
import styled from 'styled-components';

export const ProgressBar = ({ percentage }) => {
  return (
      <ProgressBarStyled>
        <FillerBar percentage={percentage} />
      </ProgressBarStyled>
  );
};

const ProgressBarStyled = styled.div`
  height: 20px;
  margin: 0 auto;
  margin-bottom: 40px;
  width: 75%;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.primary8};

  h5{
      color: ${({theme}) => theme.primary8};
  }
`;

const FillerBar = styled.div`
    background: ${({ theme }) => theme.primary8}
    height: 100%;
    border-radius: inherit;
    transition: width .2s ease-in;
    width: ${({ percentage }) => `${percentage}%`}
`;

export default ProgressBar;
