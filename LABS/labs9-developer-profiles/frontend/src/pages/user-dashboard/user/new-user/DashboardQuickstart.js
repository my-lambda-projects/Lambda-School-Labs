import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import QuickstartBasics from './QuickstartBasics';
import QuickstartBilling from './QuickstartBilling';
import { centerFlex } from '../../../../global-styles/Mixins';

class DashboardQuickstart extends Component {
  state = {
    current: 'basics',
  }

  changeCurrent = (current) => {
    this.setState({current})
  }

  render() {
    return (
      <QuickstartContainer>
        <header>
          <h1 className="main-heading">Quickstart</h1>
        </header>
        <div className="container">

          <div className="quickstart-close">
            <Link to="/dashboard">
              <i className="fa fa-times fa-2x"></i>
            </Link>
          </div>
          <nav>
            {this.state.current === 'basics' ?
              <button className="active" onClick={() => this.setState({current: 'basics'})}>Basic Info</button>
              :
              <button onClick={() => this.setState({current: 'basics'})}>Basic Info</button>
            }
            {this.state.current === 'billing' ?
              <button className="active" onClick={() => this.setState({current: 'billing'})}>Billing</button>
              :
              <button onClick={() => this.setState({current: 'billing'})}>Billing</button>
            }
          </nav>
          {this.state.current === 'basics' ?
            <QuickstartBasics changeCurrent={this.changeCurrent} updateProgress={this.props.updateProgress} userInfo={this.props.userInfo} />
            :
            <QuickstartBilling changeCurrent={this.changeCurrent} updateProgress={this.props.updateProgress} userInfo={this.props.userInfo} />
          }
        </div>
      </QuickstartContainer>
    )
  }
}


const QuickstartContainer = styled.div`
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
    margin-left: 0;
  }
  @media (max-width: 600px) {
    padding-top: 300px;
  }
  @media (max-width: 400px) {
    padding-top: 350px;
  }
  .main-heading {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 3.5rem;
    }
    @media (max-width: 400px) {
      font-size: 3.2rem;
    }
  }



  .container {
    width: 80%;
    padding-top: 50px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 50px;
    @media (max-width: 1650px) {
      width: 90%;
    }
    @media (max-width: 1150px) {
      width: 97%;
    }
    @media (max-width: 500px) {
      padding-top: 100px;
    }
    @media (max-width: 450px) {
      border-left: none;
      border-right: none;
      width: 100%;
    }
    nav {
      ${centerFlex()}
      button {
        margin-bottom: 50px;
        width: 200px;
        height: 80px;
        color: white;
        padding: 15px 20px;
        font-size: 2rem;
        letter-spacing: 1.5px;
        background-color: var(--accent-color);
        border: none;
        border-radius: 5px;
        @media (max-width: 900px) {
          width: 150px;
          height: 70px;
        }
        &:hover {
          color: var(--lp_btn_color);
          transform: scale(1.1);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          cursor: pointer;
        }
        &:active {
          transform: scale(1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
        &:first-child {
          margin-right: 15px;
        }
      }
    }
    .active {
      color: var(--lp_btn_color);
      background: none;
      border-top: solid 2px var(--accent-color);
      border-right: solid 2px var(--accent-color);
      border-left: solid 2px var(--accent-color);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      &:hover {
        color: var(--lp_btn_color);
        transform: none;
        box-shadow: none;
        cursor: pointer;
      }
    }
    .quickstart-close {
      position: absolute;
      top: 1%;
      right: 1%;
      height: 50px;
      width: 50px;
      ${centerFlex()};
      a {
        text-decoration: none;
        color: var(--lp_btn_color);
        display: block;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;


export default DashboardQuickstart;