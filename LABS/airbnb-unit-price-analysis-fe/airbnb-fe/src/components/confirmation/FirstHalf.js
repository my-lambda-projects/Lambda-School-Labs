import React from "react";
import styled from "styled-components";
import ResultBox from "./ResultBox";

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

function FirstHalf(props) {
  return (
    <Container>
      <ResultBox />
    </Container>
  );
}

export default FirstHalf;
