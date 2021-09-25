import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import FTLogo4 from './images/FT_Logo_4.jpg';


const ImageStyles = styled.img `
    width: 100%;
    height: 100%;
    border-radius: 25%;
`;

const LogoStyles = styled.a`
    width: 30%;
    height: 30%;
    margin-bottom: 10px;

    :hover {
        cursor: pointer;
    }
`;

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7.5px;
`;

const NavBarStyling = styled.div`
    border: 2px solid orange;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 280px;
    background-color: #77BBD3;
    border: 1px solid rgb(122, 122, 122);
    border-radius: 0.1rem;
    height: 100%;
`;

const NavLinksContainer = styled.div`
    margin: 50px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
`;

const NavLink = styled(Link) `
    color: white;
    background: #77BBD3;
    display: flex;
    justify-content: center;
    width: 100%; 
    height: 50px;
    margin-bottom: 6.5px;
    border-bottom: 1px solid white;
    margin-top: 25px;

    :hover {
        text-decoration: none;
        color: #3985ac;
    }
`;

const LogoutButton = styled.button`
    color: white;
    background: #77BBD3;
    display: flex;
    justify-content: center;
    border: none;
    width: 100%; 
    height: 50px;
    margin-bottom: 6.5px;
    padding: 25px;

    :hover {
      cursor: pointer;
      color: #3985ac;
    }
`;


class Navigation extends Component {
    render(){
    return (
      <NavBarStyling>
       <ImgWrapper>
       <LogoStyles href='/home/tabs'>
       <ImageStyles src={FTLogo4} alt="FTLogo3"></ImageStyles>
       </LogoStyles>
       </ImgWrapper>
        <NavLinksContainer>
            <NavLink to='/home/tabs'>FAMILY TABS</NavLink>
            <NavLink to='/home/notifications'>CHILD EVENTS</NavLink>
            <NavLink to='/home/household'>HOUSEHOLD</NavLink>
            <NavLink to='/home/billing'>BILLING</NavLink>
        </NavLinksContainer>
             <LogoutButton onClick={this.props.auth.logout}>LOG OUT</LogoutButton>
        </NavBarStyling>
    )
  }
}

  export default Navigation;





