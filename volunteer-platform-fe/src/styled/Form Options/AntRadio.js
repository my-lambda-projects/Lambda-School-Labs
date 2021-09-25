import React, {Component} from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

export class AntRadio extends Component {
    render() {
        let { children, notRequired, ...rest } = this.props
        return (
            <StyledRadio {...rest}>
                {children}
            </StyledRadio>
        )
    }
}
AntRadio.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};
const StyledRadio = styled(Radio)``;

export default AntRadio;