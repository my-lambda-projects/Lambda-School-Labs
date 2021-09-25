import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Tooltip, Checkbox, TimePicker, Icon } from 'antd';
import styled from 'styled-components';
import { causeAreas } from '../../reducers/initialState';
import { StyledButton, StyledCancelButton } from '../../styled';
import { EditPOC } from './EditPOC';
import Autocomplete from 'react-google-autocomplete';
const { Option } = Select;
const { TextArea } = Input;

export const EditForm = ({ storedData, cancelForm, setBackToReview }) => {
  const [localState, setLocalState] = useState({ ...storedData });
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [allPOCs, setAllPOCs] = useState([1]);
  const weekdaysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekendsArr = ['Saturday', 'Sunday'];
  const options = [
    'Weekdays',
    'Weekends (Fri, Sat, Sun)',
    'Sat/Sun Only',
    'Custom',
  ];

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };

  useEffect(() => {
    let temp = [];
    for (let i = 1; i <= localState.POC.length; i++) temp.push(i);
    setAllPOCs(temp);
  }, [localState.POC]);

  useEffect(() => {
    if (localState['weekdayOptions'] === 'Custom') setShowCustomOptions(true);
    else {
      let weekends = [];
      let weekdays = [];
      switch (localState['weekdayOptions']) {
        case 'Weekdays':
          weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
          break;
        case 'Weekends (Fri, Sat, Sun)':
          weekdays = ['Friday'];
          weekends = ['Saturday', 'Sunday'];
          break;
        case 'Sat/Sun Only':
          weekends = ['Saturday', 'Sunday'];
          break;
      }
      localState.daysOfTheWeek = [...weekdays, ...weekends];
      setShowCustomOptions(false);
    }
  }, [localState['weekdayOptions']]);

  const addPOC = () => {
    localState.POC.push({
      email: '',
      fullName: '',
      phone: '',
    });
    setLocalState({ ...localState });
  };

  const removePOC = i => {
    let removed = localState.POC.splice(i, 1);
    setLocalState({ ...localState, POC: [...localState.POC] });
  };

  return (
    <>
      <StyledForm
        layout="vertical"
        onSubmit={() => setBackToReview(localState)}
      >
        <Form.Item label={'Name of Organization'}>
          <Input
            value={localState['organizationName']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'organizationName'}
            placeholder="Name of Organization"
          />
        </Form.Item>
        {localState.address ? (
          <Form.Item label="Address">
            <Autocomplete
              className="google-autocomplete"
              value={localState['address']}
              onChange={e => handleChange(e.target.name, e.target.value)}
              onPlaceSelected={place => {
                setLocalState({
                  ...localState,
                  address: place.formatted_address,
                });
              }}
              name={'address'}
              types={['address']}
              componentRestrictions={{ country: 'us' }}
            />
          </Form.Item>
        ) : (
          <Form.Item label={'Address'}>
            <Input
              value={localState['streetAddress']}
              onChange={e => handleChange(e.target.name, e.target.value)}
              name={'streetAddress'}
              placeholder="Street Address"
            />
            <div className="inline">
              <Input
                value={localState['city']}
                onChange={e => handleChange(e.target.name, e.target.value)}
                name={'city'}
                placeholder="City"
              />
              <Input
                value={localState['state']}
                onChange={e => handleChange(e.target.name, e.target.value)}
                name={'state'}
                placeholder="State"
              />
            </div>
          </Form.Item>
        )}
        <Form.Item
          label={
            <Tooltip
              title={'Select all cause areas that your organization helps.'}
            >
              Types of causes <Icon type="question-circle-o" />
            </Tooltip>
          }
        >
          <Select
            name={'causeAreas'}
            value={localState['causeAreas']}
            onChange={value => handleChange('causeAreas', value)}
            showArrow
            mode={'multiple'}
            placeholder="Select Your Causes"
          >
            {causeAreas.map(cause => (
              <Option key={cause}>{cause}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={'Point of Contacts'}>
          {localState.POC.map((poc, i) => (
            <EditPOC
              key={i}
              i={i}
              setValues={setLocalState}
              values={localState}
              removePOC={removePOC}
            />
          ))}
          <Icon
            type="plus-circle"
            style={{
              fontSize: '1.6rem',
              marginRight: '1rem',
              color: '#005A87',
            }}
            onClick={() => addPOC()}
          />
          <span style={{ color: '#005A87' }} onClick={() => addPOC()}>
            Add another point of contact.
          </span>
        </Form.Item>
        <Form.Item label={'Hours of Operation'}>
          <Select
            name="weekdayOptions"
            className="weekday-select"
            onChange={value => handleChange('weekdayOptions', value)}
            value={localState['weekdayOptions']}
            placeholder="Days of Operation"
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
        </Form.Item>
        <Form.Item label={'About Your Organization'}>
          <TextArea
            name={'aboutUs'}
            value={localState['aboutUs']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            placeholder={
              'A short paragraph such as mission, vision, and values of your non profit would go here...'
            }
            autosize
          />
          <Input
            name={'website'}
            value={[localState['website']]}
            onChange={e => handleChange(e.target.name, e.target.value)}
            placeholder="Organization Website"
          />
        </Form.Item>
      </StyledForm>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
        </StyledCancelButton>
        <StyledButton
          onClick={() => setBackToReview(localState)}
          type="primary"
          width="fit-content"
        >
          Save and Review
        </StyledButton>
      </div>
    </>
  );
};

const StyledForm = styled(Form)`
  width: 80%;
  margin: 0 auto;

  .inline {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    input {
      width: 45%;
    }
  }

  .weekday-select {
    width: 310px;
    margin: 0 auto 20px;
    display: block;
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

  .pocInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    align-items: center;

    input {
      width: 30%;
    }
  }

  .google-autocomplete {
    width: 100%;
    height: 32px;
    display: inline-block;
    padding: 4px 11px;
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid rgb(217, 217, 217);
    font-family: ${({ theme }) => theme.bodytext};

    &::placeholder{
       color: rgba(0, 0, 0, 0.35);
       font-size: 14px;
       font-family: ${({ theme }) => theme.bodytext};
    }
  }
`;
export default EditForm;
