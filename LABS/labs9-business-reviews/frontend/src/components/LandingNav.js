import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { backendLink } from '../assets/config';
import SearchBar from './SearchBar';
import logo from '../assets/bonafind.png';
import { background } from '../assets/backgrounds/backgrounds';

const NavBar = styled.div`
  width: 100%;
  height: auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 75vh;

  .logo {
    animation: pulse 0.7s;
    animation-iteration-count: 2;
    animation-delay: 1s;

    @media (max-height: 830px) {
      width: 300px;
      height: 325px;
    }

    @media (max-height: 690px) {
      display: none;
    }
  }

  .logo__text {
    display: none;
    @media (max-height: 690px) {
      display: inline-block;
      font-family: Patua One;
      font-size: 3.5rem;
      color: white;
      letter-spacing: 1rem;
    }
  }
  .blur-container {
    width: 100%;
    height: 75px;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0 auto;
    box-sizing: border-box;

    @media (max-height: 800px) {
      margin-bottom: none !important;
    }

    .top-nav-items {
      width: 100%;
      box-sizing: border-box;
      max-width: 1200px;
      height: auto;
      display: flex;
      padding-top: 20px;
      margin: 0 auto;

      .menu__menuItems {
        width: 70%;
        height: auto;
        display: flex;
        align-items: center;
        @media (max-width: 900px) {
          width: 100%;
          font-size: 2.6rem;
        }

        a {
          font-size: 1.4rem;
          box-sizing: border-box;
          color: white;
          width: 100%;
          text-decoration: none;
          text-align: center;
          margin: 10px;
          @media (max-width: 900px) {
            color: white;
            font-size: 1rem;
            padding: 5px;
            margin: 0;
          }
        }
      }

      .menu__user {
        box-sizing: border-box;
        color: black;
        width: 30%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        @media (max-width: 900px) {
          box-sizing: border-box;
          display: flex;
          justify-content: flex end;
          width: 100%;
          color: white;
          margin: 0;
        }
        @media (max-width: 600px) {
          justify-content: flex-end;
        }
        .menu__user--profile--image {
          width: 30px;
          height: 30px;
        }
        .menu__user--text,
        p {
          text-decoration: none;
          font-size: 1.4rem;
          color: white;
          margin: 10px;
          @media (max-width: 900px) {
            color: white;
            font-size: 1rem;
          }
        }
      }
    }
  }
  .inner-nav-container {
    max-width: 1200px;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    font-family: 'Patua One';

    @media (max-width: 900px) {
      flex-direction: column;
      padding: 0;
    }
  }
`;

class LandingNav extends React.Component {
  state = { user: {}, loggedIn: false };
  handleLogout = async () => {
    const res = await axios.get(`${backendLink}/api/user/logout`, {
      withCredentials: 'include'
    });
    res.status === 200
      ? this.setState({ loggedIn: false })
      : console.log('Error Logging Out');
  };
  async componentDidMount() {
    const res = await axios.get(`${backendLink}/api/user/me`, {
      withCredentials: 'include'
    });
    if (!res.data.user) return this.setState({ loggedIn: false });
    const [user] = res.data.user;
    this.setState({ user, loggedIn: true });
  }
  render() {
    return (
      <NavBar>
        <div className='blur-container'>
          <div className='top-nav-items'>
            <div className='menu__menuItems'>
              <a href='#Businesses'>businesses</a>
              <a href='#Reviewers'>reviewers</a>
              <a href='/billing'>go pro ✔</a>
            </div>
            <div className='menu__user'>
              {!this.state.loggedIn ? (
                <React.Fragment>
                  <Link to='/login' className='menu__user--text'>
                    sign in
                  </Link>
                  <Link to='/register' className='menu__user--text'>
                    sign up
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    to={this.state.user.id?`/user/${this.state.user.id}`: '/'}
                    className='img--link'
                  >
                    <img
                      src={this.state.user.gravatar}
                      alt='My Profile'
                      className='menu__user--profile--image'
                    />
                  </Link>
                  <p onClick={this.handleLogout}>sign out</p>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className='inner-nav-container'>
          <img className='logo' src={logo} alt='logo' />
          <p className='logo__text'>Bonafind</p>
          <SearchBar />
        </div>
      </NavBar>
    );
  }
}

export default LandingNav;
