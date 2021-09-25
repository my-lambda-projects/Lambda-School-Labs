import React from 'react';
import { Link } from 'react-router-dom';
import { Link as StyledLink, Flex, Box, Image } from '@chakra-ui/core';

import logo from '../../img/logo.svg';

const Header = ({userState}) => {
  return (
    <Flex
      as="header"
      width="100%"
      justify="space-between"
      align="center"
      backgroundColor="white"
      py={5}
      px={[4, 16]}
      boxShadow="0 6px 15px 0 rgba(0,0,0,0.07);"
    >
      <Box className="logo-container" width="200px">
        <Image src={logo} alt="logo" />
      </Box>
      { userState ? (
        <Box>
          <StyledLink as={Link} to={`/${userState.googleId}/dashboard`}>
            <Image
              rounded="full"
              size="40px"
              src={userState.photoUrl}
              alt="avatar"
            />
          </StyledLink>
        </Box>
      ) : (
        <StyledLink as={Link} to="/">
          Get Started
        </StyledLink>
      )}
    </Flex>
  );
};

export default Header;
