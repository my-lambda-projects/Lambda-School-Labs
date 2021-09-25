import styled from 'styled-components';

export const GameCardWrapper = styled.div`
   display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid black;
    border-radius: 4%;
    font-size: 2rem;
    width: 300px;
    height: 280px;

    margin: 0 10px;
    padding: 0 5px;
`;


export const IconContainer = styled.div`
 display: flex;
 align-items: flex-end;
 justify-content: center;
 height: auto;
 align-self: flex-end;
 position: relative;
 top: 80px;

 /* border: solid black; */

`

export const ViewIconWrapper = styled.div`
/* display: flex; */

 /* align-items: flex-end; */
`;

export const TrashIconWrapper = styled.div`
 /* display: flex;
 justify-content: center;
 align-items: center;
 padding-top: 20px; */
`;

export const TrashIcon = styled.img`
 width: 80%;
 height: auto;
`
export const ViewIcon = styled.img`
 width: 15%;
 height: auto;
 position: relative;
 top: 6px;
 
`

