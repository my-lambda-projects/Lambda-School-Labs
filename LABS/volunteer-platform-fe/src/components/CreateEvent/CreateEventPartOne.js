import React, { useState, useEffect } from 'react';
import { Select, Form, Input, Tooltip, Icon } from 'antd';
import { StyledButton, StyledCancelButton } from '../../styled';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';

const { Option } = Select;

export const CreateEventPartOne = props => {
  const {
    state,
    handlePageForward,
    localState,
    handleChange,
    cancelForm,
  } = props;

  const { nameOfEvent, typesOfCauses, address } = localState;
  const [error, setError] = useState('');

  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  const isFormValid = () => {
    if (nameOfEvent && typesOfCauses.length > 0 && address) return true;
  };

  const checkRequired = () => {
    if (isFormValid()) {
      setError('');
      handlePageForward();
    } else {
      setError('This field is required');
    }
  };

  return (
    <StyledDiv className={'styledDiv'}>
      <Form layout={'vertical'} onSubmit={() => checkRequired()}>
        <div className={'error-flex'}>
          <Form.Item label={'Name of Event'} required>
            <div>
              <Input
                name={'nameOfEvent'}
                value={nameOfEvent}
                placeholder="Name of Event"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !nameOfEvent && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <div className={'error-flex'}>
          <Form.Item label={'Address'} required>
            <Autocomplete
              className="google-autocomplete"
              value={address}
              onChange={e => handleChange(e.target.name, e.target.value)}
              onPlaceSelected={place => {
                handleChange('address', place.formatted_address);
              }}
              name={'address'}
              types={['address']}
              componentRestrictions={{ country: 'us' }}
            />
          </Form.Item>
        </div>
        <h4>What type of cause areas does the event help with?</h4>
        <div className={'error-flex'}>
          <Form.Item
            label={
              <Tooltip title={'Select all cause areas that your event helps.'}>
                Types of Causes <Icon type="question-circle-o" />
              </Tooltip>
            }
            required
          >
            <div className={'selectMax'}>
              <Select
                name={'typesOfCauses'}
                value={typesOfCauses}
                placeholder="Types of Causes"
                mode="multiple"
                onChange={value => handleChange('typesOfCauses', value)}
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
          </Form.Item>
        </div>

        <div className="buttonStyles">
          <div>
            <StyledCancelButton
              onClick={cancelForm}
              key="cancel"
              type="secondary"
            >
              Cancel
            </StyledCancelButton>
          </div>
          <div>
            <StyledButton type="primary" kye="primary" onClick={checkRequired}>
              Next
            </StyledButton>
          </div>
        </div>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
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

export default CreateEventPartOne;
