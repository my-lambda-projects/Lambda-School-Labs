import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import FillSurvey from './FillSurvey'
import styled from '@emotion/styled'; 
import {
    CreateSurveyButtonWrapper,
} from '../../CreateSurvey/CreateSurvey.styling'

const SurveyH1 = styled.h1`
    text-align: left;
    margin-left: 15%;
`
const SurveysDiv = styled.div`
  background-color: white;
  width: 70%;
  margin-left: 15%;
  height: 40px;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;
const SurveyLink: any = styled(Link)`
  color: #428acb;
  height: 20px;
  font-weight: bold;
`;
const GuestSurveys = (props: any) =>{
    const [surveyList, setSurveyList] = useState([])

    const url = process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com';

    useEffect(()=>{
    (async()=>{
        const response = await axios.get(`${url}/stay/surveys/${props.match.params.stayId}`)
        setSurveyList(response.data)
        
    })()
    },[]);
    return (
      <div>
        <SurveyH1>Pick a Survey to Fill Out</SurveyH1>
        <div>
          {surveyList.length === 0 ? (
            <div> No Surveys</div>
          ) : (
            surveyList.map((survey: any, index: number) => {
              if (survey.isGuest && !survey.is_complete) {
                const surveyId = survey.id;
                const userId = survey.user_id;
                const stayId = props.match.params.stayId;
                const staysurveyId = survey.stay_surveys_id;
                return (
                    <SurveyLink
                        to={`/guestdashboard/${stayId}/surveys/${userId}/${surveyId}/${staysurveyId}`}
                    >
                        <SurveysDiv key={index}>
                            {survey.name}
                        </SurveysDiv>
                    </SurveyLink>
                );
              }
            })
          )}
        </div>
      </div>
    );
}
export default GuestSurveys