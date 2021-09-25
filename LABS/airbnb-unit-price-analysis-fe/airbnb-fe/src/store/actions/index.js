import axios from "axios";

export const FETCH_LISTING_START = "FETCH_LISTING_START";
export const FETCH_LISTING_SUCCESS = "FETCH_LISTING_SUCCESS";
export const FETCH_LISTING_FAILURE = "FETCH_LISTING_FAILURE";

export const SIMULATION_API_CALL = "SIMULATION_API_CALL";
export const SET_SEARCH_MODE = "SET_SEARCH_MODE";
export const SET_DEMO_MODE = "SET_DEMO_MODE";

export const GET_LISTINGS_START = "GET_LISTINGS_START";
export const GET_LISTINGS_FAILURE = "GET_LISTINGS_FAILURE";
export const GET_LISTINGS_SUCCESS = "GET_LISTINGS_SUCCESS";

export const FETCH_PRICING_START = "FETCH_PRICING_START";
export const FETCH_PRICING_FAILURE = "FETCH_PRICING_FAILURE";
export const FETCH_PRICING_SUCCESS = "FETCH_PRICING_SUCCESS";

export const FETCH_AMENITIES_START = "FETCH_AMENITIES_START";
export const FETCH_AMENITIES_FAILURE = "FETCH_AMENITIES_FAILURE";
export const FETCH_AMENITIES_SUCCESS = "FETCH_AMENITIES_SUCCESS";

export const FETCH_COMPARISON_START = "FETCH_COMPARISON_START";
export const FETCH_COMPARISON_FAILURE = "FETCH_COMPARISON_FAILURE";
export const FETCH_COMPARISON_SUCCESS = "FETCH_COMPARISON_SUCCESS";

export const CLEAR_SEARCH_RESULT = "CLEAR_SEARCH_RESULT";

let local = false;
let cors = "https://cors-anywhere.herokuapp.com/";

//+++++++++++++++++++++++++++++++++++++++++++
//  F O R   D E V E L O P M E N T  O N L Y
//*******************************************
// local = true; //<- comment out for deploy
// cors = "";    //<- comment out for deploy
//+++++++++++++++++++++++++++++++++++++++++++

let url;
if (local) {
  url = "http://localhost:8000/";
} else {
  url = "https://pricemyairbnb.herokuapp.com/";
}




export const getListing = id => dispatch => {
  // const id = 10280848;
  // const id = 20685563;

  dispatch({ type: FETCH_LISTING_START });
  axios
    .get(
      // `https://cors-anywhere.herokuapp.com/http://LabsAirbnb-env-dev.us-west-1.elasticbeanstalk.com/data?id=${id}`
      `${cors}http://LabsAirbnb-env-dev.us-west-1.elasticbeanstalk.com/data?id=${id}`
    )
    .then(response => {
      console.log(response);
      dispatch({ type: FETCH_LISTING_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: FETCH_LISTING_FAILURE, payload: error });
    });
};


export const getPricing = id => dispatch => {
  dispatch({ type: FETCH_PRICING_START });
  axios
    .get(
      // `https://cors-anywhere.herokuapp.com/http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/percentiles?id=${id}&filter=z`
      `${cors}http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/percentiles?id=${id}&filter=z`
    )
    .then(response => {
      console.log(response.data);
      dispatch({ type: FETCH_PRICING_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: FETCH_PRICING_FAILURE, payload: error });
    });
}

;
export const getAmenities = id => dispatch => {
  dispatch({ type: FETCH_AMENITIES_START });
  axios
    .get(
      // `https://cors-anywhere.herokuapp.com/http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/amenities?id=${id}`
      `${cors}http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/amenities?id=${id}`
    )
    .then(response => {
      console.log(response.data);
      dispatch({ type: FETCH_AMENITIES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: FETCH_AMENITIES_FAILURE, payload: error });
    });
};

export const getComparison = id => dispatch => {
  dispatch({ type: FETCH_COMPARISON_START });
  axios
    .get(
      // `https://cors-anywhere.herokuapp.com/http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/comparison?id=${id}&feature=property_type`
      `${cors}http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/comparison?id=${id}&feature=property_type`
    )
    .then(response => {
      console.log(response.data);
      dispatch({ type: FETCH_COMPARISON_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: FETCH_COMPARISON_FAILURE, payload: error });
    });
};

export const clearSearchResult = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH_RESULT });
};

export const saveListing = (listing, email) => dispatch => {
  axios
    .post(`${url}api/listings/save`, { ...listing, user_email: email })
    .then(resp => {
      console.log(resp);
      dispatch({ type: SIMULATION_API_CALL, payload: resp.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getListings = email => dispatch => {
  dispatch({ type: GET_LISTINGS_START });

  axios
    .post(`${url}api/listings/retrieve`, { user_email: email })
    .then(resp => {
      console.log(resp);
      dispatch({ type: GET_LISTINGS_SUCCESS, payload: resp.data });
    })
    .catch(err => {
      dispatch({ type: GET_LISTINGS_FAILURE, payload: err });
      console.log(err);
    });
};

export const setSearchMode = bool => dispatch => {
  dispatch({ type: SET_SEARCH_MODE, payload: bool });
};

export const setDemo = bool => dispatch => {
  dispatch({ type: SET_DEMO_MODE, payload: bool });
};


export const DELETE_LISTING_START = "DELETE_LISTING_START";
export const DELETE_LISTING_SUCCESS = "DELETE_LISTING_SUCCESS";
export const DELETE_LISTING_FAILURE = "DELETE_LISTING_FAILURE";

export const deleteLISTING = id => dispatch => {
  axios
    .delete(`${url}api/listings/${id}`, id)

    .then(res => {
      dispatch({ type: DELETE_LISTING_SUCCESS, payload: res.data });
      console.log(res.data);
    })

    .catch(err => {
      console.log(err.response);
      dispatch({ type: DELETE_LISTING_FAILURE });
    });
  console.log(id);
};

export const UPDATE_LISTING_START = "UPDATE_LISTING_START";
export const UPDATE_LISTING_SUCCESS = "UPDATE_LISTING_SUCCESS";
export const UPDATE_LISTING_FAILURE = "UPDATE_LISTING_FAIL";

export const updateLISTING = updatedListing => dispatch => {
  axios
    .put((`${url}/api/listings/:id`, updatedListing))

    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_LISTING_SUCCESS, payload: res.data });
    })

    .catch(err => {
      console.log(err.response);
      dispatch({ type: UPDATE_LISTING_FAILURE, payload: err.response });
    });
};
