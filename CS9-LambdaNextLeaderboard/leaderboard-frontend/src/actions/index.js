import axios from "axios";
// import jwt from "jsonwebtoken";

// // export const CREATE_USER = "CREATE_USER";
// // export const LOGIN_ACTION = "LOGIN_ACTION";
// // export const LOGOUT_ACTION = "LOGOUT_ACTION";
// // export const UPDATE_STUDENT = "UPDATE_STUDENT";
// // export const ADD_CLASS = "ADD_CLASS";
// // export const ADD_STUDENT = "ADD_STUDENT";
// // export const GET_CLASS_STUDENTS = "GET_CLASS_STUDENTS";
// // export const GET_CLASSES_STUDENTS = "GET_CLASSES_STUDENTS";
// // export const LOGIN_ERRORS = "LOGIN_ERRORS";
// // export const REGISTER_ERRORS = "REGISTER_ERRORS";
export const ERRORS = "ERRORS";
// export const REDIRECT_DATA_CLASS = "REDIRECT_DATA_CLASS";
// // export const GET_STUDENTS = "GET_STUDENTS";
export const GET_GITHUB_DATA = "GET_GITHUB_DATA";
export const CLASS_TO_QUERY = "CLASS_TO_QUERY";
export const CHANGE_SETTINGS = "CHANGE_SETTINGS";
// // export const EDIT_STUDENT = "EDIT_STUDENT";
// // export const REMOVE_STUDENT = "REMOVE_STUDENT";
// // export const UPDATE_ADMIN = "UPDATE_ADMIN";

// const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;
// const CLASS_URL = process.env.REACT_APP_CLASS_URL;

// const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

// export function queryMyData(param, history) {
//   return (dispatch, getState) => {
//     console.log(param, history);
//     const data = getState().classlist_students; //path.to.myData[param];
//     console.log("DATA DATA DATA", data);
//     const status = data ? "complete" : "loading";
//     console.log("status", status);
//     const promise = data
//       ? Promise.resolve
//       : dispatch(getClassStudentsAction(param.toString()));
//
//     return { data, status, promise };
//   };
// }

// export function queryAllMyData(param, history) {
//   return (dispatch, getState) => {
//     // console.log(param, history);
//     const data = getState().allClasses;
//     // console.log("DATA DATA DATA", data);
//     const status = data ? "complete" : "loading";
//     // console.log("status", status);
//     const promise = data
//       ? Promise.resolve
//       : dispatch(getClassesStudentsAction());
//
//     return { data, status, promise };
//   };
// }

// export function queryStudents(classname) {
//   return (dispatch, getState) => {
//     const data = getState().allStudents;
//     console.log("DATA DATA DATA", data);
//     const status = data ? "complete" : "loading";
//     const promise = data
//       ? Promise.resolve
//       : dispatch(getStudentsAction(classname));
//     return { data, status, promise };
//   };
// }

// export const setClassForQuery = classID => {
//     console.log("action set query class", classID)
//     return dispatch => {
//         dispatch({
//             type: CLASS_TO_QUERY,
//             payload: classID
//         })
//     }
// }
const LEADERBOARD_URL = process.env.REACT_APP_LEADERBOARD_URL;

export const setClassForQuery = (classID, name) => {
  return dispatch => {
    dispatch({
      type: CLASS_TO_QUERY,
      payload: classID,
      classNameSelected: name
    });
  };
};
export const setSettingsAction = status => {
  return dispatch => {
    dispatch({
      type: CHANGE_SETTINGS,
      payload: status
    });
  };
};

export function queryGithub() {
  return (dispatch, getState) => {
    const data = getState().githubData;
    const classID = getState().classToQuery;
    const status = data ? "complete" : "loading";
    const promise = data
      ? Promise.resolve
      : dispatch(getGithubDataAction(classID));
    return { data, status, promise };
  };
}

