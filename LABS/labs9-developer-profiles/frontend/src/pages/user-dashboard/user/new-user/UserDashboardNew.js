import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../../global-styles/Mixins';
import { ReactComponent as ReactProgrammer } from '../../programmer.svg';

class UserDashboardNew extends Component {

  render() {
    const { first_name } = this.props.userInfo;

    return (
      <IntroContainer>
        <header>
          {first_name === "" ?
            <h1 className="main-heading">Welcome!</h1>
            :
            <h1 className="main-heading">Welcome, {first_name}!</h1>
          }
        </header>
        <div className="container">
          <ReactProgrammer className="programmer-svg" alt="logo" />
        </div>
        <ButtonContainer>
          <Link to="/dashboard/new/quickstart">Quickstart</Link>
          <Link to="/dashboard">Home</Link>
        </ButtonContainer>
      </IntroContainer>
    )
  }
}

const IntroContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-top: 200px;
    margin-left: 0px;
  }
  @media (max-width: 600px) {
    padding-top: 300px;
  }
   .main-heading {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 4rem;
    }
    @media (max-width: 600px) {
      font-size: 3.5rem;
    }
    @media (max-width: 450px) {
      margin-bottom: 30px;
    }
    @media (max-width: 400px) {
      font-size: 3.2rem;
    }
  }
  .container {
    margin-top: 50px;
    padding-left: 25px;
    padding-right: 25px;
    ${centerFlex()}

    .programmer-svg {
      width: 70%;
      height: auto;
      @media (max-width: 1300px) {
        width: 75%;
      }
      @media (max-width: 1150px) {
        width: 80%;
      }
      @media (max-width: 1000px) {
        width: 85%;
      }
      @media (max-width: 850px) {
        width: 90%;
      }
      @media (max-width: 700px) {
        width: 95%;
      }
      @media (max-width: 550px) {
        width: 100%;
      }
    }
  }
`;


export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  @media (max-width: 450px) {
    flex-direction: column;
  }

  a {
    width: 230px;
    height: 55px;
    display: block;
    margin: auto;
    text-decoration: none;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--lp_btn_color);
    border: none;
    border-radius: 100px;
    @media (max-width: 500px) {
    width: 95%;
    }
    @media (max-width: 450px) {
      margin-bottom: 25px;
    }
    ${centerFlex()};
    &:hover {
      color:var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    &:first-child {
      margin-right: 50px;
      @media (max-width: 450px) {
        margin-right: 0;
      }
    }
  }
`;


export default UserDashboardNew;
