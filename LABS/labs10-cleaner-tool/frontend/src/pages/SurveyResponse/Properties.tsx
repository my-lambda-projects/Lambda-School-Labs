import React from 'react';
import {SurveyResponseTitle, SurveyResponseSelect} from './SurveyResponse.styling';

const Properties = (props:any) => {
    return(
        <SurveyResponseTitle>
            <SurveyResponseSelect name="properties" onChange={props.changeHandler}>
                <option value="title">Filter By Property</option>
                {props.surveys.map((survey:any, index:number) =>{
                return(<option key={index} value={survey.house_name}>{survey.house_name}</option> )
                })}
            </SurveyResponseSelect> 
        </SurveyResponseTitle>
    )
}

export default Properties;