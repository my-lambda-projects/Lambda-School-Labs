import React, {useState} from 'react';
import SurveyQuestion from './SurveyQuestion'
import axios, { AxiosRequestConfig } from 'axios';
import { Button,  } from '../../components/index';
import { 
     CreateSurveysWrapper,
     CreateSurveyOptions,
     CreateSurveyHeader, 
    //  CreateSurveyLables, 
     CreateSurveyInput, 
     SurveyOptions, 
     SurveyType, 
     SurveyTypeButton, 
     SurveyQuestions, 
     CreateSurveyButtonWrapper,
     SurveyStyledButton 
} from './CreateSurvey.styling';
import '../Surveys/Surveys.css';
import { ActionEvent } from 'material-ui/svg-icons';


//style vars
const active = {
    text: '--color-button-text',
    bg: "--color-accent"
  };
  const inactive = {
    text: "--color-button-text-alt",
    bg: "--color-button-background-alt"
  }
const CreateSurvey = (props: any)=>{
    const [dropdown, setDropdown] = useState('3')
    const [surveyName, setSurveyName] = useState('')
    const [survey, setSurvey] = useState([])
    const[id, setId] = useState(1)
    const [questionType1, setQuestionType1] = useState(1)
    const [questionType2, setQuestionType2] = useState(1)
    const [questionType3, setQuestionType3] = useState(1)
    const [question1, setQuestion1] = useState('')
    const [question2, setQuestion2] = useState('')
    const [question3, setQuestion3] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [fetch, setFetch] = useState(false)
    const [activeSurvey, setActiveSurvey] = useState(0)
    const url = process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com';

    const activeClass = (filter: any, active: any) =>
    active === filter ? 'active' : '';

    async function handleSubmit(surveyName: string, isGuest: boolean, dropdown: string) {
        if(!surveyName){
            return console.log('missing survey name')
        }
        const body: any = {
            name: surveyName,
            isGuest: isGuest,
        }
        const headers: AxiosRequestConfig = {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        };
        const data = await axios.post(`${url}/surveys`, body,headers)
        console.log(data)
        const newId = data.data.id
        console.log(data.data)
        setId(newId)
        setFetch(true)
        
        async function handleQuestions(question: string, type: number, id: number){
            if(!question){
                return console.log('missing question')
            }
            const body: any = {
                question: question,
                type: type,
                survey_id: id
            }
            const data = await axios.post(`${url}/questions`, body, headers)
            console.log(data)
        }
        if(dropdown ==='1'){
            handleQuestions(question1, questionType1, newId).then(res => {
                props.history.push('/surveys');
            });
        }
        if (dropdown === '2') {
            handleQuestions(question1, questionType1, newId)
            handleQuestions(question2, questionType2, newId).then(res => {
                props.history.push('/surveys');
            });
        }
        if(dropdown === '3'){
            handleQuestions(question1, questionType1, newId)
            handleQuestions(question2, questionType2, newId)
            handleQuestions(question3, questionType3, newId).then(res =>{
                props.history.push('/surveys');
            });
        }
    }
    const questionLength = (num: string, survey: any) => {
        for (let i = 0; i <= survey.length+1; i++) {
            survey.pop()
        }
        if(num === '1'){
            survey.push(<SurveyQuestion key={1} 
                questionNumber={1} 
                setQuestionType = {setQuestionType1} 
                setQuestion = {setQuestion1} 
                activeClass = {activeClass}
                questionType = {questionType1}/>)
        }
        if (num === '2') {
            survey.push(<SurveyQuestion key={1} 
                questionNumber={1} 
                setQuestionType = {setQuestionType1} 
                setQuestion = {setQuestion1} 
                activeClass = {activeClass}
                questionType = {questionType1}/>)
            survey.push(<SurveyQuestion key={2} 
                questionNumber={2} 
                setQuestionType = {setQuestionType2} 
                setQuestion = {setQuestion2} 
                activeClass = {activeClass}
                questionType = {questionType2}/>)
        }
        if (num === '3') {
            survey.push(<SurveyQuestion key={1} 
                questionNumber={1} 
                setQuestionType = {setQuestionType1} 
                setQuestion = {setQuestion1}
                activeClass = {activeClass}
                questionType = {questionType1}/>)
            survey.push(<SurveyQuestion key={2} 
                questionNumber={2} 
                setQuestionType = {setQuestionType2} 
                setQuestion = {setQuestion2} 
                activeClass = {activeClass}
                questionType = {questionType2}/>)
            survey.push(<SurveyQuestion key={3} 
                questionNumber={3} 
                setQuestionType = {setQuestionType3} 
                setQuestion = {setQuestion3} 
                activeClass = {activeClass}
                questionType = {questionType3}/>)
        }
        const answer = survey
        return answer
    }
    const handleCancel = () =>{
        props.history.push(`/surveys`)
    }
        return (
            <CreateSurveysWrapper>
                <form>
                    <CreateSurveyHeader>Create a Survey</CreateSurveyHeader>
                    <CreateSurveyOptions>
                        <h2>Survey Name</h2>
                        <CreateSurveyInput type='text' placeholder='Survey Name' onChange={(event: any) => { setSurveyName(event.target.value) }}/>
                        <SurveyOptions>
                            <h3>Survey Type:</h3>
                            {/* <Button
                                className={`button-filter guest`}
                                text='Guest Survey'
                                color='var(--color-button-background-alt)'
                                onClick={() => {setActiveSurvey(1)}}
                                datatestid='button-guest'
                                />
                                <Button
                                className={`button-filter assistant`}
                                text='Assistant Survey'
                                color='var(--color-button-background-alt)'
                                datatestid='button-assistant'
                                /> */}
                            <SurveyTypeButton theme={isGuest===true ? active: inactive } onClick={() => {setIsGuest(true)}} type = 'button'>Guest Survey</SurveyTypeButton>
                            <SurveyTypeButton theme={isGuest===false ? active: inactive } onClick={() => {setIsGuest(false)}} type = 'button'>Assistant Survey</SurveyTypeButton>
                            <h3>How Many Questions:</h3>
                            <select defaultValue = '3' onChange={(event: any) => {
                                event.preventDefault()
                                setDropdown(event.target.value)
                            }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </SurveyOptions>
                    </CreateSurveyOptions>
                    <div>
                       {questionLength(dropdown, survey)}
                    </div>
                    <CreateSurveyButtonWrapper>
                        <SurveyStyledButton type = 'button' onClick={() => handleSubmit(surveyName, isGuest, dropdown)}>Save</SurveyStyledButton>
                        <SurveyStyledButton onClick = {handleCancel}>Cancel</SurveyStyledButton>
                    </CreateSurveyButtonWrapper>
                </form>
            </CreateSurveysWrapper>   
                )
            
}
export default CreateSurvey

