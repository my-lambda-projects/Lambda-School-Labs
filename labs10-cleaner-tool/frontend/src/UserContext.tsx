import React, { createContext, useReducer } from 'react';
import { ReactNodeLike } from 'prop-types';

// @ts-ignore
const UserContext = createContext();

const initialState = {
  loggedIn: localStorage.getItem('token') || false,
  role: localStorage.getItem('role') || 'none',
  subscription: localStorage.getItem('subscription') || 0,
  connected: localStorage.getItem('connected') || false,
};
export interface UserState {
  loggedIn: string | boolean;
  role: string;
  subscription: number | string;
  connected: boolean | string;
}

export interface UserContextProviderProps {
  children: ReactNodeLike;
}

export interface UserReducerAction {
  type: string;
  payload: any;
}

const reducer = (state: UserState, action: UserReducerAction) => {
  switch (action.type) {
    case 'setLogin':
      return { ...state, loggedIn: !state.loggedIn };
    case 'setRole':
      localStorage.setItem('role', action.payload)
      return { ...state, role: action.payload };
    case 'setSubscription':
      return { ...state, subscription: action.payload };
    case 'connected':
      return { ...state, connected: !state.loggedIn };
    default:
      return state;
  }
};

function UserContextProvider(props: UserContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = { state, dispatch };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

const UserContextConsumer = UserContext.Consumer;
// const state = UserContext;

export { UserContext, UserContextProvider, UserContextConsumer };
