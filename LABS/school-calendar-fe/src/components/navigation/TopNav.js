import React from 'react'
import styled from 'styled-components'; 

//I think this is not in use. A former implementation of the top navigation.
const TopNav = () => {
    return(
        <Container>
            <Icon className="fas fa-bars"/>
            <Btn>Add event</Btn>
        </Container>
    )
}

export default TopNav;

const Container = styled.div`
    width: 100%;
    display: flex; 
    justify-content: space-between;
    border-bottom: 1px solid #BDBDBD;
    padding: 5% 2.5% 2.5% 2.5%;
    position: fixed;
    top: 0;
    background: white; 
`;

const Icon = styled.i`
    height: 34px; 
    width: 80px; 
    font-size: 1.6rem;
`;

const Btn = styled.button`
    height: 34px; 
    width: 97px;
    color: white;
    background: #28807D;
    font-family: Open Sans;
    font-weight: bold;
    border-radius: 10px;
    // padding: 'auto auto'
`;
