import styled from '@emotion/styled';

export const SurveysHeader = styled('div')`
    display: flex;
    justify-content: space-between;
    h2 {
        font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
        font-weight: normal;
        font-size: 2.25rem;
    }
    @media only screen and  (max-width: 900px) {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      h2 {
        margin: 0 0 1.25rem 0;
      }
    }
`; 

export const SurveyCardWrapper = styled('div')`
    @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 90%;
    }
`;

export const SurveyFilterButtons = styled('div')`
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    h2 {
        font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
        font-weight: normal;
        font-size: 1.25rem;
        margin-top: .8rem;
        margin-right: 1rem;
    }
    button {
        margin-right: 1rem;
        max-width: 200px;
    width: 200px;
    max-height: 64px;
    height: auto;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: var(--border-radius);
    font-weight: normal;
    font-size: 1rem;
    background: var(--color-button-background-alt);
    color: var(--color-text-dark);
    outline:none;
    }
    .active {
    /* Color */
    color: var(--color-button-text) ;
    background-color: var(--color-button-background) ;
  }
    @media only screen and (max-width: 900px) {
        justify-content: center;
    }
`;

export const SurveyCards = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 110px;
    margin-top: 1.5rem;
    background-color: white;
    border-radius: 5px;
    padding-left:  1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    // border: 1.4px solid rgba(132, 132, 132, 0.5);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    
    h3 {
        text-align: left;
        color: var(--color-text-accent);
        margin-top: .5rem;
    }
    @media only screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const SurveyRightContent = styled('div')`
   display: flex;
   flex-direction: row-reverse;
   button{
       margin: 1px 1px 0 0;
       color: var(--color-button-text);
       background:var(--color-error);
       border-radius: var(--border-radius);
       border: 0;
       cursor:pointer;
   }
   p {
       margin-right: 1rem;
   }
`;
export const SimpleButton = styled('button')`
  cursor: pointer;
`;

export const DeleteIcon = styled('img')`
   width: 20px;
   height: 20px;
   margin: 8px;
   cursor: pointer;
` 

export const ResponsesContainer = styled('div')`
    position: relative;
    top: 15px;
    margin-right: 25px;
`