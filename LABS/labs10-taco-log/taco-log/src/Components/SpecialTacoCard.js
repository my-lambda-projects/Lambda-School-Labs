import React, { Component } from "react";
// import { firebase } from "../firebase/firebase";
import tacoColor from "../img/taco-color.png";
import tacoGrey from "../img/taco-grey.png";
import Moment from 'react-moment';
import "../css/TacoList.css";
// import "../css/SpecialTacoCard.css";



class SpecialTacoCard extends Component {
  deleteTaco = id => {
    const user = {
      user_id: this.props.userInfo.internal_id
    };
    this.props.deleteTaco(id, user);
  };

  render() {
    return (
      <div className = "special-taco-card-wrap">
        {/* <div className = "taco-card-id">{this.props.id}</div> */}
        <div className="global-card-header">
          <div className="special-taco-card-name">{this.props.name}</div>
          <div className="speacial-taco-card-location"> Logged a taco at {this.props.taco_location} </div>
        </div>
        <div className = "special-rating-icons"> 
          <img      
            src={this.props.rating >= 1 ? tacoColor : tacoGrey}
            className="special-taco-icon"
            id="1"
            alt= "special-taco-icon"
          />
          <img
            src={this.props.rating >= 2 ? tacoColor : tacoGrey}
            className="special-taco-icon"
            id="2"
            alt= "special-taco-icon"
          />
          <img
            src={this.props.rating >= 3 ? tacoColor : tacoGrey}
            className="special-taco-icon"
            id="3"
            alt= "special-taco-icon"
          />
          <img
            src={this.props.rating >= 4 ? tacoColor : tacoGrey}
            className="special-taco-icon"
            id="4"
            alt= "special-taco-icon"
          />
          <img
            src={this.props.rating >= 5 ? tacoColor : tacoGrey}
            className="special-taco-icon"
            id="5"
            alt = "special-taco-icon"
          />
        <Moment className="special-taco-time" format="MMMM Do YYYY">{this.props.created_at}</Moment>
        </div> 
        <p className="description">{this.props.taco_description}</p>       
        {/* <button onClick={() => this.deleteTaco(this.props.id)}>Delete</button> */}
      </div>
    );
  }
}

export default SpecialTacoCard;
