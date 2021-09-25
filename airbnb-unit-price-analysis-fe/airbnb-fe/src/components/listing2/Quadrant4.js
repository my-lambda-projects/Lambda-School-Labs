import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Chart3 from '../charts/Chart3';



const S = {}

S.Container = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    // border: solid black 1px;
    flex-direction: column;
    align-items: center;
    // height: 40vh;
    filter: blur(${props => props.demo ? '10px' : '0px'});
    -webkit-filter: blur(${props => props.demo ? '10px' : '0px'});
    -moz-filter: blur(${props => props.demo ? '10px' : '0px'});
`






function Quadrant4(props) {
  return (
    <S.Container demo={props.isDemo}>
        <h1>Ratings</h1>
        <Chart3 listing = {props.listing}/>
    </S.Container>
  );
}


const mapStateToProps = (state) => {
    return {
      isDemo: state.isDemo
    }
  }

  export default connect(mapStateToProps, null)(withRouter(Quadrant4));
