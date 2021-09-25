import React, {Component} from 'react';
import styled from 'styled-components';
import {TimePicker} from 'antd';
import PropTypes from 'prop-types';

export class AntTimePicker extends Component{
  render(){
    let {children, notRequired, ...rest} = this.props;
    return <StyledTimePicker {...rest}></StyledTimePicker>;
  }
}

AntTimePicker.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};
const StyledTimePicker = styled(TimePicker)``;
