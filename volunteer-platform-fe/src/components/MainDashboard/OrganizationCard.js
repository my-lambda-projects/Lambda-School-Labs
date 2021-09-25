import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tag, Typography } from 'antd';
import { StyledCard, StyledButton, StyledAvatar } from '../../styled';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;
export const OrganizationCard = ({ org }) => {
  console.log(org);
  //aboutUs, causeAreas, city, state, streetAddress, website, organizationName
  return (
    <StyledOrgCard margin={'0 0 20px 0'}>
      <div className="content">
        <div className="header">
          {org.imageUrl && <StyledAvatar size={64} src={org.imageUrl} />}
          <h1>{org.organizationName}</h1>
        </div>
        <div className="causeTags">
          {org.causeAreas.map(cause => (
            <Tag>{cause}</Tag>
          ))}
        </div>
        <h4>{`${org.streetAddress} ${org.city}, ${org.state}`}</h4>
        <h4>{org.website}</h4>
        <Paragraph ellipsis={{ rows: 3 }}>{org.aboutUs}</Paragraph>
      </div>
      <div className="button">
        <Link to={`/organization/${org.orgId}`}>
          <button>View More</button>
        </Link>
      </div>
    </StyledOrgCard>
  );
};

const StyledOrgCard = styled(StyledCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    h4 {
      font-size: 14px;
    }
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;

    .ant-avatar {
      margin-right: 25px;
    }

    h1 {
      margin: 0;
    }
  }
  .button {
    width: 25%;
    margin: 0 auto;
    button {
      width: 100%;
    }
  }
`;

OrganizationCard.propTypes = {
  org: PropTypes.shape({
    orgId: PropTypes.string,
    aboutUs: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    organizationName: PropTypes.string.isRequired,
    organizationOwnerUID: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    imageUrl: PropTypes.string,
    POC: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
    causeAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    daysOfTheWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default OrganizationCard;
