import React, { useEffect } from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';

import { withRouter } from "react-router-dom";

import {getPricing, getAmenities, getComparison} from '../../store/actions';



import Quadrant1 from './Quadrant1';
import Quadrant2 from './Quadrant2';
import Quadrant3 from './Quadrant3';
import Quadrant4 from './Quadrant4';


const S = {}

S.Container = styled.div`
    width: 89%;
    margin: auto;
    margin-top: 16.5vh;
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
`

S.Cta = styled.div`
  position: absolute;
  top: 110vh;
  right: 20%;
  left: 20%;
  color: #2A2A2A;
  z-index: 10;
  text-align: center;

  @media (max-width: 960px) {
    right: 10%;
    left: 10%;
  }

  h1 {
    font-size: 1.6rem;
    background-color: white;
    border-radius: 3px;
    padding: 50px 20px;
    box-shadow: 4px 4px 8px -2px rgba(0,0,0,0.7);
    -webkit-box-shadow: 4px 4px 8px -2px rgba(0,0,0,0.7);
    -moz-box-shadow: 4px 4px 8px -2px rgba(0,0,0,0.7);

    @media (max-width: 960px) {
      font-size: 1.3rem;
    }

    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
`

function Listing2(props) {

    const stringToArr = (string) => {
        // "{"amenity", "amenity", "amenity"}" << object of amenities trapped in a string
          // into 
        // ["amenity", "amenity", "amenity"] << array of amenities
        if (!string){
          return
        }
        let noCurlies = string.replace('{','').replace('}','')
        let noCurliesArr = noCurlies.split('')
        let noQuotesOrCurliesString = noCurliesArr.filter((char) => {
            return (char !== '"')
        }).join('')
        return noQuotesOrCurliesString.split(",")
    }
    const parseIdFromUrl = (url) => {
        let urlSplit = url.split('?')
        let firstHalfArr = urlSplit[0];
        let idArr = []
        let k =  firstHalfArr.length
        for(let i = firstHalfArr.length; i <= firstHalfArr.length; i--){
            k--
            if(firstHalfArr[i] == "/"){
                break
          }
        }
        do {
            idArr.push(firstHalfArr.slice([k+2]))
            k = k+1
        }while (k <= firstHalfArr.length)

        return idArr[0]
    }

    let listing;

    if(props.isDemo) {
        listing = props.searchResult[0];
    } else {
        listing = props.location.state.listing;
    }

    listing = {
        ...listing,
        amenities: stringToArr(listing.amenities)
    }

    let comparison;
    comparison = {
      ...props.comparison,
      amenities: stringToArr(props.comparison.amenities)
    }

    useEffect(() => {
      console.log("listing amenities", listing.amenities)
      let id = parseIdFromUrl(listing.url)
        if(listing && !props.isDemo){
            props.getPricing(id)
            props.getAmenities(id)
            props.getComparison(id)
        } else if (listing && props.isDemo) {
            props.getPricing(id);
        }
    }, [props.searchResult[0] || props.location.state.listing])
    // ^ was listing


  return (
    <S.Container>
        <Quadrant1 listing = {listing} />
        <Quadrant2 listing = {listing}/>
        <Quadrant3 listing = {listing} comparison = {comparison}/>
        <Quadrant4 listing = {listing}/>
        {props.isDemo ? (
            <S.Cta>
              <h1>Create an Account to see more details</h1>
            </S.Cta>
          ) : null
        }
    </S.Container>
  );
}


const mapStateToProps = (state) => {
    return {
        searchResult: state.searchResult,
        isDemo: state.isDemo,
        comparison: state.comparison,
        // pricingFetched: state.pricingFetched,


    }
  }

  export default connect(mapStateToProps, {getPricing, getAmenities, getComparison})(withRouter(Listing2));
  
