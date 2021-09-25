import React, {Component} from 'react';
import {Checkbox} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntCheckbox extends Component{
  render(){
    let {children, notRequired, ...rest} = this.props;
    return (
      <StyledCheckbox {...rest}>
        {children}
      </StyledCheckbox>
    );
  }
}

AntCheckbox.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};

const StyledCheckbox = styled(Checkbox)``;

export default AntCheckbox;
