import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { backendLink } from '../assets/config';

const PopularReviewersStyles = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  width: 100%;
  height: auto;
  min-height: 450px;

  @media (max-width: 900px) {
    background-color: white;
  }

  @keyframes shadow {
    0% {
      box-shadow: none;
    }
    100% {
      box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }

  h1 {
    width: 100%;
    font-weight: 100;
    text-align: center;
  }

  .user {
    box-sizing: border-box;
    background: #ffffff;
    height: auto;
    width: 22.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    line-height: 0.2;
    text-decoration: none;
    color: black;
    position: relative;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    @media (max-width: 900px) {
      width: 45%;
    }
    @media (max-width: 500px) {
      width: 90%;
    }
    :hover {
      animation: shadow 0.2s;
      animation-fill-mode: forwards;
    }

    .users__name {
      font-size: 1.2rem;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;

class PopularReviewers extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    Axios.get(`${backendLink}/api/user`)
      .then(response => {
        const userData = [...response.data];
        const slicedUserData = userData.slice(0, 8);
        this.setState(() => ({ users: slicedUserData }));
      })
      .catch(err => {
        console.error('Server error: could not access users', err);
      });
  }

  render() {
    return (
      <PopularReviewersStyles>
        {/* this div is explicitly for the navbar scroll */}
        <div id='Reviewers' />
        <h1>Popular Reviewers</h1>
        {this.state.users.map(({ id, name, gravatar }) => (
          <Link to={`/user/${id}`} key={id} className='user'>
            <img src={gravatar} alt="reviewer's profile" />
            <p className='users__name'>{name}</p>
          </Link>
        ))}
      </PopularReviewersStyles>
    );
  }
}

export default PopularReviewers;
