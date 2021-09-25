import React from "react";
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import styled from "styled-components";

const MenuItem = props => {

  const ItemText = styled.span`



  `;

  const handleClick = (e, text) => {

    if (props.signOut) {
      props.signOut();
      document.querySelector('#sidebar-Home-link').click();
    } else {
      document.querySelector(`#sidebar-${ props.path }-link`).click();
    }
  }

  return (
    <>
      <Menu.Item style={{ minWidth: '0', }} onClick={ handleClick } as='a'>
        <Icon size='big' name={ props.icon } />
        <ItemText hidden={ props.mobile }>{ props.text }</ItemText>
      </Menu.Item>
      <NavLink hidden id={ `sidebar-${ props.path }-link` } to={ props.path }/>
    </>
  );
}

const VerticalSidebar = props => {

  const width = props.mobile ? 'very thin' : 'thin';

  const menuItems = !props.signedIn ?
  [
    { icon: 'home',        text: 'Home',         path: 'Home',        },
    { icon: 'sign-in',     text: 'Sign In',      path: 'SignIn',      },
    { icon: 'signup',      text: 'Sign Up',      path: 'SignUp',      },
  ] :
  [
    { icon: 'home',        text: 'Home',         path: 'Home',        },
    { icon: 'exclamation', text: 'Alert Feed',   path: 'AlertFeed',   },
    { icon: 'plus',        text: 'Create Alert', path: 'CreateAlert', },
    { icon: 'cog',         text: 'Settings',     path: 'Settings',    },
    { icon: 'sign-out',    text: 'Sign Out',     path:  ''            },
  ];

  const mapMenuItems = items => {
    return items.map((item, i) => {
      return (
        <MenuItem
          key={ i }
          { ...props }
          { ...item }
          signOut={ item.text === 'Sign Out' ? props.signOut : null }
        />
      );
    });
  };

  return (
    <Sidebar
      as={ Menu }
      animation={"push"}
      direction={"left"}
      icon="labeled"
      inverted
      vertical
      visible={ true }
      width={width}
    >
      <LogoContainer>
        <LogoText hidden={ props.mobile }>Alertifi</LogoText>
      </LogoContainer>
      { mapMenuItems(menuItems) }
    </Sidebar>
  );
};

VerticalSidebar.propTypes = {
  mobile: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

export default VerticalSidebar;

const LogoContainer = styled.div`
  height: 60px;
  /* border: 1px solid white; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.h2`
  color: white;
`;
