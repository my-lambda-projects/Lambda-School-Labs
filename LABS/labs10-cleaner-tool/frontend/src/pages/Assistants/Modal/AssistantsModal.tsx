import React, { useState } from 'react';
import Button from '../../../components/Button';

import { useFetch } from '../../../helpers';
import loadingIndicator from '../../utils/loading.svg';
import { ModalContainer, SurveySelectButton } from './AssistantsModal.styling'
import { axiosFetch } from '../../../helpers'
import Card from '../../../components/Card'
import { Formik, Field } from 'formik';
import DropDown from '../../../components/DropDown'
interface Survey {
  survey: any,
  id: number,
  name: string,
  isGuest: number | boolean,
}

interface SurveySubmit {
  surveyId: number; stayId: number;
}

//style vars
const active = {
  text: '--color-button-text',
  bg: "--color-accent"
};
const inactive = {
  text: "--color-button-text-alt",
  bg: "--color-button-background-alt"
}
//logs data and closes modal will make axios call later

export const SurveyModal = (props: any) => {
  const showHideClassName = !props.show ? "modal display-none" : "modal display-flex";
  const url =
    process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com'
  const [data, err, loading] = useFetch(`${url}/surveys`)
  const [stays, error, loadingstay] = useFetch(`${url}/stay/ast/${props.id}`);
  const [selectedstay, setSelectedstay] = useState(Number)
  const [selectedsurvey, setSelectedsurvey] = useState(Number)
  const selectAndClose = (e: any, data: any, func: any) => {
    e.preventDefault()
    // axiosFetch('post', `${url}/stays/surveys`, data); func()
    // {
    //   const actionCodeSettings = {
    //     url: `http://${window.location.hostname}/linklogin?redir=survey&isassistant=true&id=${stays[0].user_id}`,
    //     handleCodeInApp: true,
    //   };
    //   firebase.auth().sendSignInLinkToEmail()
    // }
  }
  console.log(stays)
  return (
    <div className={showHideClassName}>
      <ModalContainer>
        <div className="modal-content-container">
          <div className="modal-surveys-container">
            <h3>Survey</h3>
            {loading || loadingstay ? (
              <img src={loadingIndicator} alt='animated loading indicator' />
            ) : data ? (
              data.filter((survey: Survey) => survey.isGuest === 0 || survey.isGuest === false).map((survey: Survey) =>
                (
                  <Card>
                    {/* <div className='survey-card' key={survey.id}> */}
                    <h3>{survey.name}</h3>
                    <p>{survey.isGuest}</p>
                    <SurveySelectButton
                      theme={selectedsurvey === survey.id ? active : inactive}
                      onClick={() => { setSelectedsurvey(survey.id) }}
                    >Select</SurveySelectButton>
                    {/* </div> */}
                  </Card>
                ))
            ) : null}

          </div>
          <div className="modal-stays-container">
            <h3>Stay</h3>
            {stays ? (
              stays.map((stay: any) => (
                <Card>
                  <p>house: {stay.house_name}</p>
                  <p>check in: {stay.check_in.slice(0, 10)}</p>
                  <p>check out: {stay.check_out.slice(0, 10)}</p>
                  <SurveySelectButton
                    theme={selectedstay === stay.stay_id ? active : inactive}
                    onClick={() => { setSelectedstay(stay.stay_id) }}
                  >Select</SurveySelectButton>
                </Card>
              ))
            ) : (
                <div>Loading</div>
              )}
          </div>
        </div>
        <div className='modal-buttons-container'>
          <Button
            className='back'
            text='Close'
            color='red'
            onClick={props.modal}
          />
          <Button
            className='back'
            text='Send Survey'
            color='var(--color-button-background)'
            onClick={(e) => selectAndClose(e, { surveyId: selectedsurvey, stayId: selectedstay }, props.modal)}
          />
        </div>
      </ModalContainer>
    </div>
  );
};