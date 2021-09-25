
import React, { Component } from "react";
import styled from "styled-components";
import { CheckBox } from "grommet";



export default class JobTitles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <JobTitlesDiv>
        <header>
          <h1 className="filtersTitle">Filters</h1>
        </header>
        <form className="filters-container">
        <div className="checkfsw">
          <CheckBox
            checked={this.props.publicPageState.filters.includes(
              "Full Stack Web"
            )}
            label="Full Stack Web"
            onChange={() => this.props.toggleCheckMarks("Full Stack Web")}
          />
          </div>
          <div className="check">
          <CheckBox
            className="checkmark"
            checked={this.props.publicPageState.filters.includes("iOS")}
            label="iOS"
            onChange={() => this.props.toggleCheckMarks("iOS")}
          />
          </div>
          <div className="checkAndroid">
          <CheckBox
            className="checkmark"
            checked={this.props.publicPageState.filters.includes("Android")}
            label="Android"
            onChange={() => this.props.toggleCheckMarks("Android")}
          />
          </div>
          <div className="check">
          <CheckBox
            className="checkmark"
            checked={this.props.publicPageState.filters.includes("UI/UX")}
            label="UI/UX"
            onChange={() => this.props.toggleCheckMarks("UI/UX")}
          />
          </div>
        </form>
      </JobTitlesDiv>
    );
  }
}

const JobTitlesDiv = styled.div`
  span {
    font-size: 15px;
  }
  .filters-container {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  @media (max-width: 839px) {
    .filtersTitle {
      display: none;
    }
    margin-bottom: 10px;
    .filters-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
      @media (max-width: 839px) {
        flex-direction: row;
        height: 60px;
        margin-top: 20px;
        h1 {
          font-size: 18px;
        }
        @media (max-width: 480px) {
          align-items: center;
          height: 150px;
          flex-wrap: wrap;
          justify-content: space-around;
          .check {
            width: 100px;
            height: 40px;
          }
          .checkfsw {
            height: 40px;
            width: 140px;
          }
          .checkAndroid {
            height: 40px;
            width: 140px;
          }
        }
      }
    }
  }
`;
