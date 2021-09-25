import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const CheckableTagStyled = styled(CheckableTag)`
  && {
    cursor: pointer;
    margin-bottom: 8px;
  }
`;

export const StyledCheckableTag = ({
  checked,
  onChange,
  name,
  collection,
  ...rest
}) => {
  const [localState, setLocalState] = useState({ checked: false });

  useEffect(() => {
    setLocalState({ ...localState, checked: checked });
  }, [checked]);

  const handleChange = checked => {
    setLocalState({ ...localState, checked: checked });
    onChange(checked, name, collection);
  };

  return (
    <CheckableTagStyled
      checked={localState.checked}
      name={name}
      onChange={handleChange}
      {...rest}
    />
  );
};
