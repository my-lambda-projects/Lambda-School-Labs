import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Icon, } from 'semantic-ui-react';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs.js';

const Topbar = props => {
  return (

    <TopbarContainer>
      <Breadcrumbs sections={ [{ name: 'Create Alert'}, { name: 'Alert'}, { name: 'Couch'}, ] }/>
      <Icon name='bell' size='large' fitted />
    </TopbarContainer>

  );
}

Topbar.propTypes = {

};

export default Topbar;

const TopbarContainer = styled.div`

  /* border: 1px solid black; */
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
