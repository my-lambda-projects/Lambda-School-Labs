import React, { Component } from 'react'
import Auth from '../auth/Auth';
import Loader from '../components/loader/Loader';

class Callback extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication({...this.props});
  }

  render() {
    return (
      <div>
        <Loader />
      </div>
    )
  }
}

export default Callback;