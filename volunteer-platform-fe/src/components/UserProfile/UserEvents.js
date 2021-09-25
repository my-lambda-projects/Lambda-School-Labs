import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { Collapse, DatePicker, Button } from 'antd';
import { StyledCard, StyledButton } from '../../styled';

const {Panel} = Collapse;

export const UserEvents = ({ events, changePanel, calendarValue, selectDate, selectedDate, displayAll, unRegister }) => {

  const filterEvents = (arr, property) => {
    return arr.filter(event => {
      const isBigger = event[ property ] >= selectedDate;
      const lessThanNextDay =
        event[ property ] <
        moment
          .unix(selectedDate)
          .add(1, 'day')
          .startOf('day')
          .unix();
      
      if (isBigger && lessThanNextDay){
        return true;
      }
      return false;
    });
  };
  
  let selectedEvents = events ? [...events] : [];
  if (selectedDate){
    selectedEvents = filterEvents(selectedEvents, 'date');
  }
  selectedEvents.sort((a, b) => a.nextDate - b.nextDate);
  
  const PanelHeader = (props) => {
    return (
        <div className='panel-header'>
            <span>{props.event.nameOfEvent}</span>
            <span>{moment.unix(props.event.date).format('MM/DD/YY')}</span>
        </div>
    )
  }

  return (
    <CustomStyledCard>
      {selectedEvents.length > 0 || selectedDate ? (
        <UpperDiv>
          <h2>Upcoming Events</h2>
          <DatePicker 
            onChange={selectDate} 
            onPanelChange={changePanel}
            allowClear={false}
            value={calendarValue}
            style={{margin: '1rem 0'}}/>
          {selectedDate && <p>Selected date: {moment.unix(selectedDate).format('LL')}</p>}
          <CustomButton type='link' onClick={displayAll} width='200px'>Display All Events</CustomButton>
        </UpperDiv>
      ) : (
        <UpperDiv>You have not signed up for any events yet</UpperDiv>
      )}
      {selectedEvents.length > 0 && (
        <ScrollbarDiv>
          <Collapse accordion bordered={false} style={{ background: 'white' }}>
            {selectedEvents.map(event => {
              return (
                <StyledPanel
                  header={<PanelHeader event={event}/>}
                  key={event.eventId + '-' + event.date}
                >
                  <div className='panel-content'>
                    <div>
                      <h5>Date: {moment.unix(event.date).format('LL')}</h5>
                      <h5>Time: {`${event.startTime}~${event.endTime}`}</h5>
                      <h5>Location: {event.location}</h5>
                      <h5>Point of Contact</h5>
                      <p>Name: {event.pointOfContact && event.pointOfContact.fullName}</p>
                      <p>Phone: {event.pointOfContact && event.pointOfContact.phoneNumber}</p>
                      <CustomButton>
                        <Link 
                          to={{
                            pathname: `/events/${event.eventId}`,
                            state: { selectedDate: event.date}
                        }}>
                          View event details
                        </Link>
                      </CustomButton>
                    </div>
                    <div>
                      <StyledButton onClick={(e) => unRegister(e, event.eventId, event.date, event.isRecurring)} style={{ marginTop: '1rem'}}>Cancel</StyledButton>
                    </div>
                  </div>
                </StyledPanel>
              );
            })}
          </Collapse>
        </ScrollbarDiv>
      )}
    </CustomStyledCard>
  );
};

const StyledPanel = styled(Panel)`
  && {
    background: white;
    border-radius: 4px;
    margin: 1rem 0;
    overflow: hidden;

    .ant-collapse-header {
      border: 1px solid ${({theme}) => theme.gray5};
      background: ${({theme}) => theme.gray2};
      border-radius: 0px 0px 4px 4px;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
    }

    .panel-content {
      display: flex;
      justify-content: space-around;
    }
  }
`;

const ScrollbarDiv = styled.div`
  height: 340px;
  overflow-y: scroll;
  padding: 1rem 1.5rem;

  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.gray3};
    border-radius: 16px;
  }

  ::-webkit-scrollbar-track {
    background: white; 
  }
`

const UpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;

  h2{
      margin: 1rem 0;
  }
`;

const CustomStyledCard = styled(StyledCard)`
  && {
    width: 500px;
    background: white;
    border-radius: 0px;
    margin-top: 2rem;
    box-shadow: none;
    border-radius: 3px;
    
    .ant-card-body {
      padding: 0;
    }
  }
`
const CustomButton = styled(Button)`
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.6);

  :hover {
    color: ${({theme}) => theme.primary7};
  }
`

export default UserEvents;
