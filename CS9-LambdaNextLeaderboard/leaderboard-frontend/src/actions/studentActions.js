import axios from "axios";
import jwt from "jsonwebtoken";

export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const UPDATE_STUDENT_ERRORS = "UPDATE_STUDENT_ERRORS";
export const DELETE_STUDENT = "DELETE_STUDENT";

const STUDENT_URL = process.env.REACT_APP_STUDENT_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const updateStudent = obj => {
  const token = localStorage.token;
  return dispatch => {
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json", Authorization: token },
      data: { token: dataEncrypt(obj) },
      url: `${STUDENT_URL}${obj.id}/update`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: UPDATE_STUDENT,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: UPDATE_STUDENT_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const deleteStudent = obj => {
  return dispatch => {
    axios
      .delete(`${STUDENT_URL}${obj.id}/delete`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token
        }
      })
      .then(res => {
        dispatch({ type: DELETE_STUDENT, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "ERRORS", payload: err.response.data });
      });
  };
};
