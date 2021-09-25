import axios from 'axios';

export const LOADING = 'LOADING';
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const ERROR = 'ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const GET_USER = 'GET_USER';
export const REDIRECT = 'REDIRECT';
export const SUCCESS = 'SUCCESS';
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT';
export const CLEAR_STATE = 'CLEAR_STATE';
export const CREATE_ROCKET = 'CREATE_ROCKET';
export const GET_ROCKETS = 'GET_ROCKETS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_CLASSES = 'GET_CLASSES';
export const GET_ROCKETS_BY_CLASS = 'GET_ROCKETS_BY_CLASS';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_QUIZ = 'GET_QUIZ';
export const SEND_EMAIL = 'SEND_EMAIL';

const herokuUrl = 'https://cspt1knowledgerocket.herokuapp.com'
const localUrl = 'http://127.0.0.1:8000'

export const registerUser = (user) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: CLEAR_REDIRECT });
    axios
      .post(`${herokuUrl}/register/`, user)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch({ type: REGISTER, payload: response.data });
        dispatch({ type: REDIRECT });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const loginUser = (user) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: CLEAR_REDIRECT });
    axios
      .post(`${herokuUrl}/login/`, user)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch({ type: LOGIN, payload: response.data });
        dispatch({ type: REDIRECT });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({
          type: ERROR,
          payload: error.response.data.non_field_errors[0]
        });
        console.log(error.response.data);
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    localStorage.clear();
    dispatch({ type: CLEAR_STATE });
  };
};

