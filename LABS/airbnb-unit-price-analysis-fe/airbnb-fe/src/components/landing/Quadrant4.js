import React from "react";
import styled from "styled-components";
import device from "../../devices";

import Caroucell from './Caroucell';

const Q4div = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ECF9F8;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.mobile} {
    height: 70vh;
  }
`;

function Quadrant4() {
  return (
    <Q4div>
      <Caroucell />
    </Q4div>
  );
}

export default Quadrant4;
