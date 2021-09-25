import axios from "axios";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";


export const ADDINGUSER = "ADDINGUSER";
export const ADDEDUSER = "ADDEDUSER";

export const EDITINGUSER = "EDITINGUSER";
export const EDITEDUSER = "EDITEDUSER";

export const LOGGINGIN = "LOGGINGIN";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGINGOUT = "LOGGINGOUT";
export const LOGGEDOUT = "LOGOUT";

export const GETTINGUSER = "GETTINGUSER";
export const GOTUSER = "GOTUSER";

export const UPDATINGSUB = "UPDATINGSUB";
export const UPDATEDSUB = "UPDATEDSUB";

export const GETTINGCLASSES = "GETTINGCLASSES";
export const GOTCLASSES = "GOTCLASSES";
export const ADDINGCLASS = "ADDINGCLASS";
export const ADDEDCLASS = "ADDEDCLASS";
export const EDITEDCLASS = "EDITEDCLASS";
export const EDITINGCLASS = "EDITINGCLASS";
export const DELETECLASS = "DELETECLASS";
export const DELETEDCLASS = "DELETEDCLASS";

export const GETTINGSTUDENTS = "GETTINGSTUDENTS";
export const GOTSTUDENTS = "GOTSTUDENTS";
export const ADDINGSTUDENT = "ADDINGSTUDENTS";
export const ADDEDSTUDENT = "ADDEDSTUDENT";
export const DELETESTUDENT = "DELETESTUDENT";
export const DELETEDSTUDENT = "DELETEDSTUDENT";

export const UPDATINGPARTICIPATION = "UPDATINGPARTICIPATION";
export const UPDATEDPARTICIPATION = "UPDATEDPARTICIPATION";

export const UPDATINGGRAPHDATA = "UPDATINGGRAPHDATA";
export const UPDATEDGRAPHDATA = "UPDATEDGRAPHDATA";

export const ERROR = "ERROR";

// const URL = "https://lambda-labs-backend.herokuapp.com/api";
const URL = "http://localhost:5000/api";

export const logIn = (user, history) => dispatch => {
  localStorage.clear();
  axios
    .post(`${URL}/login`, {
      username: user.username,
      password: user.password
    })
    .then(res => {
      console.log("RESPONSE:", res);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // if (token) {
      //     // Apply to every request
      //     axios.defaults.headers.common.Authorization = token;
      //   } else {
      //     delete axios.defaults.headers.common.Authorization;
      //   }

      const decoded_token = jwt_decode(token);
      dispatch({ type: LOGGEDIN, payload: decoded_token });

      // Fixes bug where url appears but page does not load
      window.location.reload(true); // TODO: Fix this so that you are only using withRouter redirects
      // swal({ icon: "success", text: "You are logged in!" }); // TODO: Find a way to have this render properly
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
      swal({
        icon: "error",
        text: "Well that didn't work! Click Signup to create a new account!"
      });
    });
};

export const logOut = () => dispatch => {
  dispatch({
    type: LOGGINGOUT
  });
  dispatch({
    type: LOGGEDOUT
  });
  localStorage.clear();
};

