import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import { StyledButton, StyledCancelButton } from '../../styled';

const { TextArea } = Input;

export const LastPart = ({ clickNext, storedData, clickPrevious }) => {
  const [localState, setLocalState] = useState({ ...storedData });

  const handleChange = e => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  return (
    <DivForStyling>
      <Form layout={'vertical'} onSubmit={() => clickNext(localState)}>
        <h4 className='align-center'>Tell Us about Your Organization</h4>
        <div className="inputs">
          <Form.Item label={'About Us'}>
            <TextArea
              name={'aboutUs'}
              value={localState['aboutUs']}
              onChange={handleChange}
              autosize={{ minRows: 4, maxRows: 120 }}
              placeholder={
                'A short paragraph such as mission, vision, and values of your non profit would go here...'
              }
            />
          </Form.Item>
          <Form.Item label={'Website'}>
            <Input
              name={'website'}
              value={[localState['website']]}
              onChange={handleChange}
              placeholder={'https://nonprofit.org'}
            />
          </Form.Item>
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
  .inputs {
    width: 70%;
    margin: 0 auto;
  }
`;

export default LastPart;
