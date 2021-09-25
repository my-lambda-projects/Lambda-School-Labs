import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
// import { deleteLISTING } from "../../store/actions";

const Listing = ({ listing, history, deleteLISTING }) => {
  const redirectToCalendar = e => {
    e.preventDefault();
    history.push({
      pathname: "/listing",
      state: { listing: listing }
    });
  };

  return (
    <ListingCard>
      <Picture src={listing.picture_url} alt="#" />
      <ListingDetails>

        <DeleteButton
          onClick={id => {
            deleteLISTING(listing.id);
          }}
        >
          <span>X</span>
        </DeleteButton>
        <h2>{listing.name}</h2>
        <Location>{listing.street}</Location>
        <p>
          {listing.guests_included} Guests • {listing.bedrooms} Bedrooms •{" "}
          {listing.beds} Beds • {listing.bathrooms} Baths{" "}
        </p>
        <div>
          <ViewMore onClick={e => redirectToCalendar(e)}>View More</ViewMore>
        </div>
      </ListingDetails>
    </ListingCard>
  );
};

const DeleteButton = styled.div`
  color: black;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 50%;
  font-size: 0.7rem;
  // padding: 3px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListingCard = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  padding: 6px 10px 6px 6px;
  display: flex;
  margin-bottom: 25px;
`;

const Picture = styled.img`
  height: 175px;
  border-radius: 3px;
  margin-right: 20px;
`;

const ListingDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 100%;

  h2 {
    margin: 0;
  }

  div {
    align-self: flex-end;
    dispaly: flex;
    height: 100%;
    align-items: flex-end;
  }
`;

const Location = styled.p`
  margin-top: 9px;
  font-size: 0.85rem;
`;

const ViewMore = styled.h4`
  color: #00bfa5;
  margin: 0;
  justify-self: flex-end;
  align-self: flex-end;
  cursor: pointer;
`;

export default withRouter(Listing);
