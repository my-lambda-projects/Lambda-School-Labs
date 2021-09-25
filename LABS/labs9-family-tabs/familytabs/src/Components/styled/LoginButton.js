import React from 'react'
import styled from 'styled-components'

const NewButton = styled.button `
    color: white;
    background: #242943;
    border: 2px solid #ffffff; 
    padding: 15px 50px 15px 50px;
    margin: 0 0 50px 0;
    width: 200px; 
    height: 50px;
    margin-left: 5px;

    :hover {
      border-color: #3985ac;
      color: #3985ac;
      cursor: pointer;
    }
`;

export default props => {
  return (

      <NewButton onClick={props.auth.login}> LOGIN</NewButton>

  )
}




