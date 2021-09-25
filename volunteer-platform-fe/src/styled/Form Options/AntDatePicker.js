import React, {Component} from 'react';
import {DatePicker} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntDatePicker extends Component{
  render(){
    let {children, notRequired, ...rest} = this.props;
    return (
      <StyledDatePicker {...rest}>
        {children}
      </StyledDatePicker>
    );
  }
}

AntDatePicker.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};

const StyledDatePicker = styled(DatePicker)``;

export default AntDatePicker;
