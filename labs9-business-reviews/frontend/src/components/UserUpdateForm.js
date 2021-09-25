import React, { Component } from 'react';
import axios from 'axios';
import { backendLink } from '../assets/config';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const FormDiv = styled.div`
  margin: 0 auto;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 200px;
    border-radius: 50%;
    margin: 0 auto;
  }

  form {
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: 2rem auto;

    label {
      margin: 0.5rem auto;
    }
    input[type='text'] {
      width: 80%;
      padding: 5px;
      margin: 0 auto;
    }
    input[type='submit'] {
      background-color: #ffc40e;
      font-family: 'roboto';
      margin: 10px auto;
      padding: 10px;
      float: center;
      width: 100%;
    }
  }
`;

class UserUpdateForm extends Component {
  state = {
    user: {}
  };
  async componentDidMount() {
    const res = await axios.get(`${backendLink}/api/user/me`, {
      withCredentials: true
    });
    const [user] = res.data.user;
    this.setState({ user });
  }
  onChange = e => {
    const user = { ...this.state.user };
    user[e.target.name] = e.target.value;

    this.setState({ user });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const user = { ...this.state.user };
    delete user.id;
    const res = await axios.put(
      `${backendLink}/api/user/${this.state.user.id}`,
      user,
      {
        withCredentials: 'include'
      }
    );
    if (res.data.error) {
      return console.log(res.data.error);
    }
    alert('successfully updated your credentials');
    return this.props.history.push('/');
  };
  render() {
    return (
      <FormDiv>
        <img src={this.state.user.gravatar} alt={this.state.user.name} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            onChange={this.onChange}
            name="name"
            value={this.state.user.name}
          />
          <label htmlFor="email">Email :</label>
          <input
            onChange={this.onChange}
            name="email"
            value={this.state.user.email}
          />
          <input type="submit" value="Update User" />
        </form>
      </FormDiv>
    );
  }
}

export default withRouter(UserUpdateForm);
