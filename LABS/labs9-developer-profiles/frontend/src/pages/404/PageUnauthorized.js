import React from 'react'
import styled from 'styled-components';
import { centerFlex } from '../../global-styles/Mixins';
import { ReactComponent as ReactWarning } from './warning.svg';

function PageUnauthorized() {
  return (
    <WarningContainer>
      <h1>Please log in to view this page</h1>
      <ReactWarning className="warning-svg" alt="logo" />
    </WarningContainer>
  )
}

const WarningContainer = styled.div`
  width: 100%;
  padding-top: 130px;
  ${centerFlex('column')}
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      text-align: left;
      padding-left: 50px;
      font-size: 4rem;
    }
  }
`;

export default PageUnauthorized;