import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Hamburger from './Hamburger/TopNav.js';
import AddEventButton from '../events/AddEventButton.js';
import calendarBtnInactive from '../navigation/NavImgs/Calendar Button-Inactive.png';
import calendarBtnActive from '../navigation/NavImgs/Calendar Button-Active.png';
import settingsBtnActive from '../navigation/NavImgs/Settings Button-Active.png';
import settingsBtnInactive from '../navigation/NavImgs/Settings Button-Inactive.png';
import groupsBtnInactive from '../navigation/NavImgs/Group Button-Inactive.png';
import groupsBtnActive from '../navigation/NavImgs/Group Button-Active.png';
import eventsBtnInactive from '../navigation/NavImgs/Events Button-Inactive.png';
import eventsBtnActive from '../navigation/NavImgs/Events Button-Active.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import TemplateContainer from '../events/TemplateContainer';
import Groups from '../groups/Groups';
import EventsContainer from '../events/EventsContainer';
import GroupsContainer from '../groups/GroupsContainer';
import { Context } from '../../contexts/Contexts';

const Nav = () => {
  const {
    setNavState,
    colors,
    setFormOpen,
    setSelected,
    setToggleNav,
    setTemplateFormOpen
  } = useContext(Context);
  // this controls the direction of arrows
  // and the display of active button
  const [isDisplayingEvents, setIsDisplayingEvents] = useState(false);
  const [isDisplayingGroups, setIsDisplayingGroups] = useState(false);
  const [isDisplayingCalendar, setIsDisplayingCalendar] = useState(false);
  const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);
  // this controls popout divs
  const [eventsPopoutVisible, setEventsPopoutVisible] = useState(false);
  const [calendarPopoutVisible, setCalendarPopoutVisible] = useState(false);
  const [groupsPopoutVisible, setGroupsPopoutVisible] = useState(false);

  // this allows the app to display components either in
  // desktop or mobile view, depending on user viewport
  const { height, width } = useWindowDimensions();

  // handles behavior of the Calendar tab
  const handleCalendar = () => {
    // toggle arrows and active button for this tab
    setIsDisplayingCalendar(!isDisplayingCalendar);
    // force toggle-off for all the other tabs
    setIsDisplayingEvents(false);
    setIsDisplayingGroups(false);
    setIsDisplayingSettings(false);
    // controls how the tab behaves in desktop view
    if (width >= 768) {
      // toggle popout div
      setCalendarPopoutVisible(!isDisplayingCalendar);
      // force toggle-off other popout divs
      setEventsPopoutVisible(false);
      setGroupsPopoutVisible(false);
      // set the view to the right of the sidebar
      setNavState(0);
      // controls how the tab behaves in mobile view
    } else {
      // disable popout
      setCalendarPopoutVisible(false);
      // set the view on the page
      setNavState(0);
    }
  };

  // handles behavior of the Events tab
  const handleEvents = () => {
    // toggle arrows and active button for this tab
    setIsDisplayingEvents(!isDisplayingEvents);
    // force toggle-off for all the other tabs
    setIsDisplayingCalendar(false);
    setIsDisplayingGroups(false);
    setIsDisplayingSettings(false);
    // controls how the tab behaves in desktop view
    if (width >= 768) {
      // toggle popout div
      setEventsPopoutVisible(!isDisplayingEvents);
      // force toggle-off other popout divs
      setCalendarPopoutVisible(false);
      setGroupsPopoutVisible(false);
      // set the view to the right of the sidebar
      setNavState(0);
      // controls how the tab behaves in mobile view
    } else {
      // disable popout
      setEventsPopoutVisible(false);
      // set the view on the page
      setNavState(1);
    }
  };

  // handles behavior of the Groups tab
  const handleGroups = e => {
    e.stopPropagation();
    // toggle arrows and active button for this tab
    setIsDisplayingGroups(!isDisplayingGroups);
    // force toggle-off for all the other tabs
    setIsDisplayingCalendar(false);
    setIsDisplayingEvents(false);
    setIsDisplayingSettings(false);
    // controls how the tab behaves in desktop view
    if (width >= 768) {
      // toggle popout div
      setGroupsPopoutVisible(!isDisplayingGroups);
      // force toggle-off other popout divs
      setEventsPopoutVisible(false);
      setCalendarPopoutVisible(false);
      // set the view to the right of the sidebar
      setNavState(0);
      // controls how the tab behaves in mobile view
    } else {
      // disable popout
      setGroupsPopoutVisible(false);
      // set the view on the page
      setNavState(2);
    }
  };

  // handles behavior of the Settings tab
  const handleSettings = () => {
    setIsDisplayingSettings(!isDisplayingSettings);
    // force toggle-off for all the other tabs
    setIsDisplayingCalendar(false);
    setIsDisplayingEvents(false);
    setIsDisplayingGroups(false);
    if (width >= 768) {
      // force toggle-off other popout divs
      setCalendarPopoutVisible(false);
      setEventsPopoutVisible(false);
      setGroupsPopoutVisible(false);
    }
  };

  //icon and label colors change based on navState
  return (
    <Container>
      <NavContainer>
        {/* calendar tab */}
        <IconDiv className="calendarIcon" onClick={handleCalendar}>
          <div className="popout-div">
            <Img
              src={
                isDisplayingCalendar ? calendarBtnActive : calendarBtnInactive
              }
            />
            <Label style={{ color: isDisplayingCalendar ? '#28807D' : 'gray' }}>
              Calendar
            </Label>
            <Arrow
              className={
                isDisplayingCalendar
                  ? 'fas fa-chevron-up'
                  : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
          {calendarPopoutVisible && (
            <CalendarPlaceholder>calendar placeholder</CalendarPlaceholder>
          )}
        </IconDiv>
        {/* events tab */}
        <IconDiv className="eventsIcon" onClick={handleEvents}>
          <div className="popout-div">
            <Img
              src={isDisplayingEvents ? eventsBtnActive : eventsBtnInactive}
              style={{
                fontSize: '2rem',
                color: colors[0]
              }}
            />
            <Label style={{ color: isDisplayingEvents ? '#28807D' : 'gray' }}>
              Events
            </Label>
            <Arrow
              className={
                isDisplayingEvents ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
          {eventsPopoutVisible && (
            <EventsPlaceholder>
              <EventsContainer />
            </EventsPlaceholder>
          )}
        </IconDiv>
        {/* groups tab */}
        <IconDiv className="groupIcon" onClick={e => handleGroups(e)}>
          <div className="popout-div">
            <Img
              src={isDisplayingGroups ? groupsBtnActive : groupsBtnInactive}
            />
            <Label style={{ color: isDisplayingGroups ? '#28807D' : 'gray' }}>
              Groups
            </Label>
            <Arrow
              className={
                isDisplayingGroups ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
          {groupsPopoutVisible && (
            <GroupPlaceholder>
              <GroupsContainer />
            </GroupPlaceholder>
          )}
        </IconDiv>
        {/* settings tab */}
        <IconDiv className="settingsIcon" onClick={handleSettings}>
          <div className="popout-div">
            <Img
              src={
                isDisplayingSettings ? settingsBtnActive : settingsBtnInactive
              }
            />

            <Label style={{ color: isDisplayingSettings ? '#28807D' : 'gray' }}>
              Settings
            </Label>
            <Arrow
              className={
                isDisplayingSettings
                  ? 'fas fa-chevron-up'
                  : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
        </IconDiv>
        {width < 768 && (
          <IconDiv className={isDisplayingEvents ? 'addEventIcon' : 'eventBtn'}>
            <AddEventButton />
            <Label style={{ color: 'gray', marginTop: '6px' }}>Add Event</Label>
          </IconDiv>
        )}
      </NavContainer>
      {isDisplayingSettings && <Hamburger />}
    </Container>
  );
};

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const CalendarPlaceholder = styled.div`
  width: 90%;
  border: 1px solid gray;
`;

const EventsPlaceholder = styled.div`
  width: 100%;
  //border: 1px solid gray;
`;

const GroupPlaceholder = styled.div`
  width: 250px;
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 3% 2.5%;
  border-top: 1px solid #f2f2f2;
  background: white;

  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
    height: 80%;
    padding-top: 15vh;
    justify-content: flex-start;

    .eventBtn {
      display: none !important;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #f2f2f2;
  background: white;
  font-family: 'Open Sans', sans-serif;

  @media ${device.desktop} {
    position: static;
    z-index: 100;
    border-top: 1px solid #f2f2f2;
    background: white;
    max-width: 25%;
    height: 100%;
    left: 0;

    .eventsIcon {
      order: 1;
    }
    .groupIcon {
      order: 3;
    }
    .calendarIcon {
      order: 4;
    }
    .settingsIcon {
      order: 5;
    }
    .addEventIcon {
      order: 2;
    }
  }
`;
const IconDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }

  @media ${device.desktop} {
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 8%;

    .popout-div {
      display: flex;
      align-items: center;
      margin-bottom: 3%;
    }

    .addEventText {
      margin-left: 20px;
    }
    .groupsText {
      padding: ;
    }
  }
`;
const Label = styled.p`
  font-size: 14px;

  @media ${device.desktop} {
    font-size: 18px;
  }
`;

const Img = styled.img`
  margin-bottom: 10px;

  @media ${device.desktop} {
    margin-right: 20px;
  }
`;

const Arrow = styled.i`
  display: none;

  @media ${device.desktop} {
    display: block !important;
    color: gray;
    font-size: 1.4rem;
    margin-left: 30%;
  }
`;
export default Nav;
