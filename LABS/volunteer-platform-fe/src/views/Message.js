import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageThreads from '../components/Messages/MessageThreads';
import {StyledCard} from '../styled';
import GoogleApiWrapper from '../components/Map/MapContainer';

const Message = (props) => {
  console.log(props)
  return (
    <StyledMessage width={props.width}>
      <MessageThreads width={props.width} {...props}/>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
width: 100vw;
margin-left: ${props => props.width > 900 ? '-200px' : 0};
`;

Message.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Message;