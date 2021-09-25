import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export const StyledCard = ({ ...rest }) => {
  return <StyledAntCard {...rest} />;
};

const StyledAntCard = styled(Card)`
  && {
    margin: ${props => props.margin || '25px auto'};
    width: ${props => props.width || '100%'};
    border-radius: ${props =>
      props.borderRadius || props.theme.borderRadiusDefault};
    background-color: ${props => props.backgroundcolor || props.theme.gray1};
    letter-spacing: 0.2px;
    border: 1px solid ${({ theme }) => theme.gray4};
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
    .ant-card-body {
      width: 100%;
    }
  }
`;

StyledCard.propTypes = {
  margin: PropTypes.string,
  maxWidth: PropTypes.string,
  borderRadiusDefault: PropTypes.string,
  backgroundcolor: PropTypes.string,
};
