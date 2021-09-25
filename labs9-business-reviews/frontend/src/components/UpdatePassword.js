import React, { Component } from 'react';
import axios from 'axios';
import { backendLink } from '../assets/config';
import styled from 'styled-components';
import NavBar from './NavBar';
import GatedSignIn from './GatedSignInComponent';

const UpdatePasswordDiv = styled.div`
  margin: 0 auto;
  max-width: 600px;
  margin-bottom: 100px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;

  .image-container {
    height: 200px;
    width: 100%;
    h1 {
      font-weight: 100;
      font-size: 30px;
      text-align: center;
      padding: 10px;
    }
  }

  .header {
    margin-bottom: 4rem;
  }

  .link {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid black;
    height: 40px;
    width: 100px;
    font-family: Roboto;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 1rem;
    margin-top: -0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    input[type='password'] {
      width: 90%;
      padding: 5px;
      align-self: center;
      border: none;
      font-size: 2rem;
      border-bottom: 1px solid black;
      margin-bottom: 2rem;
    }
    input[type='submit'] {
      width: 30%;
      cursor: pointer;
    }
  }
`;

class UpdatePassword extends Component {
  state = {
    password: '',
    confirm_password: '',
    user: {}
  };
  async componentDidMount() {
    const res = await axios.get(`${backendLink}/api/user/me`, {
      withCredentials: 'include'
    });
    if (!res.data.user) return this.props.history.push('/resetpassword');
    const [user] = res.data.user;
    this.setState({ user });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.password !== this.state.confirm_password)
      return alert('passwords must match');
    try {
      const res = await axios.put(
        `${backendLink}/api/user/updatepassword/${this.state.user.id}`,
        { password: this.state.password },
        { withCredentials: 'include' }
      );
      console.log(res.status);
    } catch (err) {
      alert(err);
    }
  };
  render() {
    return (
      <GatedSignIn>
        <NavBar />
        <UpdatePasswordDiv>
          <div className='header'>
            <h1>Reset password for {this.state.user.name}</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>Password</label>
            <input
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
              name='password'
            />
            <label>Confirm Password</label>
            <input
              type='password'
              value={this.state.confirm_password}
              onChange={this.handleChange}
              name='confirm_password'
            />
            <input className='link' type='submit' value='update password' />
          </form>
        </UpdatePasswordDiv>
      </GatedSignIn>
    );
  }
}
export default UpdatePassword;
