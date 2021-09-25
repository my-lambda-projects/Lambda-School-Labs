import React from 'react';
import RatingComponent from './RatingComponent';
import YNComponent from './YNComponent';
import {SingleResponse, SingleResponseH3} from './SurveyResponse.styling';


const Response = (props:any) => {
    if(props.answerType == 1){
        return(
            <SingleResponse>
                <SingleResponseH3>Question {props.index}</SingleResponseH3>
                <p>{props.question}</p>
                <YNComponent yn_answer={props.answer} />
            </SingleResponse>
        ) 
    }

    if(props.answerType == 2){
        return(
            <SingleResponse>
                <SingleResponseH3>Question {props.index}</SingleResponseH3>
                <p>{props.question}</p>
                <RatingComponent rating_answer={props.answer} />
            </SingleResponse>
        )
    }
    return(
        <SingleResponse>
            <SingleResponseH3>Question {props.index}</SingleResponseH3>
            <p>{props.question}</p>
            <p>{props.answer}</p>
        </SingleResponse>
    )
}

export default Response;
