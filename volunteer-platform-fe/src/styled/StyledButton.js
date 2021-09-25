import styled from "styled-components";
import { Button } from "antd";

export const StyledButton = styled( Button )`
  && {
    background: ${({theme, standard}) => !standard && theme.primary8};
    border: 1px solid ${({theme, standard}) => !standard && theme.primary8};
    color: white;
    border-radius: 4px;
    width: ${({width}) => width || '120px'};
    padding: 0.5rem 2rem;
    font-size: 16px;
    height: auto;

    :hover {
      background: ${props => props.theme.primary7};
      border: 1px solid ${({theme, standard}) => !standard && theme.primary7};
    }
  }

`;

export const StyledCancelButton = styled( StyledButton )`
  && {
    color :${({theme, standard}) => !standard && theme.primary7};
    border: 1px solid ${({theme, standard}) => !standard && theme.primary7};
    background: white;

    :hover {
      color: ${({theme, standard}) => !standard && theme.primary8};
      border: 1px solid ${({theme, standard}) => !standard && theme.primary8};
      background: white;
    }
  }
`