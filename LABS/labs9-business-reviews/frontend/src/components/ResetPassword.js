import React, { Component } from 'react';
import axios from 'axios';
import { backendLink } from '../assets/config';
import styled from 'styled-components';
import NavBar from './NavBar';

const ResetPasswordDiv = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 200px;
  margin-bottom: 1000px;
  h1 {
    font-weight: 100;
    text-align: center;
    padding: 5px;
  }
  form {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    label {
      font-size: 20px;
      margin: 0px 10px;
    }
    input[type='text'] {
      border-radius: 2px;
      padding: 5px;
      width: 12rem;
      margin: 0 10px;
    }
    input[type='submit'] {
      color: #eed974;
      background: #ffffff;
      padding: 0px 10px;
      margin: 0 10px;
      border: 4px solid #eed974;
      border-radius: 6px;
      &:hover {
        color: #20bf6b;
        border-radius: 50px;
        border-color: #20bf6b;
        transition: all 0.3s ease 0s;
      }
    }
  }
`;

class ResetPassword extends Component {
  state = { email: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(`${backendLink}/api/user/verify`, this.state, {
      withCredentials: true
    });
    console.log(res.status);
    if (res.data.error) {
      return alert(res.data.error);
    }
    this.props.history.push(`/updatepassword/${res.data.id}`);
  };
  render() {
    return (
      <div>
        <NavBar/>
        <ResetPasswordDiv>
          <h1>Forgot your password?</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Check Email:</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              placeholder="Check your email see if it exists"
            />
            <input type="submit" value="➤" />
          </form>
        </ResetPasswordDiv>
      </div>
    );
  }
}

export default ResetPassword;
