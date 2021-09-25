import React from 'react'
import { Card } from 'antd';
import styled from 'styled-components';
import { device } from '../../styled/deviceBreakpoints';

export const LeadingCard = (props) => {
    const { Meta } = Card;

    return (
        <StyledCard cover={props.cover}>
            <Meta title={props.title} description={props.description}/>
        </StyledCard>
    )
}

export default LeadingCard;

const StyledCard = styled(Card)`
  background: #fff7e6;
  width: 210px;
  margin: 1rem 3rem;
  margin-left: 0rem;

  @media ${device.tablet} {
    margin: 0.6rem;
  }

  img {
    max-height: 190px;
  }

  .ant-card-meta-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

    .ant-card-meta-title {
      margin: 0;
    }

    .ant-card-meta-description {
      color: ${({ theme }) => theme.accent6};
      font-size: 0.8rem;
      font-style: italic;
    }
  }
`;
