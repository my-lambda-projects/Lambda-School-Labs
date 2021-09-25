import React from "react";
import styled from "styled-components";

const S = {};

S.Container = styled.div`
    border: solid black 1px;
    height: 100%;
    width 37%;
    display: flex;
    flex-direction: column;
    padding: 10px 50px;
    box-sizing: border-box;
    border-radius: 5px;
`

S.H1 = styled.h1`
    font-size: 28px;
    margin-bottom: 15%;
`


S.Hr = styled.hr`
    width: 100%;
    margin-top: 20px;
`
S.Stat = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 23px;
    margin-bottom: 3px;
`

S.Price = styled(S.Stat)`
    font-size: 26px;
    margin-top: 16px;
`

S.StatType = styled.div`
    width: 60%;
`


function DayInfo(){
    return(
        <S.Container>
            <S.H1>Month, Day, Year</S.H1>
            <S.Stat>
                <div>$0</div>
                <S.StatType>Base Price</S.StatType>
            </S.Stat>
            <S.Stat>
                <div>+0</div>
                <S.StatType>Seasonality Factor</S.StatType>
            </S.Stat>
            <S.Stat>
                <div>+0</div>
                <S.StatType>Amenities</S.StatType>
            </S.Stat>
            <S.Stat>
                <div>+0</div>
                <S.StatType>Location</S.StatType>
            </S.Stat>
            <S.Hr></S.Hr>
            <S.Price>
                <div>$428</div>
                <S.StatType>Optimal Price</S.StatType>
            </S.Price>

        </S.Container>
    )
}

export default DayInfo;