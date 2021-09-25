import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import { isSignedIn, getToken, onSignOut } from "../utils/authHelper.js";
import { connect } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";
import { isLoadingPage, getInterests, addUser } from "../actions/buddyActions";
const AuthStack = props => {
  const [authorized, setAuthorized] = useState(false);
  const [checkAuthorized, setCheckAuthorized] = useState(false);

  useEffect(() => {
    props.isLoadingPage(false);

    isSignedIn()
      .then(res => {
        // console.log("res", res);
        getToken()
          .then(token => {
            axiosWithAuth(token)
              .get("https://buddy-app-be.herokuapp.com/interests")
              .then(results => {
                props.getInterests(results.data);
                // console.log(results.data);
                AsyncStorage.getItem("id")
                  .then(res => {
                    // console.log("id", res);
                    axiosWithAuth(token)
                      .get(`https://buddy-app-be.herokuapp.com/users/${res}`)
                      .then(user => {
                        props.addUser({
                          first_name: user.data.first_name,
                          last_name: user.data.last_name,
                          id: user.data.id
                        });
                        setAuthorized(res);
                        setCheckAuthorized(true);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                onSignOut()
                  .then(logout => {
                    props.navigation.navigate("Landing");
                  })
                  .catch(error => {
                    console.log(error);
                  });
                console.log(err.message);
              });
          })
          .catch(err => {
            console.log(err);
          });

        //console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (checkAuthorized === false) {
    return null;
  }

  if (authorized) {
    return <Dashboard navigation={props.navigation} />;
  } else {
    return <SignIn />;
  }
};

const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(
  mapStateToProps,
  { isLoadingPage, getInterests, addUser }
)(AuthStack);
