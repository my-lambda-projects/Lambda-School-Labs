import React, {Component} from 'react';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import PropTypes from 'prop-types';

export class AntTextArea extends Component{
  render(){
    let {children, notRequired, ...rest} = this.props;
    return <StyledTextArea {...rest}>{children}</StyledTextArea>;
  }
}

AntTextArea.propTypes = {
  notRequired: PropTypes.string,
  tooltipTitle: PropTypes.string,
};
const StyledTextArea = styled(TextArea)``;