export const getGithubDataAction = idClass => {
  console.log(LEADERBOARD_URL);
  const token = localStorage.getItem("token");
  const id = {
    // id: localStorage.getItem("adminID")
    // id: "5b89e652c89dc5730cdf04f2"
    id: idClass
  };
  // history.push("/leaderboard")
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      url: `${LEADERBOARD_URL}data`,
      data: id
    };
    axios(options)
      .then(res => {
        localStorage.removeItem("invalid");
        dispatch({
          type: GET_GITHUB_DATA,
          payload: res.data,
          githubStats: res.data
        });
      })
      .catch(err => {
        localStorage.setItem("invalid", err.response.data);
        dispatch({
          type: ERRORS,
          payload: err.response.data
          // allClasses: err.response.data,
          // allClasses ? (allClasses: action.allClasses ): (allClasses:  allClasses)
        });
      });
  };
};
// export const redirectDataClass = () => {
//   return dispatch => {
//     dispatch({
//       type: REDIRECT_DATA_CLASS,
//       classlist_students: null,
//       allClasses: null
//     });
//   };
// };
// export const updateUserAction = userObject => {
//   // const token = localStorage.getItem("token");
//   // const user = studentData.firstname + " " + studentData.lastname;
//   return dispatch => {
//     // const options = {
//     //     method: "PUT",
//     //     headers: {"content-type": "application/json", Authorization: token},
//     //     data: userObject,
//     //     url: `${USER_URL}updateuser`
//     // };
//     axios
//       .put(`${ADMIN_URL}updateuser`, { token: dataEncrypt(userObject) })
//       // (options)
//       .then(res => {
//         dispatch({
//           type: UPDATE_ADMIN,
//           payload: res.admin //Student data object returned
//           // class_name: res.name,
//           // user: user,
//         });
//       })
//       .catch(err => {
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data
//         });
//       });
//   };
// };
// export const getClassStudentsAction = classname => {
//   const token = localStorage.getItem("token");

//   return dispatch => {
//     const options = {
//       method: "GET",
//       headers: { "content-type": "application/json", Authorization: token },
//       url: `${CLASS_URL}${classname}`
//     };
//     axios(options)
//       .then(res => {
//         localStorage.removeItem("invalid");
//         dispatch({
//           type: GET_CLASS_STUDENTS,
//           payload: res.data.students, //returns the array of student object data
//           class_name: res.data.name,
//           fetchSuccess: true
//           // test: res
//           //PAYLOAD {

//           //     "hired": false,
//           //     "_id": "5b79b4a6223c9800043f5a1e",
//           //     "lastname": "Bueno",
//           //     "firstname": "Abraham",
//           //     "email": "abrambueno1992@gmail.com",
//           //     "github": "abrambueno1992",
//           //     "huntr": "abrambueno1992@gmail.com"
//           // }
//         });
//       })
//       .catch(err => {
//         localStorage.setItem("invalid", err.response.data);
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data
//         });
//       });
//   };
// };
// export const getClassesStudentsAction = () => {
//   const token = localStorage.getItem("token");
//   const id = {
//     id: localStorage.getItem("adminID")
//   };
//   return dispatch => {
//     const options = {
//       method: "POST",
//       headers: { "content-type": "application/json", Authorization: token },
//       url: `${CLASS_URL}`,
//       data: id
//     };
//     axios(options)
//       .then(res => {
//         localStorage.removeItem("invalid");
//         dispatch({
//           type: GET_CLASSES_STUDENTS,
//           payload: res.data,
//           fetchClasses: true
//         });
//       })
//       .catch(err => {
//         localStorage.setItem("invalid", err.response.data);
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data,
//           fetchClasses: true
//           // allClasses: err.response.data,
//           // allClasses ? (allClasses: action.allClasses ): (allClasses:  allClasses)
//         });
//       });
//   };
// };
// const getStudentsAction = classID => {
//   console.log("class ID CLASS ID", classID);
//   const token = localStorage.getItem("token");
//   const id = {
//     id: localStorage.getItem("adminID")
//   };
//   return dispatch => {
//     const options = {
//       method: "POST",
//       headers: { "content-type": "application/json", Authorization: token },
//       url: `${CLASS_URL}/all`,
//       data: id
//     };
//     axios(options)
//       .then(res => {
//         localStorage.removeItem("invalid");
//         dispatch({
//           type: GET_STUDENTS,
//           payload: res.data
//         });
//       })
//       .catch(err => {
//         localStorage.setItem("invalid", err.response.data);
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data,
//           fetchClasses: true
//           // allClasses: err.response.data,
//           // allClasses ? (allClasses: action.allClasses ): (allClasses:  allClasses)
//         });
//       });
//   };
// };
// export const addStudentAction = (classname, studentData) => {
//   //STUDENT DATA {
//   //     "lastname": "Bueno",
//   //     "firstname": "Abraham",
//   //     "email": "abrambueno1992@gmail.com",
//   //     "github": "abrambueno1992",
//   //     "huntr": "abrambueno1992@gmail.com"
//   // }
//   const token = localStorage.getItem("token");
//   const user = studentData.firstname + " " + studentData.lastname;
//   return dispatch => {
//     const options = {
//       method: "POST",
//       headers: { "content-type": "application/json", Authorization: token },
//       data: studentData,
//       url: `${CLASS_URL}${classname}/addStudent`
//     };
//     // console.log("NewStudent", classname, stu)
//     axios(options)
//       .then(res => {
//         dispatch({
//           type: ADD_STUDENT,
//           payload: res.students, //Student data object returned
//           class_name: res.name,
//           user: user
//         });
//         //RESPONSE DATA {
//         //     "_id": "5b79b366223c9800043f5a1d",
//         //     "name": "CS9",
//         //     "students": [
//         //     {
//         //         "hired": false,
//         //         "_id": "5b79b4a6223c9800043f5a1e",
//         //         "lastname": "Bueno",
//         //         "firstname": "Abraham",
//         //         "email": "abrambueno1992@gmail.com",
//         //         "github": "abrambueno1992",
//         //         "huntr": "abrambueno1992@gmail.com"
//         //     },
//         //     {
//         //         "hired": false,
//         //         "_id": "5b79e913e4056e00046b549d",
//         //         "lastname": "Bueno",
//         //         "firstname": "Abraham",
//         //         "email": "abrambueno1992@gmail.com",
//         //         "github": "abrambueno1992",
//         //         "huntr": "abrambueno1992@gmail.com"
//         //     }
//         // ],
//         //     "__v": 2
//         // }
//       })
//       .catch(err => {
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data
//         });
//       });
//   };
// };
// export const updateStudentAction = (classname, studentData) => {
//   const token = localStorage.getItem("token");
//   const user = studentData.firstname + " " + studentData.lastname;
//   return dispatch => {
//     const options = {
//       method: "PUT",
//       headers: { "content-type": "application/json", Authorization: token },
//       data: studentData,
//       url: `${CLASS_URL}${classname}/updatestudent`
//     };
//     axios(options)
//       .then(res => {
//         dispatch({
//           type: UPDATE_STUDENT,
//           payload: res.students, //Student data object returned
//           // class_name: res.name,
//           user: user
//         });
//       })
//       .catch(err => {
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data
//         });
//       });
//   };
// };

