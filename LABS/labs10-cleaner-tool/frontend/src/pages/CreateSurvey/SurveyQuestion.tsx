import React, { useState } from 'react';
import { //CreateSurveyQuestionWrapper, 
    // CreateSurveyQuestionLables, 
    CreateSurveyOptions,
    CreateSurveyInput,
    QuestionOptions, 
    SurveyStyledButton} 
    from './CreateSurvey.styling';
//style vars
const active = {
    text: '--color-button-text',
    bg: "--color-accent"
  };
  const inactive = {
    text: "--color-button-text-alt",
    bg: "--color-button-background-alt"
  }

const SurveyQuestion = (props: any) => {

    return (
        <CreateSurveyOptions>
            <h3>Question {props.questionNumber}</h3>
            <CreateSurveyInput type = 'text' placeholder = 'Add question text here' onChange = {(ev:any)=>{props.setQuestion(ev.target.value)}}/>
            <QuestionOptions>
                <SurveyStyledButton theme={props.questionType===1 ? active: inactive } type='button' onClick={() => props.setQuestionType(1)}>Yes/No</SurveyStyledButton>
                <SurveyStyledButton theme={props.questionType===2 ? active: inactive } type='button' onClick={() => props.setQuestionType(2)}>1-5 Rating</SurveyStyledButton>
                <SurveyStyledButton theme={props.questionType===3 ? active: inactive } type='button' onClick={() => props.setQuestionType(3)}>Free Text</SurveyStyledButton>
            </QuestionOptions>
        </CreateSurveyOptions>
    )
}
export default SurveyQuestion