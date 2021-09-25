import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { checkUserRegistered, signOut } from '../../actions';
import { Menu, Tooltip, Badge, Icon } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../../hooks/useStateValue';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Navigation = props => {
  const [state, dispatch] = useStateValue();
  const [current, setCurrent] = useState('Home');

  const pathNames = {
    '/dashboard': 'Home',
    '/create-org': 'Create Org',
    '/org-dashboard': 'Org Dashboard',
    '/login': state.auth.loggedIn ? 'Logout' : 'Login',
  };

  useEffect(() => {
    setCurrent(pathNames[props.location.pathname]);
  }, [props.location.pathname]);

  const handleClick = e => {
    if (e.key === 'Sign Out') {
      signOut(dispatch);
    }
  };

  const getNumberOfMessages = id => {
    let number = 0;
    if (state.messages && state.messages.messages[id]) {
      number = state.messages.messages[id].reduce((acc, thread) => {
        return acc + thread.unreadMessages;
      }, 0);
    }
    return number;
  };

  const NavbarMenuLink = ({ to, disabled, children, ...rest }) => {
    const NavbarLink = ({ ...props }) => {
      return (
        <Link to={to} {...props}>
          {children}
        </Link>
      );
    };
    return disabled ? (
      <Tooltip placement="left" trigger="click" title="Coming soon!">
        <NavbarLink style={{ color: '#00000033' }} />
      </Tooltip>
    ) : (
      <NavbarLink />
    );
  };

  return (
    <StyledNavigation>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
        <Menu.Item className="nav-name" key="Profile">
          {state.auth.registeredUser && state.auth.registeredUser.firstName ? (
            state.auth.googleAuthUser ? (
              <NavbarMenuLink to={`/profile/${state.auth.googleAuthUser.uid}`}>
                {`${state.auth.registeredUser.firstName} ${
                  state.auth.registeredUser.lastName[0]
                }.`}
              </NavbarMenuLink>
            ) : (
              `${state.auth.registeredUser.firstName} ${
                state.auth.registeredUser.lastName[0]
              }.`
            )
          ) : (
            <Loader type="ThreeDots" color="#00000022" width={50} height={40} />
          )}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={'Messages'}>
          <Link
            to={{
              pathname: '/messages',
              state: {
                uid: state.auth.googleAuthUser
                  ? state.auth.googleAuthUser.uid
                  : null,
              },
            }}
          >
            <Badge
              className={'message-badge'}
              count={getNumberOfMessages(
                state.auth.googleAuthUser ? state.auth.googleAuthUser.uid : null
              )}
            >
              <span style={{ marginRight: '1rem' }}>Messages</span>
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="Home">
          <Link to={'/dashboard'}>Browse</Link>
        </Menu.Item>
        {state.org.createdOrg && <Menu.Divider />}
        {state.org.createdOrg &&
          state.org.userOrganizations.map(org => {
            return (
              <Menu.SubMenu key={org.orgId} title={org.organizationName}>
                <Menu.Item key={'Dashboard'}>
                  <Link
                    to={{
                      pathname: '/org-dashboard',
                      state: {
                        org: org,
                      },
                    }}
                  >
                    <span style={{ marginRight: '1rem' }}>Dashboard</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key={'Messages'}>
                  <Link
                    to={{
                      pathname: '/messages',
                      state: {
                        uid: org.orgId,
                      },
                    }}
                  >
                    <Badge
                      className={'message-badge'}
                      count={getNumberOfMessages(org.orgId)}
                    >
                      <span style={{ marginRight: '1rem' }}>Messages</span>
                    </Badge>
                  </Link>
                </Menu.Item>
                <Menu.Item key={'Create Event'}>
                  <Link
                    to={{
                      pathname: '/org-dashboard/create-event',
                      state: {
                        org: org,
                      },
                    }}
                  >
                    <span style={{ marginRight: '1rem' }}>Create Event</span>
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
            );
          })}
        {state.auth.loggedIn &&
          (state.auth.registeredUser &&
            state.auth.registeredUser.firstName) && (
            <Menu.Item key={'Create Org'}>
              <Icon type="plus-circle" />
              <span>
                <Link to={'/create-org'}>New Organization</Link>
              </span>
            </Menu.Item>
          )}
        <Menu.Divider />
        <Menu.Item className="nav-bottom" key={'Sign Out'}>
          <Link to="/dashboard">Sign Out</Link>
        </Menu.Item>
        <Menu.Item className="nav-bottom">
          <Link to="#">Support</Link>
        </Menu.Item>
      </Menu>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div`
  text-align: left;
  font-size: 14px;

  a {
    color: black;
  }

  .nav-name {
    text-align: left;
    color: ${props => props.theme.primary};
    font-size: 16px;
    padding: 10px 0 40px 10px;
  }

  .nav-bottom a {
    color: ${props => props.theme.gray7};
  }

  .nav-bottom a:hover {
    color: ${props => props.theme.primary8};
  }

  .avatar {
    display: flex;
    justify-content: center;
    margin: 3rem 0;
  }
  span > p {
    color: white;
  }

  .message-badge > sup {
    background-color: ${props => props.theme.primary8};
  }

  .message-badge > sup > span > p {
    color: white;
  }
`;

export default withRouter(Navigation);
