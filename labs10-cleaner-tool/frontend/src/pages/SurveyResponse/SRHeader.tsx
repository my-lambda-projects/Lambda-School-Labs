import React from 'react';
import {SurveyResponseTitle, SurveyResponseH1} from './SurveyResponse.styling';

const SRHeader = (props:any) => {

    let surveyName = () => {
        if(props.surveys.length === 0){
            return("There Are No Responses For This Survey");
        }else{
            return(`${props.surveys[0].survey_name} - Responses`);
            }
        }

    return(
        <SurveyResponseTitle>
            <SurveyResponseH1>{surveyName()}</SurveyResponseH1>
            {console.log(props.surveys)}
        </SurveyResponseTitle> 
    )
}

export default SRHeader;