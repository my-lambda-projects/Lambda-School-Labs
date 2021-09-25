import createDataContext from "./createDataContext";
import assetsApi from "../api/assets";
import { navigate } from "../navigationRef";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "new_store":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const addLocation = dispatch => async ({ name, description }) => {
  try {
    const res = await assetsApi.post("/location", {
      name,
      description
    });
    dispatch({ type: "new_store", payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: "add_error", payload: "invalid entries try again" });
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  { clearErrorMessage, addLocation },
  { errorMessage: "" }
);

// context can be fun!!
