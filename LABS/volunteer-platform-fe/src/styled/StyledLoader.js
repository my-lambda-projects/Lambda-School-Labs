import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLoader = () => {
  return (
    <LoaderContainer>
      <Loader type="ThreeDots" color="#00000022" />
    </LoaderContainer>
  );
};
