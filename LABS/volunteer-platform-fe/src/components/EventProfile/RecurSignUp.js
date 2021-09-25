import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Collapse, Icon } from 'antd';
import { StyledButton, StyledCard } from '../../styled';

const { Panel } = Collapse;

export const RecurSignUp = ({
  localState,
  auth,
  register,
  unRegister,
  numberOfVolunteers,
}) => {
  let current = Object.keys(localState.registeredVolunteers).filter(
    date => moment().unix() - date < 0
  );
  return (
    <StyledRecurSignUp id="recurSignUp">
      <Collapse
        style={{ marginTop: '2rem' }}
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <Icon type="caret-right" rotate={isActive ? 90 : 0} />
        )}
      >
        {current.map(date => {
          return (
            <Panel
              key={date}
              header={moment.unix(date).format('LLL')}
              className="panel"
            >
              <h5>
                Spots Remaining:{' '}
                {numberOfVolunteers -
                  localState.registeredVolunteers[date].length}
              </h5>
              {auth.googleAuthUser && localState.registeredVolunteers[date].some(
                item => item.userId === auth.googleAuthUser.uid
              ) ? (
                <StyledButton width={'25%'} onClick={e => unRegister(e, date)}>
                  Un-Register
                </StyledButton>
              ) : (
                <StyledButton width={'25%'} onClick={e => register(e, date)}>
                  Register
                </StyledButton>
              )}
            </Panel>
          );
        })}
      </Collapse>
    </StyledRecurSignUp>
  );
};

const StyledRecurSignUp = styled(StyledCard)`
  && {
    width: 100%;
    box-shadow: none;
    border-radius: 3px;
  }

  
  .panel {
    width: 100%;
    background: ${({ theme }) => theme.gray3};
    margin: 0 auto 24px;
    overflow: hidden;
    border-radius: 4px;
    border: 0;
  }
`;
