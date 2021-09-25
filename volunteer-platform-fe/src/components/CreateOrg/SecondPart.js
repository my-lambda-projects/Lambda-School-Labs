import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Form } from 'antd';
import { POC } from './POC';
import { StyledButton, StyledCancelButton } from '../../styled';

export const SecondPart = ({ clickNext, storedData, clickPrevious }) => {
  const [allPOCs, setAllPOCs] = useState([1]);
  const [localState, setLocalState] = useState({ ...storedData });

  useEffect(() => {
    let temp = [];
    if (storedData.POC) {
      for (let i = 1; i <= storedData.POC.length; i++) temp.push(i);
      setAllPOCs(temp);
    }
  }, [storedData]);

  const changePOC = (action, i) => {
    if (action === 'add') {
      setAllPOCs([...allPOCs, allPOCs.length + 1]);
    } else {
      let removed = allPOCs.splice(allPOCs.indexOf(i), 1);
      setAllPOCs([...allPOCs]);
    }
  };

  return (
    <>
      <StyledForm layout={'vertical'} onSubmit={() => clickNext(localState)}>
        <h4 className = 'align-center'>Who is the point of contact?</h4>
        {allPOCs.map(poc => (
          <POC
            key={poc}
            i={poc}
            changePOC={changePOC}
            values={localState}
            setValues={setLocalState}
          />
        ))}
        <>
          <Icon
            type="plus-circle"
            style={{
              fontSize: '1.6rem',
              marginRight: '1rem',
              color: '#005A87',
            }}
            onClick={() => changePOC('add')}
          />
        </>
        <span style={{ color: '#005A87' }} onClick={() => changePOC('add')}>
          Add another point of contact.
        </span>
      </StyledForm>
      <div className="buttonStyles">
        <StyledCancelButton onClick={clickPrevious} type="primary">
          Previous
        </StyledCancelButton>
        <StyledButton onClick={() => clickNext(localState)} type="primary">
          Next
        </StyledButton>
      </div>
    </>
  );
};

const StyledForm = styled(Form)`
  .trash-icon {
    i {
      font-size: 25px;
      margin-left: 94%;
      margin-top: 20px;
      margin-bottom: -15px;
    }
  }
`;
export default SecondPart;
