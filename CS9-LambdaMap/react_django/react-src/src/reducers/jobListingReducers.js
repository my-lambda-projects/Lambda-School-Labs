// The reducers for Job Listings

import * as actions from "../actions/actionTypes";

const initialState = {
  job_listings: [],
  job_listing: {},
  fetchingListings: false,
  creatingListing: false,
  error: null
};

const jobListing = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_LISTINGS:
      return Object.assign({}, state, {
        fetchingListings: true
      });

    case actions.FETCHED_LISTINGS:
      return Object.assign({}, state, {
        job_listings: [...action.payload],
        fetchingListings: false,
        error: null
      });

    case actions.CREATE_LISTING:
      return Object.assign({}, state, {
        creatingListing: true
      });

    case actions.CREATED_LISTING:
      return Object.assign({}, state, {
        job_listing: [...action.payload],
        creatingListing: false,
        error: null
      });

    case actions.DELETE_LISTING:
      return Object.assign({}, state, {
        deletingListing: true
      });

    case actions.DELETED_LISTING:
      return Object.assign({}, state, {
        job_listing: [...action.payload],
        deletingListing: false,
        error: null
      });

    case actions.ERROR_FETCHING:
      return Object.assign({}, state, {
        error: action.payload
      });

    case actions.ERROR_DELETING:
      return Object.assign({}, state, {
        error: action.payload
      });

    case actions.ERROR_CREATINGJOB:
      return Object.assign({}, state, {
        error: action.payload
      });

    default:
      return state;
  }
};

export default jobListing;
