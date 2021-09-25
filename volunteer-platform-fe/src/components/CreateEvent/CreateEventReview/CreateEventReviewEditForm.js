import React, { useState } from 'react';
import { StyledCancelButton, StyledButton } from '../../../styled';
import { useStateValue } from '../../../hooks/useStateValue';
import {
  Icon,
  Select,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Form,
} from 'antd';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';
import RecurringEvent from '../RecurringEvent';

const { TextArea } = Input;
const { Option } = Select;

export const CreateEventReviewEditForm = props => {
  const [state, dispatch] = useStateValue();
  const { localState, setLocalState, setEdit } = props;
  const {
    nameOfEvent,
    address,
    typesOfCauses,
    volunteerRequirements,
    interest,
    numberOfVolunteers,
    phoneNumber,
    fullName,
    email,
    date,
    startTime,
    endTime,
    eventDetails,
    website,
    otherNotes,
    dynamicDates,
  } = localState;

  const [error, setError] = useState('');
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  const requirementTags = state.tags.requirements.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const isFormValid = () => {
    if (
      nameOfEvent &&
      address &&
      typesOfCauses.length > 0 &&
      volunteerRequirements.length > 0 &&
      interest.length > 0 &&
      numberOfVolunteers > 0 &&
      fullName &&
      email &&
      phoneNumber &&
      eventDetails
    ) {
      return true;
    }
  };

  const checkRequired = () => {
    if (isFormValid()) {
      setError('');
      handleForm();
    } else {
      setError('This field is required.');
    }
  };

  const handleValue = (name, value) => {
    setLocalState({
      ...localState,
      [name]: value,
    });
  };

  const handleForm = () => {
    document
      .getElementById('scroll-event-header')
      .scrollIntoView({ behavior: 'smooth' });
    setEdit(false);
  };

  return (
    <StyledDiv className={'styledReviewDiv'}>
      <div className={'iconWrapper'}>
        <StyledButtons>
          <div className="icon">
            <Icon type="save" onClick={checkRequired} />
          </div>
          <div className="icon">
            <Icon type="edit" theme="twoTone" twoToneColor="#52c41a" />
          </div>
        </StyledButtons>
      </div>
      <Form layout={'vertical'} onSubmit={() => checkRequired()}>
        <Form.Item label={'Event Name'} required>
          <div className={'input'}>
            <Input
              name={'nameOfEvent'}
              value={nameOfEvent}
              onChange={e => handleValue(e.target.name, e.target.value)}
            />
            {error && !nameOfEvent && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </div>
        </Form.Item>
        <Form.Item label={'Location'}>
          <Autocomplete
            className="google-autocomplete"
            value={address}
            onChange={e => handleValue(e.target.name, e.target.value)}
            onPlaceSelected={place => {
              handleValue('address', place.formatted_address);
            }}
            name={'address'}
            types={['address']}
            componentRestrictions={{ country: 'us' }}
          />
        </Form.Item>
        <Form.Item label={'Causes'} required>
          <div className={'errorFlex'}>
            <div className={'selectMax'}>
              <Select
                name={'Types of Causes'}
                mode="multiple"
                value={typesOfCauses}
                onChange={value => handleValue('typesOfCauses', value)}
              >
                {causeAreaTags}
              </Select>
            </div>
            <div>
              {error && !typesOfCauses.length > 0 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </div>
        </Form.Item>

        <Form.Item label={'Requirements'} required>
          <div className={'errorFlex'}>
            <div className={'selectMax'}>
              <Select
                name={'Volunteer Requirements'}
                mode="multiple"
                value={volunteerRequirements}
                onChange={value => handleValue('volunteerRequirements', value)}
              >
                {requirementTags}
              </Select>
            </div>
            <div>
              {error && !volunteerRequirements.length > 0 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </div>
        </Form.Item>
        <Form.Item label={'Interests'} required>
          <div className={'errorFlex'}>
            <div className={'selectMax'}>
              <Select
                name={'Interest'}
                mode="multiple"
                value={interest}
                onChange={value => handleValue('interest', value)}
              >
                {interestTags}
              </Select>
            </div>
            <div>
              {error && !interest.length > 0 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </div>
        </Form.Item>

        <p className={'title'}>*Point of Contact</p>
        <Form.Item label={'Name'}>
          <div className={'selectMax'}>
            <Input
              name={'fullName'}
              value={fullName}
              onChange={e => handleValue(e.target.name, e.target.value)}
            />
            {error && !fullName && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </div>
        </Form.Item>

        <Form.Item label={'Phone Number'} required>
          <div>
            <Input
              name={'phoneNumber'}
              value={phoneNumber}
              onChange={e => handleValue(e.target.name, e.target.value)}
            />
            {error && !phoneNumber && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </div>
        </Form.Item>
        <Form.Item label={'Email'}>
          <div>
            <Input
              name={'email'}
              value={email}
              onChange={e => handleValue(e.target.name, e.target.value)}
            />
            {error && !email && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </div>
        </Form.Item>
        <p className={'title'}>*When is the event?</p>
        <Form.Item required>
          <div>
            <DatePicker
              name={'Date'}
              format={'MM/DD/YYYY'}
              value={date}
              onChange={value => handleValue('date', value)}
            />
          </div>
        </Form.Item>
        <RecurringEvent
          localState={localState}
          setLocalState={setLocalState}
          dynamicDates={dynamicDates}
        />
        <p className={'title'}>*What time?</p>
        <div className={'time-wrapper'}>
          <Form.Item required>
            <div>
              <TimePicker
                name={'Start Time'}
                use12Hours
                format={'h:mm a'}
                value={startTime}
                onChange={value => handleValue('startTime', value)}
              />
            </div>
          </Form.Item>
          <div className="to-p-review">
            <p>to</p>
          </div>
          <Form.Item required>
            <div>
              <TimePicker
                name={'End Time'}
                use12Hours
                format={'h:mm a'}
                value={endTime}
                onChange={value => handleValue('endTime', value)}
              />
            </div>
          </Form.Item>
        </div>
        <p className={'title'}>*How many volunteers do you need?</p>
        <Form.Item required>
          <div className={'errorFlex'}>
            <div>
              <InputNumber
                name={'Number of Volunteers'}
                min={1}
                value={numberOfVolunteers}
                onChange={value => handleValue('numberOfVolunteers', value)}
              />
              {'  '}
              {localState.numberOfVolunteers > 1 ? 'Volunteers' : 'Volunteer'}
            </div>
            <div>
              {error && !numberOfVolunteers > 0 && (
                <span className="error-message error-span left-aligned">
                  Must be higher than 0.
                </span>
              )}
            </div>
          </div>
        </Form.Item>
        <Form.Item label={'Event Details'} required>
          <div>
            <TextArea
              name={'eventDetails'}
              placeholder={
                'What the volunteer would do at the event would go here.'
              }
              value={eventDetails}
              onChange={e => handleValue(e.target.name, e.target.value)}
              style={{ height: 115 }}
            />
            {error && !eventDetails && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </div>
        </Form.Item>
        <Form.Item label={'Website'}>
          <div>
            <Input
              name={'website'}
              value={website}
              onChange={e => handleValue(e.target.name, e.target.value)}
            />
          </div>
        </Form.Item>
        <Form.Item label={'Other Notes'}>
          <div>
            <TextArea
              name={'otherNotes'}
              placeholder={'Any additional helpful tips for the event go here.'}
              value={otherNotes}
              onChange={e => handleValue(e.target.name, e.target.value)}
              style={{ height: 115 }}
            />
          </div>
        </Form.Item>
        <div className="buttonStyles">
          <StyledCancelButton
            key="cancel"
            type="secondary"
            onClick={() => handleForm()}
          >
            Cancel
          </StyledCancelButton>
          <StyledButton
            onClick={() => checkRequired()}
            key="save"
            type="primary"
            width="fit-content"
          >
            Save and Review
          </StyledButton>
        </div>
      </Form>
    </StyledDiv>
  );
};

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .icon {
    align-items: center;
    font-size: 2rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  .to-p-review {
    margin: 5px 20px 0px 45px;
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

    &::placeholder {
      color: rgba(0, 0, 0, 0.35);
      font-size: 14px;
      font-family: ${({ theme }) => theme.bodytext};
    }
  }
`;

export default CreateEventReviewEditForm;
