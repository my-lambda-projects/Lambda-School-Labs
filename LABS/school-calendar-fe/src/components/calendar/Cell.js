import React from 'react';
import { Box } from '@chakra-ui/core';

// Displays day and event indicators
const Cell = ({ children, fontSize = 'lg', fontWeight = 300, ...props }) => (
  <Box
    fontSize={fontSize}
    fontWeight={fontWeight}
    textAlign="center"
    {...props}
  >
    {children}
  </Box>
);

export default Cell;
