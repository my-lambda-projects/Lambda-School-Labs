import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

export const OrgButtons = ({ displayOrg, deleteOrg }) => {
  return (
    <StyledOrgButtons>
      <div className={'org-actions'}>
        <Link
          to={{
            pathname: '/create-org',
            state: {
              org: displayOrg,
            },
          }}
        >
          <div className={'action'}>
            <div className={'action-icon'}>
              <Icon type="edit" />
            </div>
            <span>Update Org. Info</span>
          </div>
        </Link>
        <Link
          to={{
            pathname: '/org-dashboard/create-event',
            state: {
              org: displayOrg,
            },
          }}
        >
          <div className={'action'}>
            <div className={'action-icon'}>
              <Icon type="form" />
            </div>
            <span>Create Event</span>
          </div>
        </Link>
        <Link>
          <div onClick={deleteOrg} className={'action'}>
            <div className={'action-icon'}>
              <Icon type="delete" />
            </div>
            <span>Delete Org</span>
          </div>
        </Link>
      </div>
    </StyledOrgButtons>
  );
};

const StyledOrgButtons = styled.div`
  width: 100%;
  .org-actions {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px solid ${props => props.theme.primary5};
    width: 50%;
    min-height: 80px;
    margin-bottom: 3rem;
  }

  .action {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    min-width: 150px;
  }

  .action-icon {
    color: ${props => props.theme.gray1};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: ${props => props.theme.gray8};
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  span {
    color: #262626;
  }
`;
export default OrgButtons;
