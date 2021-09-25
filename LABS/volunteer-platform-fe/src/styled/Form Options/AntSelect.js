import React, {Component} from 'react';
import styled from 'styled-components';
import {Select} from 'antd';
import PropTypes from 'prop-types';

export class AntSelect extends Component{
  render(){
    let {children, notRequired, ...rest} = this.props;
    return (
      <StyledSelect {...rest}>
        {children}
      </StyledSelect>
    );
  }
}

AntSelect.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};
const StyledSelect = styled(Select)``;
