import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import { backendLink } from '../assets/config';

export default class GatedSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  async componentDidMount() {
    const res = await axios.get(`${backendLink}/api/user/me`, {
      withCredentials: 'include'
    });
    if (!res.data.user) return null;
    const [user] = res.data.user;
    this.setState({ user });
  }
  render() {
    return (
      <>{this.state.user.name ? <>{this.props.children}</> : <LoginForm {...this.props} />}</>
    );
  }
}
