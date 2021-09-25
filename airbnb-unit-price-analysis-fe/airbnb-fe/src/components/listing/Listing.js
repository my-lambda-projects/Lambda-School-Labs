import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import ResultBox from './ResultBox';
import MessageBox from "./MessageBox";
import Calendar from "../calendar/Calendar";
import DayInfo from "./DayInfo";

const S = {}

S.Container = styled.div`
    width: 89%;
    margin: auto;
    margin-top: 16.5vh;
    height: 110vh;
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
`

S.Top = styled.div`
    display: flex;  
    height: 25%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`

S.Bottom = styled.div`
    display: flex;
    margin-top: 5vh;
    height: 59vh;
    justify-content: space-between;
    box-sizing: border-box;
`

S.CalendarContainer = styled.div`
    width: 59%;
    height: 100%;
    box-sizing: border-box;
`

S.H1 = styled.div`
    font-size: 36px;
    line-height: 1;
    font-weight: 900;
`
S.MonthAndButtons = styled.div`
    width: 100%;
    height: 6%
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    box-sizing: border-box;
`
S.Buttons = styled.div`
    width: 13%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
`
S.Button = styled.button`
    width: 50%;
    border: solid grey 1px;
    background: none;
    text-align: center;
`


function Listing(props) {
    let listing;

    //*********************
    // For integrated use: 
    
    if(props.isDemo) {
        listing = props.searchResult[0];
    } else {
        listing = props.location.state.listing;
    }

    //*********************



    //*********************
    // For development use: 

    // listing = {
    //     picture_url: "https://i.pinimg.com/originals/58/d4/60/58d46000c24f232f1bf4da352332c46a.jpg",
    //     name: "Lofty House in Lytle Creek",
    //     city: "Fontana",
    //     room_type: "Apartment",
    //     guests_included: 5,
    //     bedrooms: 3,
    //     beds: 8,
    //     bathrooms: 3
    // }

    //*********************


  return (
    <S.Container>
        <S.Top>
            <ResultBox listing={listing}/>
            <MessageBox listing={listing}/>
        </S.Top>
        <S.Bottom>
            <S.CalendarContainer>
                <S.MonthAndButtons>
                    <S.H1>{props.isDemo ? 'September 2019' : 'October 2019'}</S.H1>
                    <S.Buttons>
                        <S.Button>&lt;</S.Button>
                        <S.Button>&gt;</S.Button>
                    </S.Buttons>
                </S.MonthAndButtons>
                <Calendar />
            </S.CalendarContainer>
            <DayInfo />
        </S.Bottom>
    </S.Container>
  );
}


const mapStateToProps = (state) => {
    return {
        searchResult: state.searchResult,
        isDemo: state.isDemo
    }
  }
  
  export default connect(mapStateToProps, null)(withRouter(Listing));
  