export const addUser = data => dispatch => {
  // If there no users, go ahead and add a user:
  localStorage.clear();

  if (axios.get(`${URL}/users`).response === undefined) {
    localStorage.clear();
    dispatch({
      type: ADDINGUSER
    });
    axios
      .post(`${URL}/register`, {
        username: data.username,
        password: data.password
      })
      .then(res => {
        dispatch({ type: ADDEDUSER, payload: res });
        swal({
          icon: "success",
          text: "You are registered! Click on Login to start magic randomizing!"
        });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
        swal({
          icon: "error",
          text: "There was a user error while registering a new user"
        });
      });
  } else if (axios.get(`${URL}/users`).response.data.length > 0) {
    localStorage.clear();
    //  If username is already taken, send sweet alert, else add the user.
    axios
      .get(`${URL}/users`)
      .then(response => {
        const all_users = response.data;
        all_users.map(user => {
          if (data.username === user.username) {
            swal({
              icon: "error",
              text: `Sorry! The username ${
                data.username
              } is already taken! Please try again!`
            });
            return;
          } else {
            dispatch({
              type: ADDINGUSER
            });
            axios
              .post(`${URL}/register`, {
                username: data.username,
                password: data.password
              })
              .then(res => {
                dispatch({ type: ADDEDUSER, payload: res });
                swal({
                  icon: "success",
                  text:
                    "You are registered! Click on Login to start magic randomizing!"
                });
              })
              .catch(err => {
                dispatch({ type: ERROR, payload: err });
                swal({
                  icon: "error",
                  text:
                    "We're sorry! There was an error in processing your registration.  Please check back soon!"
                });
              });
          }
        });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  }
};

export const editUser = (update_info, history) => dispatch => {
  const logged_in_user_id = jwt_decode(localStorage.jwtToken).sub + "";
  console.log("typeof logged_in_user_id:", typeof logged_in_user_id);
  console.log("typeof update_info", typeof update_info);
  if (update_info.username && update_info.password) {
    dispatch({
      type: EDITINGUSER
    });
    axios
      .put(`${URL}/updateuser/${logged_in_user_id}`, update_info)

      .then(response => {
        dispatch({
          type: EDITEDUSER,
          user_email_pass: response.data
        });
        swal({ icon: "success", text: "Username and password updated!" });
        history.push("../classes");
      })
      .catch(err => {
        dispatch({ type: ERROR, errorMessage: "Error updating user." });
        swal({
          icon: "error",
          text:
            "Sorry! We were unable to update your username and password! Please try again later!"
        });
      });
  } else if (update_info.subscription === "standard") {
    dispatch({
      type: UPDATINGSUB
    });
    axios
      .put(
        `http://localhost:5000/api/updatesubscription/${logged_in_user_id}`,
        { subscription: "standard" }
      )
      .then(response => {
        dispatch({
          type: UPDATEDSUB,
          subscription: response.data
        });
        swal({ icon: "success", text: "Subscription Updated!" });
        // history.push("../classes");
      })
      .catch(err => {
        dispatch({ type: ERROR, errorMessage: "Error updating subscription." });
        swal({
          icon: "error",
          text:
            "Sorry! We were unable to update your subscription at this time! Please try again later!"
        });
      });
  } else if (update_info.subscription === "premium") {
    dispatch({
      type: UPDATINGSUB
    });
    axios
      .put(
        `http://localhost:5000/api/updatesubscription/${logged_in_user_id}`,
        { subscription: "premium" }
      )
      .then(response => {
        dispatch({
          type: UPDATEDSUB,
          subscription: response.data
        });
        swal({ icon: "success", text: "Subscription Updated!" });
        // history.push("../classes");
      })
      .catch(err => {
        dispatch({ type: ERROR, errorMessage: "Error updating subscription." });
        swal({
          icon: "error",
          text:
            "Sorry! We were unable to update your subscription at this time! Please try again later!"
        });
      });
  }
};

export const getUser = () => dispatch => {
  // if (axios.get(`${URL}/classes`).response === undefined) {
  //   dispatch({ type: GOTCLASSES, classes: [] });
  //   return
  // } else {

  dispatch({
    type: GETTINGUSER
  });

  axios
    .get(`${URL}/users`)
    .then(response => {
      console.log("RESPONSE FROM GETUSERS", response.data.length);
      const logged_in_user_id = jwt_decode(localStorage.jwtToken).sub;
      const all_users = response.data;
      let signedin_user = [];
      console.log("logged_in_user_id", logged_in_user_id);
      console.log("ALL_USERS", all_users);
      all_users.map(item => {
        if (item._id === logged_in_user_id) {
          signedin_user = item
        }
      });

      console.log("SIGNEDIN_USER", signedin_user);
      dispatch({ type: GOTUSER, user: signedin_user });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const getClasses = () => dispatch => {
  // if (axios.get(`${URL}/classes`).response === undefined) {
  //   dispatch({ type: GOTCLASSES, classes: [] });
  //   return
  // } else {

  dispatch({
    type: GETTINGCLASSES
  });

  axios
    .get(`${URL}/classes`)
    .then(response => {
      console.log("RESPONSE FROM GETCLASSES", response.data.length);
      const logged_in_user_id = jwt_decode(localStorage.jwtToken).sub;
      const all_classes = response.data;
      const user_classes = [];
      console.log("logged_in_user_id", logged_in_user_id);
      console.log("ALL_CLASSES", all_classes);
      all_classes.map(item => {
        if (item.users[0]._id === logged_in_user_id) {
          user_classes.push(item);
        }
      });

      console.log("USER_CLASSES", user_classes);
      dispatch({ type: GOTCLASSES, classes: user_classes });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const addClass = (class_data, history) => dispatch => {
  // ===== Create New Class and Add Logged in User as Ref ===== //
  console.log(jwt_decode(localStorage.jwtToken));
  const decoded_token = jwt_decode(localStorage.jwtToken);
  const user_id = decoded_token.sub;
  // const combine = {...class_data, users: decoded_token.sub}

  // TODO: Write an 'else if' which throws an swal error if a person tries to add a class with a name that already exists!
  // To do this, you will need to do an axios call to check throw the current list of classes OR, just check the list in the redux store!

  console.log("CLASS_DATA:", class_data);
  console.log("user_id:", user_id);
  dispatch({
    type: ADDINGCLASS
  });
  axios
    .post(`${URL}/createclass`, {
      name: class_data.name,
      students: class_data.students,
      allMode: class_data.allMode,
      trackMode: class_data.trackMode,
      users: user_id
    })
    // .then(response => {
    //   console.log("ADDCLASS RESPONSE.CONFIG.DATA:", response.config.data);
    //   dispatch({ type: ADDEDCLASS, classes: response.config.data });
    // })
    // .catch(() => {
    //   dispatch({ type: ERROR, errorMessage: "Error Adding Class..." });
    // })

    .then(() => {
      // ======= Find ALL Classes associated with Logged in User ===== //
      // dispatch({
      //   type: GETTINGCLASSES
      // });

      axios
        .get(`${URL}/classes`)
        .then(response => {
          console.log(
            `THESE ARE ${decoded_token.username}'s CLASSES:`,
            response
          );
          // // console.log("Last Added Class ID", response.data[response.data.length-1]._id)

          const class_id = response.data[response.data.length - 1]._id;
          // dispatch({ type: GOTCLASSES, classes: response.data });

          dispatch({
            type: EDITINGUSER
          });

          //       // LAST STEP: Add CLASS ID to stored in "response" to logged in User
          //       console.log("user_id", user_id)
          //       console.log("class_id", class_id)

          axios // FIX THIS IN BACKEND
            .put(`${URL}/addtouser/${user_id}`, {
              classes: class_id
            });
          // .then(() => {
          //   dispatch({ type: EDITEDUSER, payload: {classes: class_id}});
          // })
          // .catch(err => {
          //   dispatch({ type: ERROR, payload: err });
          // });
          swal({
            icon: "success",
            text: "Congratulations! You created a new class!"
          });
          history.push("../classes");
        })
        .catch(res => {
          dispatch({
            type: ERROR,
            errorMessage: "Error getting classes..."
          });
        });
    })
    .catch(err => {
      dispatch({ type: ERROR, errorMessage: "Error creating class..." });
    });
};

export const editClass = (class_data, history, classid) => dispatch => {
  const logged_in_user_id = jwt_decode(localStorage.jwtToken).sub;
  dispatch({
    type: EDITINGCLASS
  });
  axios
    .put(`${URL}/updateclass/${classid + ""}`, {
      name: class_data.name,
      students: class_data.students,
      allMode: class_data.allMode,
      trackMode: class_data.trackMode,
      users: logged_in_user_id,
      participation: 0
    })
    .then(response => {
      dispatch({
        type: EDITEDCLASS,
        class_data: response.data
      });
    });
  history.push("../classes");
};

export const deleteClass = classid => dispatch => {
  dispatch({
    type: DELETECLASS
  });
  axios.delete(`${URL}/deleteclass/${classid}`).then(response => {
    dispatch({
      type: DELETEDCLASS
    });
  });
};

export const getStudents = () => dispatch => {
  dispatch({
    type: GETTINGSTUDENTS
  });
  axios
    .get(`${URL}/:classid/students`)
    .then(response => {
      dispatch({ type: GOTSTUDENTS, students: response.data });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        errorMessage: "Error Fetching Students..."
      });
    });
};

// export const addStudent = studentName => dispatch => {
//   dispatch({
//     type: ADDINGSTUDENT
//   });
//   axios
//     .post(`${URL}/createstudent`, studentName)
//     .then(request => {
//       dispatch({ type: ADDEDSTUDENT, students: request.data });
//     })
//     .catch(err => {
//       dispatch({ type: ERROR, errorMessage: "Error Adding Student..." });
//     });
// };

export const updateParticipation = data => dispatch => {
  dispatch({
    type: UPDATINGPARTICIPATION
  });
  axios
    .put(`${URL}/updateparticipation/${data.class_id + ""}`, {
      // name: class_data.name,
      // students: class_data.students,
      // allMode: class_data.allMode,
      // trackMode: class_data.trackMode,
      // users: logged_in_user_id,
      participation: data.participation
    })
    .then(response => {
      console.log("updateParticipation response:", response);
      dispatch({
        type: UPDATEDPARTICIPATION,
        class_data: response.data,
        class_id: data.class_id
      });
    });
  // TODO: axios PUT to /updateclass/ to update participation array for particular day
  // Will need ID of class AND the participation rate
};

export const updateGraphData = data => dispatch => {
  dispatch({
    type: UPDATINGGRAPHDATA
  });
  axios
    .put(`${URL}/updategraphdata/${data.class_id + ""}`, {
      // name: class_data.name,
      // students: class_data.students,
      // allMode: class_data.allMode,
      // trackMode: class_data.trackMode,
      // users: logged_in_user_id,
      graph_data: data.graph_data
    })
    .then(response => {
      console.log("updateGraphData response:", response);
      dispatch({
        type: UPDATEDGRAPHDATA,
        class_data: response.data,
        class_id: data.class_id
      });
    });
};