export const updatePassword = (updatePass) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    const userKey = localStorage.getItem('token')
    axios
      .post(`${herokuUrl}/updatepassword/`, updatePass, { 'headers': { 'Authorization': `token ${userKey}` } })
      .then(response => {
        dispatch({ type: SUCCESS })
        dispatch({ type: UPDATE_PASSWORD, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const updateEmail = (updateEmail) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    const userKey = localStorage.getItem('token')
    axios
      .post(`${herokuUrl}/updateuser/`, updateEmail, { 'headers': { 'Authorization': `token ${userKey}` } })
      .then(response => {
        dispatch({ type: UPDATE_USER, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const getUser = (userKey) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    axios
      .get(`${herokuUrl}/getuser/`, {
        headers: { Authorization: `token ${userKey}` }
      })
      .then(response => {
        dispatch({ type: GET_USER, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({
          type: ERROR,
          payload: error.response.data.error
        });
        console.log(error.response.data);
      });
  };
};

export const getClass = (userKey) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    axios
      .get(`${herokuUrl}/getclasses/`, {
        headers: { Authorization: `token ${userKey}` }
      })
      .then(response => {
        dispatch({ type: GET_CLASSES, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const createRocket = (rocket) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: CLEAR_REDIRECT });

    const userKey = localStorage.getItem('token');
    axios
      .post(`${herokuUrl}/addrocket/`, rocket, {
        headers: { Authorization: `token ${userKey}` }
      })
      .then(response => {
        dispatch({ type: CREATE_ROCKET, payload: response.data });
        dispatch({ type: REDIRECT });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({
          type: ERROR,
          payload: error.response.data.error
        });
        console.log(error.response.data);
      });
  };
};

export const addStudent = (student) => {
  return dispatch => {
      dispatch({ type: LOADING });
      dispatch({ type: CLEAR_ERROR });
      const userKey = localStorage.getItem('token')
      axios
        .post(`${herokuUrl}/addstudent/`, student, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          return axios.post(`${herokuUrl}/getstudents/`, {className: student.className}, { 'headers': { 'Authorization': `token ${userKey}` }})
            .then(response => {
              dispatch({ type: GET_STUDENTS, payload: response.data });
            })
        })
        
        .catch(error => {
          dispatch({ type: CHANGE_LOADING });
          dispatch({ type: ERROR, payload: error.response.data.error });
          console.log( error.response.data);
        });
  };
};

export const getStudents = (className) => {
  return dispatch => {
      dispatch({ type: LOADING });
      dispatch({ type: CLEAR_ERROR });
      const userKey = localStorage.getItem('token');
      axios
        .post(`${herokuUrl}/getstudents/`, className, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          dispatch({ type: GET_STUDENTS, payload: response.data });
        })
        .catch(error => {
          dispatch({ type: CHANGE_LOADING });
          dispatch({ type: ERROR, payload: error.response.data.error });
          console.log( error.response.data);
        });
  };
};

export const getClasses = () => {	
  return dispatch => {	
      dispatch({ type: LOADING });	
      dispatch({ type: CLEAR_ERROR });	
      const userKey = localStorage.getItem('token')	
      axios	
        .get(`${herokuUrl}/getclasses`, { 'headers': { 'Authorization': `token ${userKey}` }})	
        .then(response => {	
          dispatch({ type: GET_CLASSES, payload: response.data });	
        })	
        .catch(error => {	
          dispatch({ type: CHANGE_LOADING });	
          dispatch({ type: ERROR, payload: error.response.data.error });	
          console.log( error.response.data);	
        });	
  };	
};

export const getRocketsByClassName = (clsName) => {
  return dispatch => {
      dispatch({ type: LOADING });
      dispatch({ type: CLEAR_ERROR });
      const userKey = localStorage.getItem('token')
      axios
        .post(`${herokuUrl}/getrocketsbyclassname/`, clsName, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          dispatch({ type: GET_ROCKETS_BY_CLASS, payload: response.data });
        })
        .catch(error => {
          dispatch({ type: CHANGE_LOADING });
          dispatch({ type: ERROR, payload: error.response.data.error });
          console.log( error.response.data);
        });
  };
};

export const addClass = (clsName) => {
  return dispatch => {
      dispatch({ type: LOADING });
      dispatch({ type: CLEAR_ERROR });
      const userKey = localStorage.getItem('token')
      axios
        .post(`${herokuUrl}/addclass/`, clsName, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          axios
            .get(`${herokuUrl}/getclasses`, { 'headers': { 'Authorization': `token ${userKey}` }})
            .then(response => {
            dispatch({ type: GET_CLASSES, payload: response.data });
          })
        })
        .catch(error => {
          dispatch({ type: CHANGE_LOADING });
          dispatch({ type: ERROR, payload: error.response.data.error });
          console.log( error.response.data);
        });
  };
};

export const removeStudent = (student) => {
  return dispatch => {
      dispatch({ type: LOADING });
      dispatch({ type: CLEAR_ERROR });
      const userKey = localStorage.getItem('token')
      axios
        .post(`${herokuUrl}/removestudent/`, student, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          return axios.post(`${herokuUrl}/getstudents/`, {className: student.className}, { 'headers': { 'Authorization': `token ${userKey}` }})
            .then(response => {
              dispatch({ type: GET_STUDENTS, payload: response.data });
            })
        })
        .catch(error => {
          dispatch({ type: CHANGE_LOADING });
          dispatch({ type: ERROR, payload: error.response.data.error });
          console.log( error.response.data);
        });
  };
};

export const removeClass = (classname) => {
  return dispatch => {
      dispatch({ type: LOADING });
      dispatch({ type: CLEAR_ERROR });
      const userKey = localStorage.getItem('token')
      axios
        .post(`${herokuUrl}/removeclass/`, classname, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          return axios.get(`${herokuUrl}/getclasses/`, { 'headers': { 'Authorization': `token ${userKey}` }})	
          .then(response => {	
            dispatch({ type: GET_CLASSES, payload: response.data });	
          })
          .catch(error => {	
            dispatch({ type: CHANGE_LOADING });	
            dispatch({ type: ERROR, payload: error.response.data.error });	
            console.log( error.response.data);	
          });
        })
  };
};

export const removeRocket = (rocket) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    const userKey = localStorage.getItem('token')
      axios
        .post(`${herokuUrl}/removerocket/`, rocket, { 'headers': { 'Authorization': `token ${userKey}` }})
        .then(response => {
          return axios.post(`${herokuUrl}/getrocketsbyclassname/`, {className: rocket.className}, { 'headers': { 'Authorization': `token ${userKey}` }})
            .then(response => {
              dispatch({ type: GET_ROCKETS_BY_CLASS, payload: response.data });
            })
        })
        .catch(error => {
          dispatch({ type: CHANGE_LOADING });
          dispatch({ type: ERROR, payload: error.response.data.error });
          console.log( error.response.data);
        });
  };
};

export const getRockets = (className) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    const userKey = localStorage.getItem('token')
    axios
      .post(`${herokuUrl}/getrockets/`, className, {
        headers: { Authorization: `token ${userKey}` }
      })
      .then(response => {
        dispatch({ type: GET_ROCKETS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const get_2_Day = (request) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    axios
      .post(`${herokuUrl}/getquestion2d/`, request)
      .then(response => {
        dispatch({ type: GET_QUIZ, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
}

export const get_2_Week = (request) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });

    axios
      .post(`${herokuUrl}/getquestion2w/`, request)
      .then(response => {
        dispatch({ type: GET_QUIZ, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const get_2_Month = (request) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    axios
      .post(`${herokuUrl}/getquestion2m/`, request)
      .then(response => {
        dispatch({ type: GET_QUIZ, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

export const sendEmail = (userKey, request) => {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: CLEAR_REDIRECT });
    axios
      .post(`${herokuUrl}/buildemail/`, request, { 'headers': { 'Authorization': `token ${userKey}` }})
      .then(response => {
        dispatch({ type: SEND_EMAIL, payload: response.data });
        dispatch({ type: REDIRECT });
      })
      .catch(error => {
        dispatch({ type: CHANGE_LOADING });
        dispatch({ type: ERROR, payload: error.response.data.error });
        console.log(error.response.data);
      });
  };
};

