import React from 'react';
import { ButtonWrapper } from '../primitives/UI/Button';
const Button = (props) => {
    return <ButtonWrapper>{props.children}</ButtonWrapper>
}

export default Button;