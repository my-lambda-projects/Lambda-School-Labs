
import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Select } from "grommet";
// THIS COMPONENT needs the following props passed in
//placeholder
//name
//id - (optional for constructing state to send to a parent component)

export class LocationAuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: "",
      locationAutocomplete: []
    };
  }

  inputHandler = async e => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {
        inputLocation: e
      })
      .then(response => {
        const objArr = response.data.predictions.map(location => {
          return {
            name: location.description,
            id: location.place_id
          };
        });
        const pureArr = response.data.predictions.map(location => {
          return {
            name: location.description
          };
        });
        this.setState({
          locationAutocomplete: pureArr,
          objArr: objArr
        });
      })
      .catch(error => {
        console.log(error);
      });

    //sets component state
    this.setState({ [this.props.name]: e });

    //sets parent state
    if (e.length === 0) {
      // console.log("zero")
      await this.props.updatePublicPageState({
        [this.props.name]: null,
        [this.props.lat]: null,
        [this.props.lon]: null
      });
      this.props.filter(true);
    } else {
      this.props.updatePublicPageState({
        [this.props.name]: e
      });
    }
  };

  chooseOnEnter = e => {
    if (e.keyCode === 13) {
      this.chooseCurrentLocation(e);
    }
  };

  chooseCurrentLocation = async e => {
    let location = this.state.objArr.filter(each => {
      return e.value === each.name;
    });
    const { id, name } = location[0];
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/gio`, { placeId: id })
      .then(res => {
        const { lat, lng } = res.data.result.geometry.location;
        this.setState({
          [this.props.name]: name,
          locationAutocomplete: []
        });
        // console.log(name)
        this.props.updatePublicPageState({
          [this.props.lat]: lat,
          [this.props.lon]: lng,
          [this.props.name]: name || null
        });
        this.props.filter(true);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <LocationAutoDiv>
        <div>
          <label htmlFor="usercurrentLocation" />
          {/* change to input if it stops working  */}
          {/* <TextInput
                    size="small"
                    type="text"
                    autoComplete="off"
                    // id="usercurrentLocation"
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    value={this.state[this.props.name]}
                    onChange={this.inputHandler}
                  /> */}
          <Select
            // id="placeSuggestions"
            // name={this.props.name}
            id="usercurrentLocation"
            placeholder={this.props.placeholder}
            value={this.state[this.props.name]}
            onSearch={this.inputHandler}
            onChange={this.chooseCurrentLocation}
            options={this.state.locationAutocomplete.map(each => each.name)}
          />
          {/* <div className="option" htmlFor="placeSuggestions">
                    {this.state.locationAutocomplete.length === 0 ? null :
                      this.state.locationAutocomplete.map(location => {
                        return (
                          <span
                            id="placeSuggestions"
                            key={location.id}
                            tabIndex="0"
                            data-name={location.name}
                            data-id={location.id}
                            onKeyUp={this.chooseOnEnter}
                            onClick={this.chooseCurrentLocation}
                          >{location.name}</span>
                        );
                      })
                    }
                  </div> */}
        </div>
      </LocationAutoDiv>
    );
  }

  // triggerAutoComplete = (e) => {
  //     this.setState({ [e.target.name]: e.target.value });
  //     axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=${process.env.REACT_APP_GOOGLE_AUTO_COMPLETE}`).then(response => {
  //         let newArr = response.data.predictions.map(location => {
  //             return {
  //                 name: location.description,
  //                 id: location.id
  //             };
  //         });
  //         this.setState({
  //             locationSuggestions: newArr
  //         });
  //     }).catch(err => {
  //         console.log(err)
  //     })
  // }

  // chooseOnEnter = (e) => {
  //     if (e.keyCode === 13) {
  //       this.selectSuggestion(e);
  //     }
  // }

  // selectSuggestion = (e) => {
  //     this.setState({
  //        [this.props.name]: e.target.dataset.name,
  //         locationSuggestions: [],
  //     });
  //     this.props.updatePublicPageState({
  //         [this.props.name]: e.target.dataset.name,
  //         [this.props.id]: e.target.dataset.id
  //     })
  // }

  // render(){
  //     return(
  //         <LocationAutoDiv>
  //             <input
  //                 type="text"
  //                 autoComplete="off"
  //                 value={`${this.state[this.props.name]}`}
  //                 placeholder={this.props.placeholder}
  //                 name={this.props.name}
  //                 id={this.props.id}
  //                 onChange={this.triggerAutoComplete}>{this.value}</input>
  //             <div className="option" htmlFor="located">
  //                     {this.state.locationSuggestions &&
  //                         this.state.locationSuggestions.length > 0 ?
  //                         this.state.locationSuggestions.map(location => {
  //                             return (
  //                                 <span
  //                                     name={this.props.name}
  //                                     id={this.props.id}
  //                                     key={location.id}
  //                                     tabIndex="0"
  //                                     data-name={location.name}
  //                                     data-id={location.id}
  //                                     onKeyUp={this.chooseOnEnter}
  //                                     onClick={this.selectSuggestion} >
  //                                 {location.name}
  //                                 </span>
  //                             );
  //                         })
  //                     : null}
  //                 </div>
  //         </LocationAutoDiv>
  //     )
  // }
}

const LocationAutoDiv = styled.div`
  #usercurrentLocation {
    /* border: 1px solid red; */
    padding: 0px;
    width: 90%;
    margin: 0, 0, 10px, 0;
  }
`;
