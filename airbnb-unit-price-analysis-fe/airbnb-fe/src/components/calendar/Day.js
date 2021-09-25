import React, {Component} from 'react'
import styled from 'styled-components'

const DaySquare = styled.div`
    box-sizing: border-box;
    width: 14.28%;
    height: 100%;
    border: solid black 1px;
    box-sizing: border-box;
`


const DayInfo = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Top = styled.div`
    height: 38%;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 4px;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    align-items: center;
`

    const DD = styled.div`
        font-size: 20px;
    `

    const OldPrice = styled.div`
        font-size: 15px;
        text-decoration: line-through;
        margin-right: 8px;
    `

const Price = styled.div`
    font-size: 24px;
    margin-top: 3%;
    font-weight: 600;
`


class Day extends Component {
    state = {}

    
    returnDay = (date) => {
    // Convert dd/mm/yyyy => [dd, mm, yyyy]
        let dateSplit = date.split("/");
        //=====================
        let mm = dateSplit[0];
        let dd = dateSplit[1];
        let yyyy = dateSplit[2];
        //====================
        
    // If the first digit is 0 (ie: 09), return only the second digit (ie: 9)
        let ddSplit = dd.split("")
        if(parseFloat(ddSplit[0]) === 0){
            return ddSplit[1]
        }else{
            return dd;
        }
    }

    render(){
        return(
            <DaySquare>
                {this.props.day.date === "blank" 
                    ? (<></>) 
                    : (
                    <DayInfo>
                        <Top>
                            <DD>{this.returnDay(this.props.day.date)}</DD>
                            <OldPrice>$40</OldPrice>
                        </Top>
                        <Price>$100</Price>
                    </DayInfo>
                    )
                }
            </DaySquare>
        )
    }
}

export default Day;