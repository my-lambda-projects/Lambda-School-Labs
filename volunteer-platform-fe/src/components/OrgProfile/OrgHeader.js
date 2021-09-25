import React from 'react';
import styled from 'styled-components';
import {
  StyledLine,
  StyledButton,
  StyledAvatar,
  StyledCard,
} from '../../styled';

export const OrgHeader = ({ organization, createMessageThread }) => {
  return (
    <StyledOrgHeader>
      <div className="col">
        <div className="top-row">
          <h2 className={'org-name'}>{organization.organizationName}</h2>
          <StyledLine width={'100%'} />
          <StyledButton onClick={createMessageThread}>Message</StyledButton>
        </div>
        <div className="bottom-row">
          <p>{organization.aboutUs}</p>
        </div>
      </div>
      {organization.imageUrl && (
        <StyledAvatar shape="square" size={200} src={organization.imageUrl} />
      )}
    </StyledOrgHeader>
  );
};

const StyledOrgHeader = styled(StyledCard)`
  &&& {
    width: 100%;
    background-color: ${({ theme }) => theme.accent1};

    .ant-card-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;

      h2 {
        margin: 0 auto;
      }

      button {
        margin-top: 15px;
      }
    }

    .col {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 60%;
    }

    .bottom-row {
      margin-top: 15px;
      border: 1px solid ${({ theme }) => theme.gray6};
      padding: 25px;

      p {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
`;
export default OrgHeader;
