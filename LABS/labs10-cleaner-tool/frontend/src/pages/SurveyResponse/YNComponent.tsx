import React from 'react';
import {ResponseButton} from './SurveyResponse.styling';

const YNComponent = (props:any) => {
    return(
        <div className='yn-container'>
            <ResponseButton value="yes" yn_answer={props.yn_answer}>Yes</ResponseButton>
            <ResponseButton value="no" yn_answer={props.yn_answer}>No</ResponseButton>       
        </div>
    )
}

export default YNComponent;