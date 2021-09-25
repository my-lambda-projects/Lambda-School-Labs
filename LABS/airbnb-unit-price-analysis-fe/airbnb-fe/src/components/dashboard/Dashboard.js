import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getListing, getListings, deleteLISTING } from "../../store/actions";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";

import Header from "./Header";
import Listings from "./Listings";

export const Dashboard = props => {
  const { user } = useAuth0();

  const getListing = () => {
    props.getListings();
  };

  const getListings = email => {
    props.getListings(user.email);
  };


  return (
    <DashboardContainer>
      <Header />
      <Listings
        getListing={getListing}
        getListings={getListings}
        deleteLISTING={props.deleteLISTING}
        isFetching={props.isFetching}
        listings={props.listings}
        error={props.error}
        user={user}
      />
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 0 11%;
  margin-top: 10%;
`;

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    listings: state.listings,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getListing, getListings, deleteLISTING }
)(Dashboard);
