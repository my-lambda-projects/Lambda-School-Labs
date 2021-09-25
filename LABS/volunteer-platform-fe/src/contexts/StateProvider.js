import React, { useReducer } from 'react';
import { StateContext } from './StateContext';

export const StateProvider = ({ initialState, reducer, children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    );
};
