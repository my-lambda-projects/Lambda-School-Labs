import React, { useContext } from 'react';
import { DashboardContext } from '../../contexts/Contexts';
import { Flex, Box } from '@chakra-ui/core';
import Cell from '../calendar/Cell.js';
import EventsIndicator from '../events/EventIndicator';
import useDate from '../../hooks/useDate';
import dayjs from 'dayjs';

const Day = ({
  cDate,
  month,
  date,
  isPicked,
  handleSelected,
  isToday,
  day,
  i
}) => {
  function isDateLaterThanCDate(intDate, intMonth, cDate) {
    //input date format: dd/mm/yyyy
    // console.log('date: ', date)
    // console.log('intMonth: ', intMonth.format('MM'))
    // console.log('cDate: ', cDate)
    let cDateSplit = cDate.split('/');
    //=====================
    let cdd = parseInt(cDateSplit[0]);
    let cmm = parseInt(cDateSplit[1]);
    let cyyyy = parseInt(cDateSplit[2]);
    //======================
    let stringDate = `${intDate}/${intMonth.format('MM')}/${date.format(
      'YYYY'
    )}`;
    // console.log('stringDate: ', stringDate)
    let dateSplit = stringDate.split('/');
    // console.log('dateSplit: ', dateSplit)
    //=====================
    let dd = parseInt(dateSplit[0]);
    let mm = parseInt(dateSplit[1]);
    let yyyy = parseInt(dateSplit[2]);
    //====================
    if (yyyy === cyyyy && mm === cmm && dd > cdd) {
      return '#999898';
    } else if (yyyy === cyyyy && mm > cmm) {
      return '#999898';
    } else if (yyyy > cyyyy) {
      return '#999898';
    } else {
      return '#E0E0E0';
    }
  }

  // console.log('day: ', day)
  // console.log('cDate: ', cDate)

  const { events, eventDatesArr, titles } = useContext(DashboardContext);

  //checks the current Day's date (being mapped by parent Days) matches a date of an event from the google calendar api. If so, render an event indicator for each matching event.
  const matchTheEvents = () => {
    let formattedDate = `${currentYear}-${
      currentMonth + 1 < 10 ? 0 : ''
    }${currentMonth + 1}-${day < 10 ? 0 : ''}${day}`;
    //if there an event from google exists which matches this day's date create an event indicator (blue box with event name) for each
    if (eventDatesArr.includes(formattedDate)) {
      let eventTitle;
      let event;
      return eventDatesArr.map((eventDate, i) => {
        if (eventDate === formattedDate) {
          eventTitle = titles[i] ? titles[i] : 'no name';
          event = events[i];
          return (
            <EventsIndicator
              key={i}
              eventDate={formattedDate}
              event={event}
              eventTitle={eventTitle} /// Change me when you figure out
              fontSize="2px"
            />
          );
        }
      });
    }
  };

  const { currentMonth, currentYear } = useDate(date);

  //sets the background color of the calendar day when clicked in date selection mode to red if in the past or blue if present or future so it is clear to the user which dates an event can be added to.
  const setBackgroundColor = () => {
    if (isPicked === true) {
      let index = i + 1;
      let newDate = new Date();
      let thisYear = newDate.getYear() + 1900;
      //if the date is in the past (the month before this month, but still in the current year) and any date in that month is clicked, make it red. Only really useful if future groups plan to add browsing past months.
      if (currentMonth < dayjs().$M && currentYear === thisYear) {
        return '#FC8181';
      }
      //if the date is in the current month and the current year but the day is before today, and it is clicked, make it red
      else if (
        date.$D > index &&
        currentMonth === dayjs().$M &&
        currentYear === thisYear
      ) {
        return '#FC8181';
        //otherwise, given current functionality, it is possible to add an event to that day so make it blue
      } else {
        return 'brand.blue_primary';
      }
    }
  };

  return (
    <Cell
      className="calendar-days-item"
      height="80px"
      key={i}
      width={'100%'}
      style={{ border: 's/olid yellow 10px' }}
    >
      <Flex
        direction="row"
        style={{ border: '.5px solid #E0E0E0' }}
        // align="center"
        justify="flex-start"
        h="100%"
        // p={2}
        backgroundColor={setBackgroundColor()}
        color={isPicked ? 'white' : 'inherit'}
        onClick={() => {
          handleSelected();
        }}
      >
        <Box
          as="span"
          fontSize={['xs', 'm']}
          fontWeight={700}
          m={[0, 2]}
          color={
            isToday
              ? 'brand.blue_primary'
              : isDateLaterThanCDate(day, month, cDate)
          }
        >
          {day}
        </Box>
        <div>{eventDatesArr && matchTheEvents()}</div>
      </Flex>
    </Cell>
  );
};
export default Day;
