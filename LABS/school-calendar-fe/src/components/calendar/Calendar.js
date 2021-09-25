import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Flex, Grid, Box } from '@chakra-ui/core';
import Days from './Days';
import styled from 'styled-components';

const Calendar = ({ month, i }) => {
  // state to display cuurent date
  const [date, setDate] = useState(dayjs());

  // console.log('date: ', date)

  useEffect(() => {
    setDate(month);
  }, []);

  return (
    <Box
      id={i}
      className="calendar"
      backgroundColor="white"
      borderRadius="10px"
    >
      <Flex className="header" align="center" justify="center" py={4}>
        <MonthNameContainer>
          <MonthName className="heading">
            {month.format('MMMM')} {date.format('YYYY')}
          </MonthName>
        </MonthNameContainer>
      </Flex>
      {/* <Grid
        className="calendar-days-grid"
        // templateColumns="repeat(7, 0fr)"
        textAlign="right"
        style={{ width: '100%', border: 'solid green 10px' }}
      > */}
      <Days month={month} date={date} />
      {/* </Grid> */}
    </Box>
  );
};

//not sure that this is strictly necessary. did this while tracking down the weird infinite calendar refresh bug.
const MemoizedCal = React.memo(Calendar);
export default MemoizedCal;

const MonthName = styled.h2`
  color: #28807d;
  font-weight: bold;

  font-size: 1.2rem;
  line-height: 19px;
`;

const MonthNameContainer = styled.div`
  // background: red;
  width: 12%;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 1700px) {
    width: 30%;
  }
  @media (max-width: 1400px) {
    width: 25%;
  }
  @media (max-width: 1120px) {
    width: 35%;
  }
  @media (max-width: 860px) {
    width: 40%;
  }
`;
