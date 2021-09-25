import {
  SIGNUP,
  LOGIN,
  ADD_CLIENT,
  CHANGE_USER,
  USER_CHANGED,
  GETTING_USER_INFO,
  GOT_USER_INFO,
  PAYMENT_SUCCESS,
  LOGOUT,
  LOGIN_ERROR,
  ADD_CLIENT_ERR
} from '../action/userActions';

const initialState = {
  user: '',
  userType: '',
  name: '',
  email: '',
  hoursLogged: [],
  invoices: [],
  clients: [],
  paid: true,
  signedUp: false,
  loggedIn: false,
  changeSuccess: false,
  loading: false,
  loginError: false,
  addedClient: false,
  addClientErr: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signedUp: true };
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        signedUp: false,
        user: action.payload._id,
        userType: action.userType,
        loginError: false
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: action.payload.clients,
        addedClient: true
      };
    case CHANGE_USER:
      return { ...state, changeSuccess: true };
    case USER_CHANGED:
      return { ...state, changeSuccess: false };
    case GETTING_USER_INFO:
      return { ...state, loading: true };
    case GOT_USER_INFO:
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        email: action.payload.email,
        clients: action.clients,
        hoursLogged: action.payload.hoursLogged,
        invoices: action.payload.invoices,
        paid: action.payload.paid
      };
    case PAYMENT_SUCCESS:
      return { ...state, paid: true };
    case LOGOUT:
      return {
        user: '',
        userType: '',
        name: '',
        email: '',
        hoursLogged: [],
        invoices: [],
        clients: [],
        paid: true,
        signedUp: false,
        loggedIn: false,
        changeSuccess: false,
        loading: false
      };
    case LOGIN_ERROR:
      return { ...state, loginError: true };
    case ADD_CLIENT_ERR:
      return { ...state, addClientErr: true };
    default:
      return state;
  }
};
