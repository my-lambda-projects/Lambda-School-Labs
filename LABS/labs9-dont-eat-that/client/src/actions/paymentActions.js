import axios from 'axios';

export const CANCEL_SUB = 'CANCEL_SUB';
export const CHARGE_USER = 'CHARGE_USER';
export const GET_PLAN = 'GET_PLAN';
export const ERROR = 'ERROR';

const URL = 'https://donteatthat.herokuapp.com';

export const chargeUser = (token, plan) => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .post(`${URL}/api/payments/charge`, {
      token: token.id,
      customerPlan: plan,
      firebaseid
    })
    .then(res => dispatch({ type: CHARGE_USER, payload: plan }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const getPlan = () => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .get(`${URL}/api/payments/plan/${firebaseid}`)
    .then(res => {
      console.log('then block of getPlan', res);
      dispatch({ type: GET_PLAN, payload: res.data.planName });
    })
    .catch(err => dispatch({ type: ERROR, payload: err.message }));
};

export const cancelSubscription = () => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .post(`${URL}/api/payments/cancel`, { firebaseid })
    .then(res => dispatch({ type: CANCEL_SUB, payload: true }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};
