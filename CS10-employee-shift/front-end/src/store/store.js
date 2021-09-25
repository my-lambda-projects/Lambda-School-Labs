import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./rootReducer.js";
import thunk from "redux-thunk";
// import logger from "redux-logger";

export default function configureStore() {
  return createStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), FOR DEVELOPMENT
    applyMiddleware(thunk)
  );
  // applyMiddleware(thunk,logger)); FOR DEVELOPMENT
}
