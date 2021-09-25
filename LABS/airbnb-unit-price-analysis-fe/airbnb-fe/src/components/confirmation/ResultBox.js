import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { saveListing, clearSearchResult } from '../../store/actions';
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";



import Text from "./Text";

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 0 8px 8px -5px gray;
`;

S.Result = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

S.ImageDiv = styled.div`
  width: 52%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

S.Image = styled.img`
  width: 95%;
  height: 95%;
  background-color: #cfcfcf;
  object-fit: cover;
`;

S.ConfirmButton = styled.button`
  width: 100%;
  height: 15%;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 600;
  background: none;
  border: none;
  border-top: solid grey 1px;
  font-family: "Varela Round", sans-serif;
`;

function ResultBox(props) {

  const { user } = useAuth0();



  const saveListing1 = (e) => {
    console.log("SAVE TRIGGER")
    e.preventDefault()
    props.saveListing(props.searchResult[0], user.email)
    setTimeout(props.history.push("/dashboard"), 3000);
  }

  const redirectToListing = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: '/demo-listing',
      // state: { detail: value }
    })
  }

  const cancelListing = (e) => {
    e.preventDefault();

    if(props.isDemo) {
      props.history.push({
        pathname: '/demo-search',
      });
    } else {
      props.history.push({
        pathname: '/search'
      });
    }

    props.clearSearchResult();
  };
  
  return (
    <S.Container>
      <S.Result>
        <S.ImageDiv>
          <S.Image src = {props.searchResult[0].picture_url}/>
        </S.ImageDiv>
        <Text saveListing1 = {saveListing1} searchResult = {props.searchResult} redirectToListing = {redirectToListing} cancelListing = {cancelListing}/>
      </S.Result>
    </S.Container>
  );
}


const mapStateToProps = (state) => {
  return {
      searchResult: state.searchResult,
      listings: state.listings,
      isDemo: state.isDemo
  }
}

export default connect(mapStateToProps, {saveListing, clearSearchResult})(withRouter(ResultBox));
