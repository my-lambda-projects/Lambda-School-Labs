import React, { useState } from 'react'
import styled from '@emotion/styled';
import {
    CreateSurveyOptions
} from '../../pages/CreateSurvey/CreateSurvey.styling'
const CreateSurveyInput = styled.textarea`
    padding-left: .5rem;
    padding-bottom: .5rem;
    margin-Bottom: .5rem;
    width: 70%;
    border: 0;
    outline: 0;
    background: transparent;
    border: 1px solid #949494;
    @media (max-width: 900px) {
        width: 100%;
    }
    height:75px;
`;




const FreeText = (props: any) => {
    return (
        <CreateSurveyOptions>
            <h3>{props.question.question}</h3>
                <CreateSurveyInput placeholder = 'add answer here' onChange={(ev: any) => {
                    props.setAnswers(ev.target.value);
                }}/>
        </CreateSurveyOptions>
    )

}

export default FreeText