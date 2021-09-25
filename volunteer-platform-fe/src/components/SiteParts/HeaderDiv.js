import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const HeaderDiv = ({ style, children, loggedIn }) => {
  const [scrollClass, setScrollClass] = useState('top');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let activeClass = 'scrolled';
      if (window.scrollY <= 30) {
        activeClass = 'top';
      }
      setScrollClass(activeClass);
    });
  }, []);

  return (
    <StyledHeader style={style} className={scrollClass}>
      {children}
      <NavigationContainer className={scrollClass}>
        <LeftNav>
          <Link to="/">
            <h2 className="branding">
              Volun<span>Tier</span>
            </h2>
          </Link>
        </LeftNav>
        <RightNav className="signup-links">
          {loggedIn || <Link to="/login">Login</Link>}
          {loggedIn || <Link to="/signup">Sign Up</Link>}
        </RightNav>
      </NavigationContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  && {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: height 0.3s;
    transition: font-size 0.3s;
    padding: 0;
    z-index: 102;

    &.scrolled {
      height: 32px;
      transition: height 0.3s;

      h2 {
        font-size: 14px;
        margin-left: 32px;
        transition: all 0.3s;
      }
    }

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9000;
    background: ${({ theme }) => theme.gray2};

    /* drop shadow */
    -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0;
      margin-left: 40px;
      font-size: 24px;
      line-height: 1;
      color: ${({ theme }) => theme.primary};
      transition: all 0.3s;

      span {
        font-style: italic;
      }
    }

    .signup-links {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-right: 40px;

      a {
        font-size: 14px;
        cursor: pointer;
        font-family: ${({ theme }) => theme.titleText};
        color: ${({ theme }) => theme.primary8};
      }
    }
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  /* width: ${theme => theme.maxWidth}; */
  width: 100%;
  margin: 0 16px;

  &.scrolled {
  }
`;

const LeftNav = styled.div``;

const RightNav = styled.div`
  margin-left: auto;
`;

export default HeaderDiv;
