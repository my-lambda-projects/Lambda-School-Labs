import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

export const MenuButton = ({ collapsed, setCollapsed }) => {
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
    <StyledMenuButton
      collapsed={collapsed ? 1 : 0}
      className={`trigger ${scrollClass}`}
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={() => setCollapsed(!collapsed)}
    />
  );
};

const StyledMenuButton = styled(Icon)`
  && {
    position: fixed;
    top: 16px;
    /* left: ${props => (props.collapsed ? '16px' : '216px')}; */
    left: 16px;
    font-size: 2rem;
    line-height: 1;
    z-index: 9001;
    transition: top 0.2s;
    transition: font-size 0.2s;

    &.scrolled {
      font-size: 1rem;
      transition: font-size 0.2s;
      top: 9px;
      transition: top 0.3s;
    }
  }
`;

export default MenuButton;
