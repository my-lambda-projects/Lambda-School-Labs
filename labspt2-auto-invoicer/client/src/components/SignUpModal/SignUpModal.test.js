import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers/combineReducer";
import SignUpModal from "../SignUpModal";

const store = createStore(rootReducer);

describe("<SignUpModal />", () => {
  it("renders Sign Up Modal Component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SignUpModal />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
