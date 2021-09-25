import React from 'react';
import { Survey, FilterArgs } from './types';
import { Link } from 'react-router-dom';
import { useFetch,axiosFetch } from '../../helpers/';
import { Button } from '../../components/index';
import {
    SurveyCards, 
    SurveyRightContent,
    DeleteIcon,
    ResponsesContainer
} from './Surveys.styling';
import './Surveys.css';


const SurveyCard = (props : any) => {
    const{
        survey,
        id,
        isGuest,
        name,
       goBack
    } = props
    console.log(props)
    const url = process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com';
    const [data] = useFetch(`${url}/surveyresponses/${id}`, true, 'get');
    async function deleteSurvey() {
        await axiosFetch('delete', `${url}/surveys/${id}`).catch((e: any) => {
          console.error(e);
        });
        goBack();
      }
    
    return(
        
            <SurveyCards>  
                <div >
                    <h3>{`${name}`}</h3>
                    <Link to={`/surveys/${id}/responses`}>
                        <Button text="View Survey Responses" color='var(--color-accent)'></Button>
                    </Link>
                </div>
                <SurveyRightContent>
                    <DeleteIcon onClick={deleteSurvey} src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fhawcons%2F32%2F699373-icon-26-trash-can-512.png&f=1" />
                    <ResponsesContainer>
                        <p>Responses</p>
                        <h2>{props.responses}</h2>
                    </ResponsesContainer>
                </SurveyRightContent>
            </SurveyCards>
        
    )
}

export default SurveyCard;