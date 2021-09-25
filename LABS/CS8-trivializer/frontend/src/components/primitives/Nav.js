import styled from 'styled-components';


export const Nav = styled.nav`
    position: fixed;
    top: 8%;
    left: 2%;
    z-index: 1;
    background-color: grey;
    height: 90%;
    width: 10%;
    border-radius: 2%;
    border: solid white;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const Link = styled.h1`
    font-size: 1.2rem;
    color: white;
`