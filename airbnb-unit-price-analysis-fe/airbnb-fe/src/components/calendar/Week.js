import React, {Component} from 'react';
import Day from './Day';
import styled from 'styled-components'

const WeekRow = styled.div`
    display: flex;
    box-sizing: border-box;
    height: 20%;
`


class Week extends Component {
    state = {

    }

    render(){
        return(
            <WeekRow>
                {this.props.week.map(day => {
                    return(
                        <Day day = {day} key = {Math.random()}/>
                    )
                })}
            </WeekRow>
        )
    }
}

export default Week;