import axios from "axios";
import jwt from "jsonwebtoken";
import {ERRORS} from './adminActions'

export const GET_CLASS_STUDENTS = "GET_CLASS_STUDENTS";
export const QUERY_STUDENTS = "QUERY_STUDENTS";
export const ADD_CLASS_STUDENTS = "ADD_CLASS_STUDENTS";
export const ADD_CLASS_STUDENTS_ERRORS = "ADD_CLASS_STUDENTS_ERRORS";
export const ADD_CSV_STUDENTS = "ADD_CSV_STUDENTS";
export const CLASS_RANKING = "CLASS_RANKING";
export const UPDATE_CLASS = "UPDATE_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";
const CLASS_URL = process.env.REACT_APP_CLASS_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const getClassStudents = obj => {
  return dispatch => {
    axios
      .get(`${CLASS_URL}${obj.id}/students`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token
        }
      })
      .then(res => {
        dispatch({
          type: GET_CLASS_STUDENTS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const updateClassAction = (classID, updateObject) => {
  return dispatch => {
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.token,
      },
      data: {token: dataEncrypt(updateObject)},
      url: `${CLASS_URL}${classID}/update`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: UPDATE_CLASS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  }
}
export const deleteClassAction = classID => {
  return dispatch => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.token,
      },
      url: `${CLASS_URL}${classID}/delete`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: DELETE_CLASS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  }
}

export const classRanking = (firstScore, secondScore, firstName, secondName) => {
  return dispatch => {
    dispatch({
      type: CLASS_RANKING,
      first: firstName,
      second: secondName,
      firstScore : firstScore,
      secondScore : secondScore
    })
  }
}

export const queryStudents = obj => {
  return dispatch => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.token
      },
      url: `${CLASS_URL}${obj.id}/students/${obj.query}`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: GET_CLASS_STUDENTS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const addClassStudent = obj => {
  const token = localStorage.token;
  return dispatch => {
    const options = {
      method: "POST",
      headers: {"content-type": "application/json", Authorization: token},
      data: {token: dataEncrypt(obj)},
      url: `${CLASS_URL}${obj.id}/students/create`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_CLASS_STUDENTS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_CLASS_STUDENTS_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const postCsvStudents = (csvFile, classID, bool) => {
  // const token = localStorage.getItem("token");
  const token = localStorage.token;
  // if (bool === true) {
    return dispatch => {
      const options = {
        method: "POST",
        headers: {"content-type": "text/csv", Authorization: token},
        data: csvFile,
        url: `${CLASS_URL}${classID}/importcsv`
      };

      axios(options)
        .then(resp => {
          // localStorage.setItem("user", resp.data.name);
          console.log("success SUCCESS", bool, resp)
          dispatch({
            type: ADD_CSV_STUDENTS,
            // user: resp.data.name,
            // class_name: resp.student,
            payload: true
          });
        })
        .catch(err => {
          console.log("failure FAILURE", bool, err)
          dispatch({
            type: ERRORS,
            payload: err
          })
        });
    };
  // }

  // return dispatch => {
  //   const options = {
  //     method: "POST",
  //     headers: {"content-type": "text/csv", Authorization: token},
  //     data: csvFile,
  //     url: `${CLASS_URL}${classID}/importcsv`
  //   };
  //
  //   axios(options)
  //     .then(resp => {
  //       // localStorage.setItem("user", resp.data.name);
  //       dispatch({
  //         type: ADD_CSV_STUDENTS,
  //         // user: resp.data.name,
  //         // class_name: resp.student,
  //         studentsAdded: true
  //       });
  //     })
  //     .catch(err => dispatch({type: ERRORS, payload: err}));
  // };
};
