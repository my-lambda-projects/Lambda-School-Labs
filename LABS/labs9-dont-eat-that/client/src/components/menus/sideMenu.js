import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Responsive, Message } from 'semantic-ui-react';

import ourColors from '../../ColorScheme';

class SideMenu extends React.Component {
  // side menu should be hidden when landing page is shown
  // Landing page is displayed when user is not loggedin and path is '/'
  state = { activeItem: window.location.pathname };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  componentDidMount() {
    // below setInterval is to detect URL changes and make sure the side menu focus is
    // on right menu.
    // without this, URL changes from create/delete recipe won't change the focus of side menu
    // so the focus would be in wrong menu
    // tried to use some kind of event listener but couldn't find right one

    setInterval(() => {
      if (this.state.activeItem !== window.location.pathname) {
        this.setState({ activeItem: window.location.pathname });
      }
    }, 700);
  }

  renderSideMenu = item => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/signin' ||
      window.location.pathname === '/signup'
    ) {
      return null;
    } else {
      return (
        <Responsive minWidth={771}>
          <Menu
            pointing
            vertical
            className='sideMenu'
            style={{ background: ourColors.menuColor }}
          >
            <NavLink to='/recipes'>
              <Menu.Item
                name='/recipes'
                active={item === '/recipes'}
                onClick={this.handleItemClick}
              >
                Recipes List
              </Menu.Item>
            </NavLink>
            <NavLink to='/recipes/new'>
              <Menu.Item
                name='/recipes/new'
                active={item === '/recipes/new'}
                onClick={this.handleItemClick}
              >
                New Recipe
              </Menu.Item>
            </NavLink>
            <NavLink to='/recipes/import'>
              <Menu.Item
                name='/recipes/import'
                active={item === '/recipes/import'}
                onClick={this.handleItemClick}
              >
                Import Recipe
              </Menu.Item>
            </NavLink>
            <NavLink to='/billing'>
              <Menu.Item
                name='/billing'
                active={item === '/billing'}
                onClick={this.handleItemClick}
              >
                Billing
              </Menu.Item>
            </NavLink>
            <NavLink to='/settings'>
              <Menu.Item
                name='/settings'
                active={item === '/settings'}
                onClick={this.handleItemClick}
              >
                Settings & Allergies
              </Menu.Item>
            </NavLink>
          </Menu>
          {!localStorage.getItem('uid') ? (
            <Message
              style={{ maxWidth: '240px', background: ourColors.formColor }}
            >
              <Message.Header>Signup/Login for Full Features!</Message.Header>
            </Message>
          ) : null}

          {(window.location.pathname === '/recipes/new' &&
            localStorage.getItem('uid')) ||
          window.location.pathname.indexOf('/edit') > 0 ? (
            <Message
              style={{ maxWidth: '240px', background: ourColors.formColor }}
            >
              <Message.Header>Image Upload</Message.Header>
              <p>Drop a file or browse an image, then hit upload image!</p>
            </Message>
          ) : null}
          {window.location.pathname === '/settings' &&
          localStorage.getItem('uid') ? (
            <Message
              style={{ maxWidth: '240px', background: ourColors.formColor }}
            >
              <Message.Header>Allergy Notications</Message.Header>
              <Message.List>
                <Message.Item>Recipes will be bordered in maroon</Message.Item>
                <Message.Item>
                  Ingredients will be highlighted in maroon
                </Message.Item>
              </Message.List>
            </Message>
          ) : null}
        </Responsive>
      );
    }
  };

  render() {
    const { activeItem } = this.state;
    return this.renderSideMenu(activeItem);
  }
}
export default SideMenu;
