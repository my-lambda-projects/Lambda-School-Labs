import React from 'react';
import { Box } from '@chakra-ui/core';
import Cell from './Cell';

const DisabledDays = ({ days }) => {
  return (
    <>
      {[...Array(days).keys()].map(i => (
        <Cell
          className="calendar-days-item faded"
          // borderBottomWidth="1px"
          // borderBottomColor="#E0E0E0"
          // border="solid red 10px"
          key={i}
        >
          <Box backgroundColor="white" h="100%" />
        </Cell>
      ))}
    </>
  );
};

export default DisabledDays;
