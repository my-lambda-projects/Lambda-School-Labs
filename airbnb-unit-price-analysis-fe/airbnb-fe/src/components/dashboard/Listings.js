import React, { useEffect } from "react";

import Listing from "./Listing";

const Listings = props => {
  //   C A L L   B A C K E N D   A P I   H E R E
  useEffect(() => {
    if (props.user) {
      props.getListings(props.user.email);
    }
  }, [props.user]);

  return (
    <div>
      {props.isFetching && <h2>Loading...</h2>}

      {props.listings.length !== 0 &&
        props.listings.map(listing => {
          return (
            <Listing
              key={listing.id}
              listing={listing}
              deleteLISTING={props.deleteLISTING}
            />
          );
        })}

      {/* The code below is for when we're able to get multiple listings
            instead of time intervals of the same listing. */}

      {/* {props.listings.length !== 0 && props.listings.map(listing => (
                <Listing key={listing.id} listing={listing} />
            ))} */}
    </div>
  );
};

export default Listings;
