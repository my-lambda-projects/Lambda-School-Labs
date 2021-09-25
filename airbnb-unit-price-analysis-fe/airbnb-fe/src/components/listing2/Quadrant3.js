import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


import Loader from 'react-loader-spinner';

const LoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledLoader = styled(Loader)`
`;




const S = {}



S.Container = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    // border: solid black 1px;
    height: 45vh;
    flex-direction: column;
    align-items: center;
    margin-top: 5vh;
    margin-bottom: 5%;
    filter: blur(${props => props.demo ? '10px' : '0px'});
    -webkit-filter: blur(${props => props.demo ? '10px' : '0px'});
    -moz-filter: blur(${props => props.demo ? '10px' : '0px'});
`

S.HalvesLR = styled.div`
    display: flex;
    box-sizing: border-box;
    // border: solid red 1px;
    height: 85%;
    width: 100%;
    margin-top: 2vh;

`

S.HalfL = styled.div`
    width: 50%;
    box-sizing: border-box;
    // border: solid black 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 30px;
   
`
S.HalfR = styled(S.HalfL)`
    border-left: dotted #00A699 8px;
`


function Quadrant3(props) {


    const numberRatingToStars = (rating) => {
        if(!rating){
            return
        }
        let listingRating
        if (rating < 20){
            listingRating = "⭐"
        } else if (rating < 40){
            listingRating = "⭐⭐"
        } else if (rating < 60){
            listingRating = "⭐⭐⭐"
        } else if (rating < 80){
            listingRating = "⭐⭐⭐⭐"
        } else {
            listingRating = "⭐⭐⭐⭐⭐"
        }
        return listingRating
    }

    if (!props.comparisonFetched && !props.isDemo) {
        return (
            <S.Container>
                <LoaderContainer>
                    <StyledLoader type="TailSpin" color="grey" height={80} width={80} />
                </LoaderContainer>
            </S.Container>
        );
    }

  return (
    <S.Container demo={props.isDemo}>
        <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2>Comparison</h2>
                <div>By Area and By Property Type</div>
            </div>
            <S.HalvesLR>
                <S.HalfL>
                    <h2 style= {{width: "100%", textAlign: "center"}}>Your Lisiting</h2>
                    {/* <div>Rating: ⭐⭐⭐⭐⭐</div> */}
                    <div>{numberRatingToStars(props.listing.review_scores_rating)}</div>
                    <div>Current rate: ${props.listing.price}</div>
                    <div>Guests allowed: {props.listing.guests_included}</div>
                    <div>Beds: {props.listing.beds} 🛏</div>
                    <div>Bathrooms: {props.listing.bathrooms}</div>
                    <div>Extra amenities: {props.listing.amenities.length}</div>
                    {/* <div>Successful bookings (past month): 10</div> CANT GET THIS */}
                </S.HalfL>
                <S.HalfR>
                <h2 style= {{width: "100%", textAlign: "center"}}>Most Popular Listing</h2>
                    {/* <div>⭐⭐⭐⭐⭐</div> */}
                    <div>{numberRatingToStars(props.comparison.review_scores_rating)}</div>
                    <div>Current rate: ${props.comparison.price}</div>
                    <div>Guests allowed: {props.comparison.guests_included}</div>
                    <div>Beds: {props.comparison.beds} 🛏</div>
                    <div>Bathrooms: {props.comparison.bathrooms}</div>
                    <div>Extra amenities: {props.comparisonFetched ? (props.comparison.amenities.length) : null}</div>
                    {/* <div>Successful bookings (past month): 10</div> CANT GET THIS */}
                </S.HalfR>
            </S.HalvesLR>
    </S.Container>
  );
}


const mapStateToProps = (state) => {
    return {
      isDemo: state.isDemo,
      comparisonFetched: state.comparisonFetched
    }
  }

  export default connect(mapStateToProps, null)(withRouter(Quadrant3));
