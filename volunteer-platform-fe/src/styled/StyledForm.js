import styled from "styled-components";
import { Form } from "antd";

export const StyledForm = styled( Form )`
 && {
 max-width: ${props => props.maxWidth ? props.maxWidth : '500px'}
 }
`;

