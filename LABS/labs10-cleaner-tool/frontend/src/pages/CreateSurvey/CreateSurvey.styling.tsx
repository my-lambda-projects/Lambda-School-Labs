import styled from '@emotion/styled';



export const CreateSurveysWrapper = styled('div')`
    text-align: left;
    margin: 0 8rem 0 15rem;
    //border: 1px solid red;
    @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 90%;
    }
`;


export const CreateSurveyOptions = styled('div')`
    border-radius: 5px;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    margin-bottom: 1.5rem;
    h2 {
        font-size: 1rem;
        color: var(--color-text-accent);
        padding-top: 1rem;
        //border: 1px solid green;
    }
    h3 {
        font-size: 1rem;
        color: var(--color-text-accent);
        padding-top: 1rem;
    }
`;

export const CreateSurveyHeader = styled.h1`
    font-size: 2rem;
    font-weight: normal;
    //border: 1px solid green;
    @media only screen and (max-width: 900px) {
        text-align: center;     
        margin-top: 2rem;
        //border: 1px solid purple;
    }
`;


export const CreateSurveyInput = styled.input`
    padding-left: .5rem;
    padding-bottom: .5rem;
    width: 70%;
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid #949494;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

export const SurveyOptions = styled('div')`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    width: 70%;
    //border: 1px solid blue;
    h3 {
        font-size: .8rem;
        margin-right: 1rem;
    }
`;

export const SurveyType = styled.h3`
    font-size: .8rem;
    margin-top: 1rem;
    margin-right: 1rem;
    //border: 1px solid purple;
`;

export const SurveyTypeButton = styled.button`
    opacity: 1;
    max-width: 200px;
    width: 200px;
    max-height: 64px;
    height: auto;
    padding: 0.5rem 1rem;
    border: 1px solid var(${props=>(props.theme.text)});
    border-radius: var(--border-radius);
    font-weight: normal;
    font-size: 1rem;
    background: var(${props=>(props.theme.bg)});
    color: var(${props=>(props.theme.text)});
    outline:none;
    cursor: pointer;
    margin-right: 1.2rem;
`;

export const SurveyQuestions = styled.h3`
    font-size: .8rem;
    margin: 0 1rem 0 3rem;  
`;

export const CreateSurveyQuestionInput = styled('input')`
    padding-left: .5rem;
    width: 70%;
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid #949494;      
    height: 50px;
    &placeholder {
        font-size: 3rem;
    }
    @media (max-width: 900px) {
        width: 100%;
    }
`;

export const CreateSurveyButtonWrapper = styled('div')`
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 0 auto;
    //border: 1px solid black;
`;

export const QuestionOptions = styled('div')`
    margin-top: 1rem;
    margin-bottom: .5rem;
    width: 60%;
    //border: 1px solid red;
    @media only screen and (max-width: 900px) {
        display: flex;
        width: 100%;
    }
`;

export  const SurveyStyledButton = styled('button')` 
    opacity: 1;
    width: 150px;
    max-height: 64px;
    height: 30px;
    padding: 0.5rem 1rem;
    border: 1px solid var(${props=>(props.theme.text ?props.theme.text:'--color-button-text')});
    border-radius: var(--border-radius);
    font-weight: normal;
    font-size: 1rem;
    background: var(${props=>(props.theme.bg ? props.theme.bg:'--color-accent')});
    color: var(${props=>(props.theme.text ?props.theme.text:'--color-button-text')});
    cursor: pointer;
    margin-right: 1.2rem;
    outline:none;
    @media only screen and (max-width: 900px) {
        width: 180px;
    }
`;


