import React, { useState, FormEvent, useEffect } from 'react';
import Button from '../../../components/Button';
import useFetch from '../../../helpers/useFetch';
import loadingIndicator from '../../utils/loading.svg';
import { ModalContainer } from './SurveyModal.styling'
import { axiosFetch } from '../../../helpers'
import { number } from 'yup';
import { Checkbox } from '@material-ui/core';
import firebase from 'firebase/app';
interface Survey {
  survey: any,
  id: number,
  name: string,
  isGuest: boolean | number,
}

type SurveyList = Array<Survey>;

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

interface SurveySubmit {
  surveyId: number; stayId: number;
}

export const Modal = (props: any) => {
  const stupidPostgresInconsistencyTrue = process.env.NODE_ENV === 'development' ? 1 : true
  const stupidPostgresInconsistencyFalse = process.env.NODE_ENV === 'development' ? 0 : false
  const showHideClassName = !props.show ? "modal display-none" : "modal display-flex";
  const { email } = props;
  let buttonEnabled = false;
  const url =
    process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com'
  const [data, err, loading] = useFetch(`${process.env.REACT_APP_backendURL}/surveys`, true, 'get');
  const [selected, setSelected] = useState([] as SurveySubmit[])
  const selectAndClose = (e: any, data: any, func: any) => {
    e.preventDefault();
    axiosFetch('post', `${url}/stays/surveys`, data);
    {
      const actionCodeSettings = {
        url: `http://${window.location.hostname}/linklogin?redir=survey&isguest=true&id=${props.stay_id}`,
        handleCodeInApp: true,
      };
      firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then().catch((e) => console.log(e))
    }
    func()
  }

  let toggleButton = (e: FormEvent, currentState: boolean) => {
    e.preventDefault();
    buttonEnabled = !currentState
  }
  //check object equality
  function isEquivalent(a: any, b: any) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    // are considered equivalent
    return true;
  }
  const handleClick = (item: SurveySubmit) => {
    const isSelected = selected.filter(obj => isEquivalent(obj, item))
    const removeSelected = selected.filter(obj => !isEquivalent(obj, item))
    if (isSelected === undefined || isSelected.length == 0) {
      setSelected([...selected, item])
    } if (isSelected.length) {
      setSelected(removeSelected)
    }
  }

  const filterByGuest = (input: SurveyList) => input.filter((survey: Survey) => survey.isGuest === stupidPostgresInconsistencyTrue)


  if (data) {
    // const filteredData = data.filter((survey: Survey) => survey.isGuest === stupidPostgresInconsistencyTrue)
    const filteredData = filterByGuest(data)
    return (
      <div className={showHideClassName}>
        <ModalContainer>
          <div className="modal-content-container">
            <h3>Surveys</h3>
            <form >
              {
                filteredData.map((survey: Survey) =>
                  <div key={`surveylabel${survey.id}`}>
                    {/* <Checkbox type="checkbox" name={survey.name} value={`${survey.id}`} onChange={() => handleClick({ surveyId: survey.id, stayId: props.stay_id })} /> */}
                    <div>
                      <input type="checkbox" value={survey.id} id={`${survey.id}`} onChange={() => handleClick({ surveyId: survey.id, stayId: props.stay_id })} />
                      <label htmlFor={`${survey.id}`}>{survey.name}</label>
                    </div>
                  </div>
                )
              }
            </form>
            <Button disabled={buttonEnabled} form="surveyForm" type="submit" text="Submit" onClick={(e) => selectAndClose(e, selected, props.modal)} />
            <Button disabled={buttonEnabled} onClick={props.modal} hollow={true} text="close" />
          </div>
        </ModalContainer>
      </div>
    )
  } else if (err.error === true) {
    return (
      <div className={showHideClassName}>
        <ModalContainer>
          <div className="model-content-container">
            <h3>We are having issues processing your request please try again later.</h3>
          </div>
        </ModalContainer>
      </div>
    )
  } else {
    return (
      <div className={showHideClassName}>
        <ModalContainer>
          <div className="model-content-container">
            <h3>Surveys</h3>
            <img src={loadingIndicator} alt='animated loading indicator' />
          </div>
        </ModalContainer>
      </div>
    )
  }
};

