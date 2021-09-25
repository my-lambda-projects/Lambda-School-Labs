import React, { Component } from "react";
import styled from "styled-components";
import { RangeInput } from "grommet";
import { LocationAuto } from "./locationAuto";

export default class Located extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milesFrom: 5,
    };
  }

  changeHandler = e => {
    this.setState({
      milesFrom: e.target.value
    });
    this.props.updatePublicPageState({
      milesFrom: +e.target.value
    });
  };

  render() {
    return (
      <LocatedDiv>
          <h1>Located</h1>
          <div className="within-container">
            <span className="within">within {this.props.publicPageState.milesFrom} miles of</span>
            <RangeInput 
              min={5} 
              max={300} 
              step={5}
              className="range" 
              onChange={this.changeHandler} 
              value={this.props.publicPageState.milesFrom} />
          </div>
          <label className="container">
          <LocationAuto
            name="locatedCity"
            lat="locatedLat"
            lon="locatedLon"
            // id="locatedCityId"
            publicPageState={this.props.publicPageState}
            value={this.props.publicPageState.locatedName}
            updatePublicPageState={this.props.updatePublicPageState}
            placeholder="Earth"
            filter={this.props.filter}
          />
          </label>
      </LocatedDiv>
    );
  }
}

const LocatedDiv = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  @media (max-width: 839px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
  }
  @media (max-width: 480px) {
    flex-direction:column;
      .within-container {
      flex-direction: row;
    }
      font-size: 20px;
  }
  h1 {
    font-size: 25px;
  }
  .range{
    width: 90%;
    padding: 15px;
  }
  .within-container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
    justify-content: center;
    @media (max-width: 839px) {
      align-items: center;
      width: 50%;
      .range-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span.within {
          width: 90px;
        }
        .milesOf {
          width: 80px;
          margin-left: 10px;
        
        }
      }
      h1 {
        margin-right: 5px;
      }
      @media (max-width: 480px) {
        flex-direction: column;
        justify-content: flex-start;
      }
    }
  }
`;
