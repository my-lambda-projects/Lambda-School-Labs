import React from 'react'
import styled from 'styled-components'

const CellGroup = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-gap: 25px;
    align-items: center;
`

const CellImage = styled.div`
    width: 60px;
    height: 60px;
    /* background: black; */
    border-radius: 10px;
    background-image: url(${props => props.image});
    background-size: 60px;
`

const CellTitle = styled.div`
    font-size: 20px;
    border-bottom: 1px solid rgb(248,248,248);
    padding: 30px 0;
    color: white;
    line-height: 28px;
    letter-spacing: .8px;
    font-weight: 400;

`

const Cell = props => (
    <CellGroup>
        <CellImage image={props.image}></CellImage>
        <CellTitle>{props.title}</CellTitle>
    </CellGroup>
)

export default Cell
