import Api from "../../../api";
import { toast } from "react-toastify";
export const BILLING_REQUEST = "BILLING_REQUEST";
export const BILLING_SUCCESS = "BILLING_SUCCESS";
export const BILLING_ERROR = "BILLING_ERRO";
export const BILLING_RESPONSE = "BILLING_RESPONSE";
export const STRIPE_TOKEN = "STRIPE_TOKEN";

// const getRandomHandler = user => ({
//   type: GET_RANDOM,
//   user
// });
// export const getRandomUser = userType => dispatch => {
//   dispatch({ type: "GET_RANDOM_USER" });

export const billUser = payload => dispatch => {
  dispatch({ type: BILLING_REQUEST });

  // send to server
  Api.endpoints
    .charge(payload.token.id, payload.item)
    .then(response => {
      toast.success("Purchase Complete");
      console.log(response);
      console.log("Purchase Complete!");
      dispatch({ type: BILLING_SUCCESS });

      dispatch({ type: BILLING_RESPONSE, data: response.data });
    })
    .catch(error => {
      toast.error("Purchase Falied");
      dispatch({ type: BILLING_ERROR, data: error });

      console.log(error);
    });
  //reducer
  // this.setState({ complete: true });

  // Api.endpoints.random(userType)
  // .then( result => {
  //     console.log({result});
  //     dispatch(getRandomHandler(result.data))
  // }).catch(error =>{
  //     console.log({error});
  // })
};
