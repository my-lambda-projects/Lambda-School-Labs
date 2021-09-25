import styled from '@emotion/styled';
import React from 'react';

export const SurveyResponseContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ResponsesContainer = styled('div')`
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.20);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    width: 65%;
    margin: 20px;
    background: white;
`;

export const ResponsesGuest = styled('div')`
    display: flex;
}
`;

export const ResponsesImage = styled('img')`
    height: 90px;
    width: 75px;    
    margin: 25px 15px 25px 30px;
`;

export const ResponsesInfo = styled('div')`
    text-align: left;
    height: 85px;
    line-height:0.50rem; 
    margin-top: 25px;
`;

export const ResponsesAnswers = styled('div')`
    text-align: left;
    margin: 15px;
`;

export const SingleResponse = styled('div')`
    line-height: 0.25rem;
    margin: 15px 15px 30px 15px;
    word-spacing: 0.10rem; 
    font-size: 1rem;
`;

export const SingleResponseH3 = styled('h3')`
    color: #428acb;
`;

export const ResponseButton = styled('button')`
    width: 60px;
    height: 25px;
    margin-right: 10px;
    border-radius: 5px;
    font-size: 0.75rem;
    background: white;
    border: 1px solid black;
    color: #393534;
    @media(max-width: 650px){
        margin-bottom: 10px;
    }

    ${(props:any) => 
        (props.yn_answer === "no" && props.value === "no" ?
   `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null    
    )}
    ${(props:any) => (props.yn_answer === "yes" && props.value === "yes" ? 
    `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null
    )}

    ${(props:any) => (props.rating_answer === "1" && props.value === "1" ? 
    `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null
    )}

    ${(props:any) => (props.rating_answer === "2" && props.value === "2" ? 
    `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null
    )}

    ${(props:any) => (props.rating_answer === "3" && props.value === "3" ? 
    `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null
    )}

    ${(props:any) => (props.rating_answer === "4" && props.value === "4" ? 
    `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null
    )}

    ${(props:any) => (props.rating_answer === "5" && props.value === "5" ? 
    `background: #428acb;
    color: white;
    border: 1px solid #428acb;`:
    null
    )}
`;

export const SurveyResponseTitle = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width:65%;
    @media(max-width: 650px){
        align-items: center;
    }  
`; 

export const SurveyResponseH1 = styled('h1')`
    font-size: 1.9rem;
    font-weight: 500;
`;

export const SurveyResponseSelect = styled('select')`
    font-size: 1rem;
`;
