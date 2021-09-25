import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import moment from 'moment';
import base from './base';
import Navbar from './Navbar';
import firebase from './Firebase';
// import { connect } from 'react-redux';
// import { changeTokenId } from '../Actions';
import '../CSS/AccountLogin.css';

const sendToken = (tokenId, sendEmail, name) => {
  // setter
  console.log('set sessionStorage id and email', tokenId, sendEmail);
  sessionStorage.setItem('tokenId', tokenId);
  sessionStorage.setItem('email', sendEmail);
  sessionStorage.setItem('name', name);
  // console.log('Inside sendToken(), this.props: ', this.props);
  // Change token in Redux state.
  // this.props.dispatch(changeTokenId(tokenId));

  const data = {
    token: tokenId,
    email: sendEmail,
  };
  axios
    .post(`${base}/auth`, data)
    .then((res) => {
      let type = res.data.userType;
      console.log('userType', type);
      if (type === 'managerUser') {
        if (res.data.subExp <= moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')) {
          console.log('expired!');
          const userInfo = {
            token: tokenId,
            userType: 'standardUser',
          };
          console.log('sending to db:', userInfo);
          axios
            .post(`${base}/edituser`, userInfo)
            .then((resp) => {
              type = 'standardUser';
              console.log('Success response: ', resp);
            })
            .catch((err) => {
              console.log('Failed to make changes to user!', err);
            });
        } else {
          sessionStorage.setItem('userType', 'managerUser');
        }
        console.log('subscription not expired');
      }
      if (type === 'standardUser') {
        sessionStorage.setItem('userType', 'standardUser');
        window.location = '/my_loans';
      }
      if (type === 'managerUser') {
        window.location = '/open_loans';
      }
    })
    .catch((err) => {
      window.location = '/new_account';
      throw err;
    });
  if (sessionStorage.getItem('userType') === 'standardUser') {
    window.location = '/my_loans';
  }
  if (sessionStorage.getItem('userType') === 'managerUser') {
    window.location = '/open_loans';
  }
};

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('got the ID!!', user.uid);
        console.log('user email', user.email);
        console.log('fb user', user);
        sendToken(user.uid, user.email, user.displayName);
      });
    },
  },
  // credentialHelper: firebase.auth.CredentialHelper.NONE,
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
};

export default function AccountLogin() {
  // console.log('TOKEN ID:', this.props.tokenId);

  return (
    <div>
      <Navbar />
      <div className="Account-title-containter">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   tokenId: state.tokenId,
// });

// export default connect(mapStateToProps)(AccountLogin);