// export const editStudentAction = student => {
//   return dispatch => {
//     dispatch({
//       type: EDIT_STUDENT,
//       payload: student
//     });
//   };
// };
// export const removeStudentAction = (classname, studentID) => {
//   // const objID = {
//   //     name: obj.name,
//   //     _admin: localStorage.getItem("adminID")
//   // }
//   const token = localStorage.getItem("token");
//   return dispatch => {
//     const optionTwo = {
//       method: "DELETE",
//       headers: { "content-type": "application/json", Authorization: token },
//       data: studentID,
//       url: `${CLASS_URL}${classname}/deletestudent`
//     };

//     axios(optionTwo)
//       .then(res => {
//         // localStorage.setItem("user", resp.data.name);

//         dispatch({
//           type: REMOVE_STUDENT,
//           payload: res.data
//         });
//         // getClassesStudentsAction()
//       })
//       .catch(err => dispatch({ type: ERRORS, payload: err }));
//   };
// };

// export const addClass = obj => {
//   const objID = {
//     name: obj.name,
//     _admin: localStorage.getItem("adminID")
//   };
//   const token = localStorage.getItem("token");
//   return dispatch => {
//     const optionTwo = {
//       method: "POST",
//       headers: { "content-type": "application/json", Authorization: token },
//       data: objID,
//       url: `${CLASS_URL}addclass`
//     };

//     axios(optionTwo)
//       .then(resp => {
//         // localStorage.setItem("user", resp.data.name);

//         dispatch({
//           type: ADD_CLASS,
//           user: resp.data.name,
//           class_name: resp.student
//         });
//         // getClassesStudentsAction()
//       })
//       .catch(err => dispatch({ type: ERRORS, payload: err }));
//   };
// };
// export const addStudent = obj => {
//   const token = localStorage.getItem("token");
//   return dispatch => {
//     const optionTwo = {
//       method: "PUT",
//       headers: { "content-type": "application/json", Authorization: token },
//       data: obj,
//       url: `${ADMIN_URL}addclass`
//     };

//     axios(optionTwo)
//       .then(resp => {
//         // localStorage.setItem('user', resp.data.name)
//         dispatch({
//           type: ADD_STUDENT,
//           user: resp.data.name,
//           class_name: resp.student
//         });
//       })
//       .catch(err => dispatch({ type: ERRORS, payload: err }));
//   };
// };
