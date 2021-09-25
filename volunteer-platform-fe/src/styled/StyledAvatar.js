import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

export const StyledAvatar = ( { ...rest } ) => {
  return ( <StyledAvatarComponent { ...rest }/> );
};

const StyledAvatarComponent = styled( Avatar )`


`;