import React from "react";
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Chart2 from "../charts/Chart2";



const S = {}


S.Container = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 4%;
    // border: solid black 1px;
    flex-direction: column;
    align-items: center;
    height: 50vh;
    // filter: blur(${props => props.demo ? '10px' : '0px'});
    // -webkit-filter: blur(${props => props.demo ? '10px' : '0px'});
    // -moz-filter: blur(${props => props.demo ? '10px' : '0px'});

    h2 {
      font-size: 1.3rem;
    }
`

S.StyledH2 = styled.span`
    color: #00FF9D;

    ${props => 
    props.belowAverage && css`
        color: #FF5A5F;
    `}
`;

S.Legend = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function Quadrant2(props) {

  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const currentMonthIndex = date.getMonth();
  const currentMonth = months[currentMonthIndex]
  const currentYear = date.getFullYear()

  if (!props.pricingFetched && !props.isDemo) {
    return (
        <S.Container>
          <Chart2
            pricingPercentile = {props.pricingPercentile}
            listingsPerPercentile = {props.listingsPerPercentile}
          />
        </S.Container>
    );
  }

  let message;
  // If user listing proce is greater than the 50th percentile price
  if(props.listing.price > props.pricingPercentile.percentiles[4]) {
    message = <><h2>Your listing is listed <S.StyledH2>above-average</S.StyledH2> compared to others in your area.</h2></>
  } else if(props.listing.price < props.pricingPercentile.percentiles[4]) {
    message = <><h2>Your listing is listed <S.StyledH2 belowAverage>below-average</S.StyledH2> compared to others in your area.</h2></>
  } else if(props.listing.price === props.pricingPercentile.percentiles[4]) {
    message = "Your listing is listed average compared to others in your area."
  }

  console.log("LISTING.PRICE: ", props.listing.price);
  console.log("PERCENTILES: ", props.pricingPercentile.percentiles);

  return (
    <S.Container demo={props.isDemo}>
        <h1>{currentMonth} {currentYear}</h1>
        {/* <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}> */}
          <Chart2
            pricingPercentile = {props.pricingPercentile}
            listingsPerPercentile = {props.listingsPerPercentile}
          />
          {/* <S.Legend>
            asdfsdfasdfds
          </S.Legend> */}
        {/* </div> */}
        {/* <Chart3/> */}
        <h2>{message}</h2>
        {props.pricingFetched && <div>With your amenities and size of listing you could raise the Current Rate to increase your Profit Margin</div>}
    </S.Container>
  );
}


const mapStateToProps = (state) => {
    return {
      pricingPercentile: state.pricingPercentile,
      listingsPerPercentile: state.listingsPerPercentile,
      isDemo: state.isDemo,
      pricingFetched: state.pricingFetched
    }
  }

  export default connect(mapStateToProps, null)(withRouter(Quadrant2));
