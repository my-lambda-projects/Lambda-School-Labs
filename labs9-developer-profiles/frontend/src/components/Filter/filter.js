import React, { Component } from "react";
import styled from "styled-components";
import JobTitles from "./jobTitles";
import Located from "./located";
import Relocate from "./relocate";
import { Grommet } from "grommet";

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  buttons() {
    return (
      <div className="buttons">
        <button onClick={() => this.props.filter(true)}>Search</button>
        <button onClick={() => this.props.updatePublicPageState(false)}>
          Clear{" "}
        </button>
      </div>
    );
  }

  // ham = () => {
  //   return(
  //       <div className="menu-button-open">
  //             <i onClick={()=> this.setState({ menuOpen: true })}
  //               class="fa fa-bars"></i>
  //       </div>
  //     )
  // }
  // exit = () => {
  //   return(
  //   <div className="menu-button-close">
  //       <i onClick={()=> this.setState({ menuOpen: false })} class="fa fa-times"></i>
  //  </div>)
  // }

  render() {
    // console.log(this.state.menuOpen)
    return (
      <Grommet theme={filterTheme}>
        <Hamburger menuOpen={this.state.menuOpen}>
          <i
            onClick={() => this.setState({ menuOpen: true })}
            class="fa fa-bars"
          />

        </Hamburger>
        <FilterBoxDiv menu={this.state.menuOpen}>
          <div className="menu-button-close">
            <i
              onClick={() => this.setState({ menuOpen: false })}
              class="fa fa-times"
            />
          </div>
          {window.innerWidth < 839 ? null : (
            <h2>
              <strong>{this.props.publicPageState.usersFound} </strong>
              possible profiles
            </h2>
          )}
          <JobTitles
            updatePublicPageState={this.props.updatePublicPageState}
            toggleCheckMarks={this.props.toggleCheckMarks}
            publicPageState={this.props.publicPageState}
          />
          <Located
            updatePublicPageState={this.props.updatePublicPageState}
            publicPageState={this.props.publicPageState}
            filter={this.props.filter}
          />
          <div className="relocate-container">
            <Relocate
              updatePublicPageState={this.props.updatePublicPageState}
              publicPageState={this.props.publicPageState}
              filter={this.props.filter}
            />
          </div>
          <div className="buttons">
            <button onClick={() => this.props.filter(true)}>Search</button>
            <button onClick={() => window.location.reload()}>
              Clear{" "}
            </button>
          </div>
        </FilterBoxDiv>
      </Grommet>
    );
  }
}

const filterTheme = {
  global: {
    colors: {
      brand: "coral"
    }
  },
  textInput: {
    extend: {
      width: "200px",
      height: "40px",
      "font-size": "15px"
    }
  },
  rangeInput: {
    extend: {
      width: "250px"
    }
  }
};

const Hamburger = styled.div`
  z-index: 10;
  height: 20px;
  width: 100%;
  top: ${props => (props.menuOpen ? 0 : 50)}px;
  justify-content: center;
  margin: auto;
  position: fixed;
  cursor: pointer;
  font-size: 30px;
  color: grey;
  @media (min-width: 840px) {
    display: none;
  }
  @media (max-width: 839px) {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    width: 100%;
  }
  @media (max-width: 480px) {
  }
`;

const FilterBoxDiv = styled.aside`
  padding-left: 20px;
  background-color: white;
  z-index: 10;
  width: 272px;
  height: auto;
  padding-top: 80px;
  display: flex;
  position: fixed;
  flex-direction: column;
  overflow: auto;
  .menu-button-close {
    color: grey;
    cursor: pointer;
    font-size: 30px;
    position: fixed;
    right: 15px;
    top: 50px;
    @media (min-width: 840px) {
      display: none;
    }
  }
  .buttons {
    /* border: 1px solid red; */
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 839px) {
      box-sizing: content-box;
      align-self: center;
      width: 40%;
      justify-content: center;
      margin: 25px 0;
    }
    button {
      width: 70%;
      color: black;
      margin: 10px;
      padding: 5px;
      font-size: 20px;
      letter-spacing: 1.5px;
      background: white;
      border: solid 1px black;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      outline-style: none;
      &:hover {
        cursor: pointer;
        background: black;
        color: white;
      }
      @media (max-width: 839px) {
        height: 100%;
      }
      @media (max-width: 480px) {
      width: 120px;
    }
    }
  }
  .relocate-container {
    @media (max-width: 480px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .buttons {
      /* border: 1px solid red; */
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      left: -25px;
      @media (max-width: 839px) {
        /* border: 1px solid blue; */
        width: 80%;
        justify-content: center;
      @media (max-width: 480px) {
      margin: auto;
    }
      }
      button {
        width: 70%;
        color: black;
        margin: 10px;
        padding: 5px;
        font-size: 20px;
        letter-spacing: 1.5px;
        background: white;
        border: solid 1px black;
        border-radius: 20px;
        /* display: flex;
        align-items: center;
        justify-content: center; */
        outline-style: none;
        &:hover {
          cursor: pointer;
          background: black;
          color: white;
        }
        /* @media (max-width: 839px) {
        width: 20%;
        height: 50px;
        } */
        @media (max-width: 839px) {
          width: 50%;
          size: 15px;
        }
      }
    }

    @media (max-width: 839px) {
      /* border: 1px solid red; */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  @media (max-width: 839px) {
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding-right: 20px;
    height: ${props => (props.menu ? 370 : 0)}px;
    z-index: ${props => (props.menu ? 1 : -10)};
    font-size: 12px;
    padding-top: 70px;
    border-bottom: solid lightgrey 1px;
    padding-right: 20px;
    h1 {
      font-size: 15px;
      margin-bottom: 0;
    }
    h2 {
      font-size: 15px;
      margin-bottom: 0;
    }
    @media (max-width: 480px) {
      height: ${props => (props.menu ? 100 : 0)}vh;
      flex-direction: column;
      h1 {
        font-size: 25px;
        margin-bottom: 10px;
      }
    }
  }
`;

// <FormSection>
//               <form>
//                 {/* places */}
//                 <div className="select-input-container">
//                   <LabelContainer>
//                     <label htmlFor="userPlacesInterested">
//                       Places Interested:
//                     </label>
//                     {placesInterestedSuccess ?
//                       <span>
//                         <i className="success fa fa-check-circle"></i>
//                       </span>
//                       :
//                       null
//                     }
//                   </LabelContainer>
//                   <Select
//                     id="userPlacesInterested"
//                     name="placesInterestedInput"
//                     value={this.state.placesInterestedInput}
//                     onSearch={this.onPlacesChange}
//                     onChange={this.choosePlacesInterested}
//                     options={this.state.placesAutocomplete}
//                   />
//                   <div className="showing-places">
//                     {this.state.placesInterestedArr.length === 0 ?
//                       null
//                       :
//                       this.state.placesInterestedArr.map((location) => {
//                         return (
//                           <span className="places" key={location}>
//                             {location}
//                           </span>
//                         );
//                       })
//                     }
//                   </div>
