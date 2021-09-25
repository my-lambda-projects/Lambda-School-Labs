import React from "react";
import styled from "styled-components";

const UpgradeDiv = styled.button`
//margin: 3% 0 0 37%;
margin: 10% 0 0 22%;
//justify-content: center;
border-radius: 5px;
cursor: pointer;
width: 200px;
height: 50px;
border: white;
font-weight: bold;
letter-spacing: .15em;
&:hover {
    cursor: pointer
}

`;


const Upgrade = props => {
  return <UpgradeDiv>Upgrade</UpgradeDiv>;
};

export default Upgrade;
