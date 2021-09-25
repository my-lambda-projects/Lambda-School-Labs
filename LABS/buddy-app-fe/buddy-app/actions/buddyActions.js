export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER";
export const IS_LOADING = "IS_LOADING";
export const ADD_INTEREST = "ADD_INTEREST";
export const GET_INTERESTS = "GET_INTERESTS";
export const FORCE_RENDER = "FORCE_RENDER";

export const addToken = token => {
  return { type: ADD_TOKEN, payload: token };
};

export const addUser = user => {
  return { type: ADD_USER, payload: user };
};

export const isLoadingPage = value => {
  return { type: IS_LOADING, payload: value };
};

export const addInterest = interest => {
  return { type: ADD_INTEREST, payload: interest };
};

export const getInterests = interests => {
  return {
    type: GET_INTERESTS,
    payload: interests
  };
};

export const forceRender = () => {
  return {
    type: FORCE_RENDER
  };
};
