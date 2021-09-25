import React, { useState, useEffect, useContext } from 'react';
import { Context, DashboardContext } from '../../contexts/Contexts';
import { Box, Grid } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import dayjs from 'dayjs';
import ConfirmDatesBtn from '../events/ConfirmDatesBtn';
import InfiniteCal from '../calendar/InfiniteCal';
import Cell from '../calendar/Cell.js';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';

import EventPage from '../events/EventPage';
import useWindowDimensions from '../../hooks/useWindowDimensions';

//gets list of templates from backend
const getTemplateList = async ({ googleId, token }) => {
  try {
    const response = await axiosWithAuth(token).get(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
    );
    return response.data.templates;
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = () => {
  const {
    setSelected,
    toggleNav,
    setToggleNav,
    setNavState,
    formOpen,
    setTemplateList
  } = useContext(Context);

  const { height, width } = useWindowDimensions();

  //google OAuth2
  const { googleApi, api } = useAuth();
  const { currentUser } = googleApi;

  //gets list of templates from backend when the user or date selection mode has changed, may be unnecessary given new organization of components
  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  // state for full user objects from calendar api
  const [events, setEvents] = useState(null);

  const [event, setEvent] = useState({});

  //array of only the formatted date strings of events from calendar api
  const [eventDatesArr, setEventDatesArr] = useState([]);

  //array of only event name strings from calendar api
  const [titles, setTitles] = useState([]);

  //array of weekdays which sits at top of calendar
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDaysDesktop = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  // event display flag
  const [eventDisplay, setEventDisplay] = useState(false);

  // events updated flag
  const [eventsUpdated, setEventsUpdated] = useState(false);

  // get events from api and set to state
  useEffect(() => {
    const loadEvents = async () => {
      await console.log('reloading events from gapi');
      try {
        const data = await api.listEvents();
        setEvents(data);
        let titlesArray = [];
        let formattedEvents = data.map(event => {
          console.log('*', event);
          titlesArray.push(event.summary); // Do not change this to title - coming as summary from GAPI
          return event.start.dateTime.substring(0, 10);
        });
        console.log('hello', titlesArray);
        setTitles(titlesArray);
        setEventDatesArr(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };
    loadEvents();
    const reloadEvents = async () => {
      if (eventsUpdated) {
        await loadEvents();
        setEventsUpdated(false);
      }
    };
    reloadEvents();
  }, [eventsUpdated]);

  //helper function to loop through and create months in the future based on number passed into the function
  const nextMonth = numOfMonths => {
    let arr = [];
    for (let i = 0; i < numOfMonths; i++) {
      arr.push(dayjs().add(i, 'month'));
    }
    return arr;
  };

  //sets array of months based on number passed in to give to the infinite list as a starting number (items naming convention from react-window)
  const [items, setItems] = useState(nextMonth(50));

  return (
    <Div>
      {/* {toggleNav && <Hamburger />} */}
      {/*toggle nav toggles off nav to indicate in date selection mode, this changes the header to reflect this*/}
      {toggleNav === false && (
        <Container>
          <Cancel
            onClick={() => {
              setToggleNav(true);
              setNavState(1);
              setSelected([]);
            }}
          >
            &#60; Back
          </Cancel>
          <Title>Select Dates</Title>
          <BtnDiv></BtnDiv>
        </Container>
      )}
      <Box
        maxHeight="90vh"
        style={{
          marginTop: toggleNav ? 0 : window.innerHeight * 0.079
        }}
      >
        <Grid
          width="100%"
          // gap={4}
          templateColumns={
            width <= 768 ? ['1fr', '250px 1fr'] : ['1fr', '0px 1fr']
          }
          gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
        >
          <Box className="calendarArea" gridArea="main" backgroundColor="white">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                className="calendar"
                backgroundColor="#F8F8F8"
                style={{ width: '100%', height: '40px' }}
              >
                <Grid
                  className="weekdays-grid"
                  templateColumns="repeat(7, 1fr)"
                  textAlign="right"
                  background='white'
                >
                  {window.innerWidth <= 768
                    ? weekDays.map(d => (
                        <Cell
                          className="weekdays-item"
                          fontSize={['lg', '3xl']}
                          height="auto"
                          key={d}
                        >
                          {d}
                        </Cell>
                      ))
                    : weekDaysDesktop.map(d => (
                        <Cell
                          className="weekdays-item"
                          fontSize={['lg', '3xl']}
                          height="auto"
                          key={d}
                        >
                          {d}
                        </Cell>
                      ))}
                </Grid>
              </Box>
              <DashboardContext.Provider
                value={{
                  api,
                  events,
                  event,
                  setEvent,
                  eventDisplay,
                  setEventDisplay,
                  setEventsUpdated,
                  eventDatesArr,
                  titles
                }}
              >
                {eventDisplay && (
                  <EventBoxContainer>
                    <EventPage event={event} />
                  </EventBoxContainer>
                )}
                {items.length > 0 && <InfiniteCal items={items} />}
                {toggleNav === false && <ConfirmDatesBtn />}
              </DashboardContext.Provider>

              {/* {toggleNav === false && <ConfirmDatesBtn/>} */}
            </div>
          </Box>
        </Grid>
      </Box>
    </Div>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5% 2.5% 2.5% 2.5%;
  position: fixed;
  top: 0;
  background: white;
`;

const Cancel = styled.p`
  width: 40%;
  font-size: 20px;
  line-height: 27px;
  color: #28807d;
`;

const Title = styled.h1`
  width: 60%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
`;

const BtnDiv = styled.div`
  width: 40%;
  height: 40%;
  display: flex;
  justify-content: flex-end;
`;

const EventBoxContainer = styled.div`
  height: 50%;
  width: 80%;
  position: absolute;
  z-index: 1;
  margin: auto;
  @media (min-width: 500px) {
    height: 40%;
    width: 40%;
  }
`;

const Div = styled.div`
  width: 75%;
`;
