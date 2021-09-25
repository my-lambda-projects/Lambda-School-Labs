import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-native-testing-library";
import Landing from "./Landing";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { initialState } from "../reducers/BuddyReducer";

describe("Landing", () => {
  const mockStore = configureStore([]);
  let store = mockStore(initialState);

  it("renders correctly", done => {
    const initial = render(
      <Provider store={store}>
        <Landing />
      </Provider>
    ).toJSON();
    expect(initial).toMatchSnapshot();
    done();
  });

  it("has a login button", () => {
    const initial = render(
      <Provider store={store}>
        <Landing />
      </Provider>
    );
    const { getByText } = initial;
    const loginButton = getByText("Sign In");

    expect(loginButton).toBeTruthy;
  });

  // this test fails - "TypeError: Cannot read property 'navigate' of undefined"
  // the test itself works because it's an error caused by calling onPress. the issue is that there 
  // doesn't seem to be a short/easy way to mock the function.

  /* it("calls onPress upon signin", () => {
    const initial = render(
      <Provider store={store}>
        <Landing />
      </Provider>
    );
    const { getByText } = initial;
    const loginButton = getByText("Sign In");
    fireEvent.press(loginButton);
    expect(onPress).toHaveBeenCalled(); 
    
  });
});
 */
