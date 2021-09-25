// Libraries
import React from 'react';

// Components
import {GoogleLogin} from 'react-google-login';

class GoogleApi extends React.Component {
    render() {
       return (
         <GoogleLogin
           clientId="559144659158-uck7lvea9deivqvp99bo3bfifsdips4a.apps.googleusercontent.com"
           onSuccess={this.props.responseGoogle}
           onFailure={this.props.responseGoogle}
           theme='dark'
         />
       );
  }
}

  export default GoogleApi;
