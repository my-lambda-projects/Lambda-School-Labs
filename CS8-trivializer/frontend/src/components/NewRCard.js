import React from 'react';

import { 
    NewRCardWrapper,
    } from './primitives/NewRCard';


const NewRCard = (props) => {


    
    return (
            <NewRCardWrapper>
                {props.children}
            </NewRCardWrapper>
        )
}

export default NewRCard;