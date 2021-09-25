import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select, Form, Tooltip, Icon } from 'antd';

const SelectStyled = styled(Select)`
  && {
  }
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const StyledSelect = ({
  name,
  value,
  onChange,
  children,
  tooltipTitle,
  label,
  ...rest
}) => {
  let camelCase = '';
  if (name) {
    camelCase = name.split(' ');
    for (let i = 0; i < camelCase.length; i++) {
      camelCase[i] = camelCase[i].toLowerCase();
      if (i > 0) {
        camelCase[i] =
          camelCase[i].charAt(0).toUpperCase() + camelCase[i].slice(1);
      }
    }
    camelCase = camelCase.join('');
  }

  return (
    <Form.Item
      {...formItemLayout}
      label={
        <span>
          {label ? label : name}
          {tooltipTitle && (
            <Tooltip title={tooltipTitle}>
              <Icon type="question-circle-o" />
            </Tooltip>
          )}
        </span>
      }
    >
      <SelectStyled
        {...rest}
        name={camelCase}
        title={camelCase}
        tooltipTitle={tooltipTitle}
        onChange={onChange}
        // value={ value }
      >
        {children && children}
      </SelectStyled>
    </Form.Item>
  );
};

StyledSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
