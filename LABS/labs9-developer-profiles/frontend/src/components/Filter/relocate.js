import React , { Component } from 'react'
import styled from 'styled-components'
import { LocationAuto } from './locationAuto'

export default class Relocate extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <RelocateDiv> 
                <h1>Will Relocate to</h1>
                <LocationAuto 
                    name="relocateName"
                    lat="relocateLat"
                    lon="relocateLon"
                    value={this.props.publicPageState.relocateName}
                    publicPageState={this.props.publicPageState}
                    placeholder='Anywhere, U.S.A.'
                    updatePublicPageState={this.props.updatePublicPageState}
                    filter={this.props.filter}
                    />
            </RelocateDiv>
        )
    }
}

const RelocateDiv = styled.div`
  @media (max-width: 839px) {
    display: flex;
    align-items: center;
    margin-top: 40px;
    h1 {
     margin-right: 10px;
    }
    @media (max-width: 480px) {
        flex-direction: column;
        margin: auto;
        margin-top: 20px;
       h1 {
           margin-right: 20px;
       }
    }
   }

`