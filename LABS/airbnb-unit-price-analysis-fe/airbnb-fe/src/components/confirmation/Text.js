import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { saveListing } from '../../store/actions';
import { withRouter } from "react-router-dom";





const Container = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`
const H1 = styled.h1`
  margin: 0px;
  margin-top: 25px;
  font-size: 30px;
  font-weight: 600;
`;
const Location = styled.div`
  margin: 0px;
  font-size: 25px;
`;

const Feature = styled.div`
  margin: 18px 0px 0px;
  font-size: 20px;
  font-weight: 600;
`;

const PDetails = styled.div`
  margin: 0px;
  font-size: 18px;
  width: 45%;
  display: flex;
  justify-content: space-between;
`;

const Details = styled.div`
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-betwen;
  margin-bottom: 15px;
`

const Detail = styled.div`
  margin: 0px;
  margin-top: 10px;
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DetailP = styled(Detail)`
  margin: 0;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 11%;
  margin-bottom: 15px;
`

const Button = styled.button`
  width: 32%;
  height: 100%;
  color: #ff5a5f;
  background-color: white;
  border: none;
  font-weight: 700;
  border-radius: 7px;
`

const Button2 = styled.button`
  width: 32%;
  height: 100%;
  border: none;
  font-weight: 700;
  border-radius: 7px;
  margin-left: 10px;
  background-color: #ff5a5f;
  color: white;


`

function Text(props) {

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

  let amenities = stringToArr(props.searchResult[0].amenities)


  console.log(props.searchResult[0])
  return (
    // <Container>
    //   <H1>Miami Beach 8 guests 3 Bedroom Apartment (20)</H1>
    //   <Location>Miami Beach</Location>

    //   <Feature>Entired serviced apartment</Feature>
    //   <PDetails>
    //     <DetailP>8 guests</DetailP> <DetailP>3 bedrooms</DetailP>{" "}
    //     <DetailP>4beds</DetailP> <DetailP>2baths</DetailP>
    //   </PDetails>

    //   <Feature>Sparkling clean</Feature>
    //   <Detail>5 recent guests said this place was sparkling clean</Detail>

    //   <Feature>Self check-in</Feature>
    //   <Detail>you can check in with the doorman</Detail>
    // </Container>

    <Container>
      <H1>{props.searchResult[0].name}</H1>
      {/* <Location>{props.searchResult[0].street}</Location> */}


      <Details>
        <Detail>{props.searchResult[0].city}, {props.searchResult[0].state}</Detail>
        <Detail>{props.searchResult[0].beds} beds</Detail>
        <Detail>{amenities[0]}, {amenities[1]}, {amenities[2]}, {amenities[3]}, {amenities[4]}</Detail>
      </Details>
      <DetailP>${props.searchResult[0].price}/Night</DetailP>

      <Buttons>
        <Button onClick = {(e) => props.cancelListing(e)}>Cancel</Button>
        <Button2 onClick = {props.isDemo 
          ? (e) => props.redirectToListing(e) 
          : (e) => props.saveListing1(e)}>
            Confirm Listing
        </Button2>
      </Buttons>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
      searchResult: state.searchResult,
      listings: state.listings,
      isDemo: state.isDemo
  }
}

export default connect(mapStateToProps, {saveListing})(withRouter(Text));
