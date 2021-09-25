import React from 'react';
import Response from './Response';
import {ResponsesContainer, 
        ResponsesGuest, 
        ResponsesImage, 
        ResponsesInfo, 
        ResponsesAnswers} from './SurveyResponse.styling';


const Responses = (props:any) => {

    const editDate = () => {
        const date = props.sr_date.slice(0, 10);
            return(date);
    }

    return(
        <ResponsesContainer>
            <ResponsesGuest>
                <div className='responses-img'>
                    <ResponsesImage src = {props.sr_img} />
                </div>
                <ResponsesInfo>
                    <p>{props.sr_name}</p>
                    <p>{editDate()}</p>
                </ResponsesInfo>
            </ResponsesGuest>
            <ResponsesAnswers>
            {props.results.map((instance:any, index:any) => 
                <Response key={index} question = {instance.question} answer = {instance.answer} answerType={instance.answer_type} index={index+1}/>
                )}    
            </ResponsesAnswers>
        </ResponsesContainer>
    )
}

export default Responses;