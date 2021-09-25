import React from "react";
import styled from "styled-components";

const S = {};

S.Container = styled.div`
    width: 37%;
    height: 100%;
    border: solid black 1px;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 25px 0px;
`

S.Bold = styled.div`
    font-size: 30px;
    font-weight: 500;
`

S.Underlined = styled.div`
    font-size: 30px;
    border-bottom: solid black 1px;;
    font-weight: 100;
`

function MessageBox(){
    return(
        <S.Container>
            <S.Bold>Last month you miss out</S.Bold>
            <S.Bold>$2,970</S.Bold>
            <S.Underlined>Sign up to not lose more</S.Underlined>
        </S.Container>
    )
}

export default MessageBox;