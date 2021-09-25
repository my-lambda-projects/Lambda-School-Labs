import React, { Component } from 'react'
import { InputNumber } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntInputNumber extends Component {
    render() {
        let { children, notRequired, ...rest } = this.props
        return (
            <StyledInputNumber {...rest}>
                {children}
            </StyledInputNumber>
        )
    }
}
AntInputNumber.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};
const StyledInputNumber = styled(InputNumber)``;

export default AntInputNumber;
