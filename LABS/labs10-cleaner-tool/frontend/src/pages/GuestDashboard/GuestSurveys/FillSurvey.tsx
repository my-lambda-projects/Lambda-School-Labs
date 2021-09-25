import React, { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig }  from 'axios'
import Boolean from '../../../components/QuestionTypes/Boolean'
import OutOfFive from '../../../components/QuestionTypes/OutOfFive'
import FreeText from '../../../components/QuestionTypes/FreeText'
import { 
    CreateSurveyButtonWrapper,
    SurveyStyledButton,
    CreateSurveysWrapper
} from '../../CreateSurvey/CreateSurvey.styling'
import styled from '@emotion/styled';
import { DateContainer } from '../GuestDashboard.styling';



const StyledForm = styled.form`
    margin-top: 30px;
`
const FillSurvey = (props: any)=>{
    const surveyId = props.match.params.surveyId;
    const staysurveyId = props.match.params.staysurveyId;
    const [questions, setQuestions]= useState([])
    const [stayInfo, setStayInfo] = useState([])
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [error, setError] = useState(false)
    const userId = props.match.params.id
    const url = process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com';
    useEffect(() => {
        (async () => {
            const questionResponse = await axios.get(`${url}/surveysquestions/${surveyId}`)
            setQuestions(questionResponse.data.questions);
            const stayResponse = await axios.get(`${url}/gueststay/${props.match.params.stayId}`)
            console.log(stayResponse)
            setStayInfo(stayResponse.data)
        })()
    }, []);
    async function handleQuestions(answer: string, type: number,headers: any, id: number) {
        if (!answer) {
            return console.log('missing answer')
        }
        //@ts-ignore
        const stayId = stayInfo.stay_id
        //@ts-ignore
        const body: any = {
            answer: answer,
            answer_type: type,
            //@ts-ignore
            stay_id: stayId,
            question_id: id,
            //@ts-ignore
            house_name: stayInfo.house_name,
            //@ts-ignore
            guest_name: stayInfo.guest_name,
            //@ts-ignore
            photo: stayInfo.photo_url
        }
        console.log(body)
        const data = await axios.post(`${url}/questionanswers/`, body, headers)
        //@ts-ignore
        if(data.errorMessage){
            setError(true)
        }
    }
    async function handleUpdate(id: any){
        if(!error){
            const update = await axios.put(`${url}/surveys/${id}`);
            return update
        }
    }
    async function markComplete(id: any){
     await axios.put(`${url}/stays/surveys/${id}`);
    }
    const handleSubmit = () =>{
        const headers: AxiosRequestConfig = {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        };
        const questionInfo1 = questions[0]
        const questionInfo2 = questions[1]
        const questionInfo3 = questions[2]
        if(questions.length == 3){
            //@ts-ignore
            handleQuestions(answer1, questionInfo1.type, headers, questionInfo1.id)
            //@ts-ignore
            handleQuestions(answer2, questionInfo2.type, headers, questionInfo2.id)
            //@ts-ignore
            handleQuestions(answer3, questionInfo3.type, headers, questionInfo3.id)
        }
        if (questions.length == 2) {
            //@ts-ignore
            handleQuestions(answer1, questionInfo1.type, headers, questionInfo1.id)
            //@ts-ignore
            handleQuestions(answer2, questionInfo2.type, headers, questionInfo2.id)

        }
        if (questions.length == 1) {
            //@ts-ignore
            handleQuestions(answer1, questionInfo1.type, headers, questionInfo1.id)
        }
        const update = handleUpdate(surveyId)
        markComplete(staysurveyId);
        props.history.push(`/guestdashboard/${props.match.params.stayId}/surveys`)
    }
    const handleCancel = () =>{
        props.history.push(`/guestdashboard/${props.match.params.stayId}/surveys`)
    }
    return (
        <CreateSurveysWrapper>
        <StyledForm onSubmit = {handleSubmit}>
            {
        questions.map((question: any,index)=>{
            if (index == 0) {
                if(question.type == 1){
                
                    return <Boolean
                        key={'bool0'}
                        index={index}
                        question={question}
                        answer={answer1}
                        setAnswers={setAnswer1}
                    />
             
                }
                if(question.type == 2){
                    return <OutOfFive
                        key={'five0'}
                        index={index}
                        question={question}
                        answer={answer1}
                        setAnswers={setAnswer1}
                    />
                }
                if (question.type == 3) {
                    return <FreeText
                        key={'free0'}
                        index={index}
                        question={question}
                        answer={answer1}
                        setAnswers={setAnswer1}
                    />
                }
            }
            if (index == 1) {
                if (question.type == 1) {

                    return <Boolean
                        key={'bool1'}
                        index={index}
                        question={question}
                        answer={answer2}
                        setAnswers={setAnswer2}
                    />

                }
                if (question.type == 2) {
                    return <OutOfFive
                        key={'five1'}
                        index={index}
                        question={question}
                        answer={answer2}
                        setAnswers={setAnswer2}
                    />
                }
                if (question.type == 3) {
                    return <FreeText
                        key={'free1'}
                        index={index}
                        question={question}
                        answer={answer2}
                        setAnswers={setAnswer2}
                    />
                }
            }
            if (index == 2) {
                if (question.type == 1) {

                    return <Boolean
                        key={'bool2'}
                        index={index}
                        question={question}
                        answer={answer3}
                        setAnswers={setAnswer3}
                    />

                }
                if (question.type == 2) {
                    return <OutOfFive
                        key={'five2'}
                        index={index}
                        question={question}
                        answer={answer3}
                        setAnswers={setAnswer3}
                    />
                }
                if (question.type == 3) {
                    return <FreeText
                        key={'free2'}
                        index={index}
                        question={question}
                        answer={answer3}
                        setAnswers={setAnswer3}
                    />
                }
            }
        })
            }
            <CreateSurveyButtonWrapper>
            <SurveyStyledButton type = 'submit'>Save</SurveyStyledButton>
            <SurveyStyledButton type='button' onClick ={handleCancel}>Cancel</SurveyStyledButton>
            </CreateSurveyButtonWrapper>
        </StyledForm>
        </CreateSurveysWrapper>
    )
}

export default FillSurvey