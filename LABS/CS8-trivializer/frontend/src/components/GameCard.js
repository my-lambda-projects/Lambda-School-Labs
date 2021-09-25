import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { 
    GameCardWrapper, 
    IconContainer,
    ViewIconWrapper,
    TrashIconWrapper,
    TrashIcon,
    ViewIcon
    } from './primitives/GameCard';

import trashIcon from '../assets/trashIcon.png'
import viewIcon from '../assets/view.png'

import { deleteGame } from '../actions';

const GameCard = (props) => {


    let delGameAndRounds = () => {
        const gameId = props.gameId
        props.deleteGame(gameId)
        
    }  

    let createdOn = props.created.slice(0, 10)
    let playedOn = props.date.slice(0, 10)
    return (
            <GameCardWrapper>
                <div> {props.name} </div>
                {console.log(props)}
                <div>created on:{createdOn}</div>
                <div>played on:{playedOn}</div>
                

                <IconContainer>
                    <TrashIconWrapper>
                        <TrashIcon src={trashIcon} onClick={()=> delGameAndRounds()}/>
                    </TrashIconWrapper>

                    <ViewIconWrapper>
                        <ViewIcon src={viewIcon} onClick={()=> {props.history.push(`/create-game/${props.id}`)}}/> 
                    </ViewIconWrapper>
                </IconContainer>
            </GameCardWrapper>
        )
}

export default connect(null, { deleteGame })(withRouter(GameCard));

