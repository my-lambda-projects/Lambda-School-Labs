import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import assetsApi from "../api/assets";
import { navigate } from "../navigationRef";
import ExpoMixpanelAnalytics from "@benawad/expo-mixpanel-analytics";
const analytics = new ExpoMixpanelAnalytics(
  process.env.MIXPANEL_SECRET_API_KEY
); //planning on putting token it in an env file if it passes

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};
// taking out passowrd from line 211 + 215
const signup = dispatch => async ({ email, password, username, id }) => {
  try {
    const response = await assetsApi.post("/auth/register", {
      email,
      password,
      username,
      id
    });
    // await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.multiSet([
      ["token", response.data.token],
      ["user_id", JSON.stringify(response.data.user.id)]
    ]);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("Cameron");
  } catch (err) {
    console.log("test context", err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up!"
    });
  }
};
// removing passsword from the flow
const signin = dispatch => async ({ email, password, username, id }) => {
  // console.log("Btn Clicked")
  try {
    const response = await assetsApi.post("/auth/login", {
      email,
      password,
      username,
      id
    });
    await AsyncStorage.multiSet([
      ["token", response.data.token],
      ["user_id", JSON.stringify(response.data.user.id)]
    ]);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("Ipick");

    analytics.track("Logged In", { Status: "Successful" });
  } catch (err) {
    console.log("signinTest:", err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in!"
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Landing");
};

// destructure off of createdatacontest 3rd input is initialState values
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage },
  { token: null, errorMessage: "" }
);
