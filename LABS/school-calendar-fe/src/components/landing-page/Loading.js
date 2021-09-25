import React from 'react';
import { Flex } from '@chakra-ui/core';

const Loading = () => {
  return (
    <Flex
      pos="absolute"
      align="center"
      justify="center"
      w="100%"
      h="100%"
      
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="200"
      >
        <path
          fill="#287f7d"
          d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </Flex>
  );
};

export default Loading;
