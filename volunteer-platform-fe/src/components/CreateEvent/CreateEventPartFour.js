import React, { useState, useEffect } from 'react';
import { StyledCancelButton, StyledButton } from '../../styled';
import styled from 'styled-components';
import { Input, InputNumber, Form } from 'antd';

const { TextArea } = Input;

export const CreateEventPartFour = props => {
  const [error, setError] = useState('');
  const { handlePageBack, handlePageForward, localState, handleChange } = props;

  const { website, numberOfVolunteers, otherNotes } = localState;

  const isFormValid = () => {
    if (numberOfVolunteers) {
      return true;
    }
  };

  const checkedRequired = () => {
    if (isFormValid()) {
      setError('');
      handlePageForward();
    } else {
      setError('This field is required.');
    }
  };

  return (
    <StyledDiv className={'styledDiv'}>
      <Form layout={'vertical'} onSubmit={() => checkedRequired()}>
        <h4>Do you have a website?</h4>
        <div className={'error-flex'}>
          <Form.Item label={'Website'}>
            <div>
              <Input
                name={'website'}
                value={website}
                placeholder="Enter Website"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
          </Form.Item>
        </div>
        <h4>How many volunteers do you need?</h4>

        <div className={'volunteer-number-input'}>
          <Form.Item label={'Number of Volunteers'} required>
            <div className={'error-flex'}>
              <div className={'inputNumber'}>
                <InputNumber
                  name={'numberOfVolunteers'}
                  min={1}
                  value={numberOfVolunteers}
                  onChange={value => handleChange('numberOfVolunteers', value)}
                />{' '}
                {localState.numberOfVolunteers > 1 ? 'Volunteers' : 'Volunteer'}
              </div>
              <small>We recommend adding +5 to your need</small>
              <div>
                {error && !numberOfVolunteers && (
                  <span className="error-message error-span left-aligned">
                    Must be higher than 0.
                  </span>
                )}
              </div>
            </div>
          </Form.Item>
        </div>

        <Form.Item>
          <Form.Item label={'Other Notes'}>
            <div className={'error-flex'}>
              <div>
                <TextArea
                  name={'otherNotes'}
                  placeholder={
                    'Any additional helpful tips for the event go here.'
                  }
                  value={otherNotes}
                  onChange={e => handleChange(e.target.name, e.target.value)}
                  style={{ height: '200px' }}
                />
              </div>
            </div>
          </Form.Item>
        </Form.Item>
        <div className="buttonStyles">
          <StyledCancelButton
            onClick={handlePageBack}
            type="secondary"
            key="back"
          >
            Back
          </StyledCancelButton>
          <StyledButton type="primary" key="next" onClick={checkedRequired}>
            Next
          </StyledButton>
        </div>
      </Form>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  .volunteer-number-input {
    label {
      margin-left: 190px;
    }
  }
  .inputNumber {
    margin-bottom: 10px;
  }
`;

export default CreateEventPartFour;
