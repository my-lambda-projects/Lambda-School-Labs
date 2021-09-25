import Api from "../../../api";
import { toast } from "react-toastify";
export const GET_RANDOM = "GET_RANDOM";

const getRandomHandler = user => ({
  type: GET_RANDOM,
  user
});
export const getRandomUser = userType => dispatch => {
  dispatch({ type: "GET_RANDOM_USER" });

  Api.endpoints
    .random(userType)
    .then(result => {
      console.log({ result });
      dispatch(getRandomHandler(result.data));
    })
    .catch(error => {
      toast.error("Random user fetch failed, Please try again");
      console.log({ error });
    });
};
