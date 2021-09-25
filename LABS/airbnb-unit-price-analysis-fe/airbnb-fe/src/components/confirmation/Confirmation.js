import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';


import FirstHalf from "./FirstHalf";
import SecondHalf from "./SecondHalf";

const Container = styled.div`
  width: 75%;
  margin: auto;
  margin-top: 15%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
`;

function Confirmation(props) {
  return (
    <Container>
      <FirstHalf />
   </Container>
  );
}

const mapStateToProps = (state) => {
  return {
      isFetching: state.isFetching,
      searchResult: state.searchResult,
      error: state.error
  }
}

export default connect(mapStateToProps, {})(Confirmation);
