import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox, Form, TimePicker, Select } from 'antd';
import { StyledButton, StyledCancelButton } from '../../styled';
import moment from 'moment';
const { Option } = Select;

export const ThirdPart = ({ clickNext, storedData, clickPrevious }) => {
  const weekdaysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekendsArr = ['Saturday', 'Sunday'];
  const [localState, setLocalState] = useState({
    startTime: moment('9:00 A', 'H:mm A'),
    endTime: moment('5:00 P', 'H:mm A'),
    ...storedData,
  });
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  useEffect(() => {
    if (localState['weekdayOptions'] === 'Custom') setShowCustomOptions(true);
    else setShowCustomOptions(false);
  }, [localState['weekdayOptions']]);
  const options = [
    'Weekdays',
    'Weekends (Fri, Sat, Sun)',
    'Sat/Sun Only',
    'Custom',
  ];

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };
  return (
    <DivForStyling>
      <Form layout={'vertical'} onSubmit={() => clickNext(localState)}>
        <h4 className="align-center">What are your hours of operation?</h4>
        <h5>1. Days of the week</h5>

        <Select
          name="weekdayOptions"
          className="weekday-select"
          onChange={value => handleChange('weekdayOptions', value)}
          value={localState['weekdayOptions']}
        >
          {options.map(option => (
            <Option value={option}>{option}</Option>
          ))}
        </Select>
        {showCustomOptions && (
          <div className="daysOfWeekPicker">
            <Checkbox.Group
              className="weekdays-group"
              value={localState.weekdays}
              onChange={value => handleChange('weekdays', value)}
              name="weekdays"
              options={weekdaysArr}
            />
            <Checkbox.Group
              className="weekend-group"
              value={localState.weekends}
              onChange={value => handleChange('weekends', value)}
              name="weekends"
              options={weekendsArr}
            />
          </div>
        )}

        <h5>2. Operating Hours</h5>
        <div className="timeOfDayPicker">
          <TimePicker
            name="startTime"
            value={localState['startTime']}
            onChange={value => handleChange('startTime', value)}
            use12Hours
            format={'h:mm a'}
            minuteStep={15}
          />
          <span>to</span>
          <TimePicker
            name="endTime"
            value={localState['endTime']}
            onChange={value => handleChange('endTime', value)}
            use12Hours
            format={'h:mm a'}
            minuteStep={15}
          />
        </div>
      </Form>
      <div className="buttonStyles">
        <StyledCancelButton onClick={clickPrevious} type="primary">
          Previous
        </StyledCancelButton>
        <StyledButton onClick={() => clickNext(localState)} type="primary">
          Next
        </StyledButton>
      </div>
    </DivForStyling>
  );
};

const DivForStyling = styled.div`
  text-align: center;
  h5 {
    color: ${({ theme }) => theme.primary8};
    text-align: left;
    margin-left: 25%;
  }
  .weekday-select {
    width: 40%;
    margin: 0 auto 20px;
  }
  .daysOfWeekPicker {
    display: flex;
    justify-content: space-evenly;
    width: 70%;
    margin: 0 auto;
    height: 200px;

    .weekdays-group,
    .weekend-group {
      display: flex;
      height: 150px;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    .weekend-group {
      justify-content: space-between;
      height: 54px;
    }
  }
  .ant-checkbox-checked > .ant-checkbox-inner {
    background: ${({ theme }) => theme.primary8};
  }
  .timeOfDayPicker {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 350px;
    margin: 0 auto;
    .ant-row {
      padding-bottom: 8px;
      margin: 0;
    }
    span {
      color: ${({ theme }) => theme.primary8};
    }
  }
`;
export default ThirdPart;
