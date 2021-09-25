import React, { Component } from "react";
export const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    auth: false,
    username: "",
    id: "",
    email: ""
  };

  // Takes the response data from when we log in & sets it on context state
  setLogin = data => {
    this.setState({
      auth: true,
      username: data.username ? data.username : "",
      id: data._id ? data._id : "",
      email: data.email ? data.email : ""
    });
  };

  render() {
    const userData = this.state;

    return (
      // Setup context provider to setup the data on state & to setup the methods on class
      <AuthContext.Provider
        value={{
          userData,
          actions: { setLogin: this.setLogin }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
