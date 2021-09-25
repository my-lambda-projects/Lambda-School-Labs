import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import ResultBox from '../listing/ResultBox';


const S = {}

S.Container = styled.div`
    display: flex;  
    height: 25vh;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 5%;
    // border: solid black 1px;
`
    





function Quadrant1(props) {

  return (
    <S.Container>
        <ResultBox listing={props.listing}/>
        <div>
          
        </div>
    </S.Container>
  );
}


const mapStateToProps = (state) => {
    return {}
  }
  
  export default connect(mapStateToProps, null)(withRouter(Quadrant1));
  