import React, { useState, useEffect } from 'react'
import {
    CreateSurveyInput,
    CreateSurveyOptions
} from '../../pages/CreateSurvey/CreateSurvey.styling'
import styled from '@emotion/styled';

const OutOfFiveButton = styled.button`
    background-color: white;
    margin-right: 5px;
    &.active {
        color: white;
        background-color:#428ACB;
    }
    color: #428ACB;
    font-weight: bold;
    width: 30px;
    height: 30px;
    border: 2px solid #428ACB;
    border-radius: 5px;
    &:hover{
        cursor: pointer;
    }
    :focus {
        outline: none;

    }
`
const OutOfFiveDiv = styled.div`
    margin-bottom: .5rem;
`
const OutOfFive = (props:any) => {
    const [selected, setSelected] = useState('1')
    const questionNumber = `question${props.question.id}`
    useEffect(() => {
        (() => {
            setSelected('1')
            props.setAnswers(selected)
        })()
    }, []);
    const handleClick = (event: any) =>{
        if(selected != event.target.value){
        setSelected(event.target.value)
        props.setAnswers(selected) 
        }
    }


    useEffect(() => {
        (() => {
            props.setAnswers(selected)
        })()
    }, [selected]);
    let arr = ['1','2','3','4','5']
    return (
        <CreateSurveyOptions>
            <h3>{props.question.question}</h3>
            <OutOfFiveDiv>
                {arr.map((button,index)=>{
                    return <OutOfFiveButton key = {index} type='button' value={`${button}`}className={`${selected === button? 'active': ''}`} onClick={async (event: any) => { await handleClick(event) }
                    }>{button}</OutOfFiveButton>
                })}
            </OutOfFiveDiv>
        </CreateSurveyOptions>
    )

}

export default OutOfFive