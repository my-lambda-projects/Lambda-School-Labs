import React from 'react';
import { render } from '@testing-library/react';
import { StateProvider } from '../contexts/StateProvider';
import { initialState } from '../reducers/initialState';
import { mainReducer } from '../reducers/mainReducer';

function customRender(component) {
  return {
    ...render(
      <StateProvider initialState={initialState} reducer={mainReducer}>
        {component}
      </StateProvider>
    ),
  };
}

export * from '@testing-library/react';

export { customRender as render };
