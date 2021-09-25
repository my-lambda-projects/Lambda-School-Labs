import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner';

import { connect } from 'react-redux';
import { getListing, getListings } from '../../store/actions/index';

import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";


const S = {};

S.Container = styled.div`
  box-sizing: border-box;
  border: solid 1px #EBEBEB;
  border-radius: 5px
  width: 30%;
  height: 60%;
  justify-content: space-between;
  display: flex;
`;

S.Icon = styled.div`
  // border: solid grey 1px;
  box-sizing: border-box;
  height: 100%;
  width: 8%;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  svg {
      height: 15px;
      width: 15px;
  }
`;

S.Form = styled.form`
  display: flex;
  width: 90%;
`;

S.Input = styled.input`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: 0;
  padding-left: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  outline: none;
  display: flex;
  align-items: center;
`;

S.Button = styled.button`
    border: 0;
    box-sizing: border-box;
    height: 100%;
    background-color: #00A699;
    width: 40px;
    color: white;
    display: flex;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
`


S.StyledLoader = styled(Loader)`
  margin-top: 200px;
`;

export function SearchBarNav(props){

    const [url, setUrl] = useState("")
    const { user } = useAuth0();


    useEffect(() => {
        console.log("useEffect trigger")
        console.log("searchResult length", props.searchResult.length)

        let demo = "";
        if (props.isDemo){
            demo = "demo-"
        }
        if(user){
            props.getListings(user.email)
        }
        if(props.searchResult.length > 0){
            console.log("conditional trigger")
            props.history.push(`/${demo}confirmation`);
        }
    }, [props.searchResult.length, props.listings.length, user, props.isSearchMode, props.isDemo])

    // const parseIdFromUrl = (url) => {
    //     // https://www.airbnb.com/rooms/plus/14071876?source_impression_id=p3_1570169163_0UseAOfbkQEhOoG3
    //     let urlSplit = url.split('?')
    //     let firstHalfArr = urlSplit[0].split("");
    //     let idArr = []
    //     // need to get last 8 characters of urlSplit[0]
    //     for(let i = 0; i < 8; i++){
    //       idArr.push(firstHalfArr.pop())
    //     }
    //     let idArrReverse = idArr.reverse()
    //     let idString = idArrReverse.join("")

    //     return idString
    // }

    const parseIdFromUrl = (url) => {
        let urlSplit = url.split('?')
        let firstHalfArr = urlSplit[0];
        let idArr = []
        let k =  firstHalfArr.length
        
        // need to get last 8 characters of urlSplit[0]
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

    const handleSubmit = (e) => {
        e.preventDefault()
        let id = parseIdFromUrl(url);
        props.getListing(id)
    }

    const fillTestUrl = (e) => {
        e.preventDefault()
        setUrl("https://www.airbnb.com/rooms/20685563?source_impression_id=p3_1569467509_yL2ofzzD2Oz5DDIi");
    }



    return(
        <>
        { !props.isFetching
            && <S.Container>
                <S.Icon
                    onClick = {(e) => fillTestUrl(e)}
                >
                    <svg viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.54754 0C11.7243 0 15.1195 3.525 15.1195 7.825C15.1195 9.65 14.5089 11.3 13.5074 12.65L20.6886 20.1C21.1038 20.55 21.1038 21.25 20.6886 21.675C20.4687 21.9 20.2001 22 19.9314 22C19.6383 22 19.3696 21.9 19.1498 21.675L11.9686 14.225C10.7229 15.15 9.20849 15.675 7.57197 15.675C3.39517 15.675 0 12.15 0 7.85C0 3.55 3.37075 0 7.54754 0ZM7.54754 13.7C10.6496 13.7 13.1655 11.075 13.1655 7.85C13.1655 4.625 10.6496 2 7.54754 2C4.44548 2 1.92963 4.625 1.92963 7.85C1.92963 11.075 4.44548 13.7 7.54754 13.7Z" fill="#767676"/>
                    </svg>
                </S.Icon>
                <S.Form
                    onSubmit = {(e) => handleSubmit(e)}
                >
                    <S.Input
                        placeholder = "Enter Airbnb URL."
                        name = "url"
                        value = {url}
                        onChange = {(e) => {setUrl(e.target.value)}}
                    />
                    <S.Button>
                        <div>+</div>
                    </S.Button>
                </S.Form>
            </S.Container>
        }
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.isFetching,
        searchResult: state.searchResult,
        listings: state.listings,
        isSearchMode: state.isSearchMode,
        isDemo: state.isDemo
    }
}

export default connect(mapStateToProps, { getListing, getListings })(withRouter(SearchBarNav));
