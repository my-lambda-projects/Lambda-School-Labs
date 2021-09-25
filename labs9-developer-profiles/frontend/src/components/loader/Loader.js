import React from 'react'
import styled from 'styled-components';

export default function Loader() {
  return (
    <LoaderContainer>
      <i className=" loading fas fa-spinner fa-8x fa-spin"></i>
    </LoaderContainer>
  )
}

const LoaderContainer = styled.span`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .loading {
    color: var(--accent-color);
  }
`;