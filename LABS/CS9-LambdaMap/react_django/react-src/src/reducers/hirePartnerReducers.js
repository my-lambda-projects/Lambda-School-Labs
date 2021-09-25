// The reducers for Hiring Partners

import * as actions from "../actions/actionTypes";

const initialState = {
  hiring_partners: [],
  hp_favorites: [],
  HP: {},
  updatedEndDate: {},
  fetchingSubscribe: false,
  fetchingHPfavs: false,
  fetchingHPs: false,
  fetchingHP: false,
  // updating: false,
  registering: false,
  loggingIn: false,
  signout: false,
  error: null
};

const hirePartner = (state = initialState, action) => {
  switch (action.type) {
    // Fetching all hiring partners
    case actions.FETCH_HPS:
      return Object.assign({}, state, {
        fetchingHPs: true
      });

    case actions.FETCHED_HPS:
      return Object.assign({}, state, {
        hiring_partners: [...action.payload],
        fetchingHPs: false,
        error: null
      });

    // Logging in Clients
    case actions.LOGIN:
      return Object.assign({}, state, {
        loggingIn: true
      });

    case actions.LOGGEDIN_HPS:
      return Object.assign({}, state, {
        user: action.payload,
        loggingIn: false,
        error: null
      });

    case actions.FETCH_HPFAVORITES:
      return Object.assign({}, state, {
        fetchingHPFavs: true
      });

    case actions.FETCHED_HPFAVORITES:
      return Object.assign({}, state, {
        hp_favorites: [...action.payload],
        fetchingHPFavs: false,
        error: null
      });

      case actions.FETCH_SUBSCRIBE:
      return Object.assign({}, state, {
        fetchingSubscribe: true,
        error: null
      });

    case actions.FETCHED_SUBSCRIBE:
      return Object.assign({}, state, {
        updatedEndDate:action.response.data,
        fetchingSubscribe: false,
        error: null
      });

    case actions.FETCH_HP:
      return Object.assign({}, state, {
        fetchingHp: true
      });

    case actions.FETCHED_HP:
      return Object.assign({}, state, {
        HP: action.payload,
        fetchingHp: false,
        error: null
      });

    case actions.REGISTER:
      return Object.assign({}, state, {
        registering: true
      });

    case actions.REGISTERED_HPS:
      return Object.assign({}, state, {
        user: action.payload,
        registering: false,
        error: null
      });

    case actions.UPDATE:
      return Object.assign({}, state, {
        updating: true
      });

    case actions.UPDATED_HPS:
      return Object.assign({}, state, {
        user: action.payload,
        updating: false,
        error: null
      });

    case actions.SIGNOUT:
      return Object.assign({}, state, {
        user: action.payload,
        signout: true,
        error: null
      });

    case actions.SIGNOUT_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      });

    case actions.ERROR_ATLOGIN:
      return Object.assign({}, state, {
        error: action.payload
      });

    case actions.ERROR_FETCHING:
      return Object.assign({}, state, {
        error: action.payload
      });

    case actions.REGISRATION_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      });

    default:
      return state;
  }
};

export default hirePartner;
