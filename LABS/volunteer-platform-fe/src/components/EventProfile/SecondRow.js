import React from 'react';
import styled from 'styled-components';
import { Tag, Row, Col } from 'antd';
import orgPlaceholderImage from '../../assets/orgPlaceholderImage.png';

export const SecondRow = ({ localState }) => {
  const causes = localState.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const interest = localState.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const requirements = localState.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });
  return (
    <StyledSecondRow type="flex" justify="space-between" align="stretch">
      <Col span={6}>
        <div className="photo">
          {typeof localState.imageUrl === String ? (
            <img src={localState.imageUrl} alt={localState.orgName} />
          ) : (
            <div className="placeholder-photo">
              <img src={orgPlaceholderImage} alt={localState.orgName} />
            </div>
          )}
        </div>
      </Col>
      <Col span={17} offset={1}>
        <div className="tags">
          <div>
            <h5>Cause Area(s): </h5>
            <div className="subtag">{causes}</div>
          </div>
          <div>
            <h5>Interests: </h5>
            <div className="subtag">{interest}</div>
          </div>
          <div>
            <h5>Requirement(s): </h5>
            <div className="subtag last">{requirements}</div>
          </div>
        </div>
      </Col>
    </StyledSecondRow>
  );
};

const StyledSecondRow = styled(Row)`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    min-height: 150px;
  }

  h5 {
    font-weight: 600;
  }

  .photo {
    border-radius: 5px;

    .placeholder-photo {
      background-color: ${({ theme }) => theme.gray3};
      border: 1px solid ${({ theme }) => theme.gray4};
      border-radius: 5px;

      img {
        opacity: 0.3;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: contain;
    }
  }
  .tags {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    padding: 1rem 2rem;
    border: 1px solid ${({ theme }) => theme.gray4};
    background-color: ${({ theme }) => theme.gray1};
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);

    .subtag {
      flex-direction: row;
      justify-content: flex-start;

      .ant-tag {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .last {
      padding-bottom: 0.81em;
    }
  }
`;
export default SecondRow;
