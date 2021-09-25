import React from 'react';
import {ResponseButton} from './SurveyResponse.styling';

const RatingComponent = (props:any) => {

    return(
        <div className = "rating-container">
          <ResponseButton value="1" rating_answer={props.rating_answer}>1</ResponseButton>
          <ResponseButton value="2" rating_answer={props.rating_answer}>2</ResponseButton>
          <ResponseButton value="3" rating_answer={props.rating_answer}>3</ResponseButton>
          <ResponseButton value="4" rating_answer={props.rating_answer}>4</ResponseButton>
          <ResponseButton value="5" rating_answer={props.rating_answer}>5</ResponseButton> 
        </div>
    )
}

export default RatingComponent;