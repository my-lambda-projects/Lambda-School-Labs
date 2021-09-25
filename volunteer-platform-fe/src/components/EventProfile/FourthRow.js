import React from 'react';
import styled from 'styled-components';
import {Icon, Col} from 'antd'
import {StyledCard} from '../../styled'
export const FourthRow = () => {
  return (
    <StyledFourthRow >
      <Col className='event-volunteers' span={16}>
        {/* <h4>Volunteers Attending</h4>
        <div className='event-volunteers-cards'></div> */}
      </Col>
      <Col span={7} className='social-media'>
        <h4>Invite a friend!</h4>
        <div className='icons'>
          <Icon type="google-circle" theme="filled" />
          <Icon type="twitter-circle" theme="filled" />
          <Icon type="facebook" theme="filled" />
        </div>
      </Col>
    </StyledFourthRow>
  );
};

const StyledFourthRow = styled(StyledCard)`
  && {
    width: 100%;
    min-height: 150px;
    box-shadow: none;
    border: none;
    background: transparent;
  }  

  .ant-card-body {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .event-volunteers {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h4 {
      margin: 0 0 1rem 0;
    }

    &-cards {
      height: 100%;
    }
  }

  .social-media{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
     
    h4 {
      margin: 0 0 1rem 0;
    }

    .icons {
      display: flex;
      justify-content: flex-start;
      width: 100%;

      i{
          font-size: 30px;
          margin-right: 2rem;
      }
    }
  }
`;
export default FourthRow;
