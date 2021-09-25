
import React, { useState, useEffect } from 'react'
import { SurveyAnswers } from '../../pages';
import {
    CreateSurveyInput,
    CreateSurveyOptions
} from '../../pages/CreateSurvey/CreateSurvey.styling'
import styled from '@emotion/styled';
const BooleanButton = styled.button`
    background-color: white;
    margin-right: 5px;
    &.active {
        color: white;
        background-color:#428ACB;
    }
    border-radius: 5px;
    color: #428ACB;
    font-weight: bold;
    width: 60px;
    height: 30px;
    border: 2px solid #428ACB;
    :focus {
        outline: none;

    }
    &:hover{
        cursor: pointer;
    }
`
const BooleanDiv = styled.div`
    margin-bottom: .5rem;
`
const Boolean = (props: any)=>{
    const [selected, setSelected] = useState('yes')
    useEffect(() => {
        (() => {
            setSelected('yes')
            props.setAnswers(selected)
        })()
    }, []);
    const handleClick = (event: any) => {
        if (selected != event.target.value) {
            setSelected(event.target.value)
            props.setAnswers(selected)
        }
    }
    useEffect(() => {
        (() => {
            props.setAnswers(selected)
        })()
    }, [selected]);
    let arr = ['yes','no']
    return (
    <CreateSurveyOptions>
        <h3>{props.question.question}</h3>
        <BooleanDiv>
            {arr.map((item, index)=>{
                return <BooleanButton key = {index} type='button' value={`${item}`} className={`${selected === item ? 'active' : ''}`} onClick={async (event) => { await handleClick(event) }
                }>{item}</BooleanButton>
            })}
        </BooleanDiv>
    </CreateSurveyOptions>
    )
}

export default Boolean