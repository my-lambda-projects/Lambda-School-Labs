import React from 'react';
import { Button } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';

const LoginButton = () => {
  const { googleApi } = useAuth();

  return (
    <Button
      leftIcon={'google'}
      backgroundColor="white"
      color="#737373"
      width="300px"
      height="48px"
      rounded="2.5rem"
      boxShadow="0 0 4px rgba(0, 0, 0, 0.05), 0 0px 0px rgba(0, 0, 0, 0.08)"
      onClick={googleApi.handleSignIn}
    >
      <span>Sign in with Google</span>
    </Button>
  );
};

export default LoginButton;
