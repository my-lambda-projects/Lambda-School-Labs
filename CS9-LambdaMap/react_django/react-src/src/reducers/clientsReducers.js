// Clients Reducers

import * as actions from "../actions/actionTypes";

const initialState = {
  clients: [],
  client: {},
  client_favorites: [],
  fetchingClientFavs: false,
  fetchingClients: false,
  fetchingClient: false,
  updatingClient: false,
  loggingIn: false,
  error: null
};

const clients = (state = initialState, action) => {
  switch (action.type) {
    // Fetching all clients
    case actions.FETCH_CLIENTS:
      return Object.assign({}, state, {
        fetchingClients: true
      });

    case actions.FETCHED_CLIENTS:
      return Object.assign({}, state, {
        clients: [...action.payload],
        fetchingClients: false,
        error: null
      });

    // Fetching individual client profile
    case actions.FETCH_CLIENT:
      return Object.assign({}, state, {
        fetchingClient: true
      });

    case actions.FETCHED_CLIENT:
      return Object.assign({}, state, {
        client: action.payload,
        fetchingClient: false,
        error: null
      });

    // Logging in Clients
    case actions.LOGIN:
      return Object.assign({}, state, {
        loggingIn: true
      });

    case actions.LOGGEDIN_CLIENT:
      return Object.assign({}, state, {
        user: action.payload,
        loggingIn: false,
        error: null
      });

    // Registering Clients
    case actions.REGISTER:
      return Object.assign({}, state, {
        registering: true
      });

    case actions.REGISTERED_CLIENT:
      return Object.assign({}, state, {
        user: action.payload,
        registering: false,
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

    case actions.UPDATE_CLIENT:
      return Object.assign({}, state, {
        updatingClient: true
      });
      
    case actions.UPDATE:
      return Object.assign({}, state, {
        updating: true
      });

    case actions.UPDATED_CLIENT:
      return Object.assign({}, state, {
        client: action.payload,
        updatingClient: false,
        error: null
      });

    case actions.FETCH_CLIENTFAVORITES:
      return Object.assign({}, state, {
        fetchingClientFavs: true
      });

    case actions.FETCHED_CLIENTFAVORITES:
      return Object.assign({}, state, {
        client_favorites: [...action.payload],
        fetchingClientFavs: false,
        error: null
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

export default clients;
