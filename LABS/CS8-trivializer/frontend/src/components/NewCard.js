import React from 'react';

import { 
    NewGameCardWrapper,
    } from './primitives/NewCard';


const NewGameCard = (props) => {


    
    return (
            <NewGameCardWrapper>
                {props.children}
            </NewGameCardWrapper>
        )
}

export default NewGameCard;