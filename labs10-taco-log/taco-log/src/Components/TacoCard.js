import React, { Component } from "react";
// import { firebase } from "../firebase/firebase";
import tacoColor from "../img/taco-color.png";
import tacoGrey from "../img/taco-grey.png";
import "../css/TacoCard.css";
import Moment from 'react-moment';

class TacoCard extends Component {
  deleteTaco = id => {
    const user = {
      user_id: this.props.userInfo.internal_id
    };
    this.props.deleteTaco(id, user);
  };

  render() {
    return (
      <div className="taco-card-wrap">
        <img className="taco-card-img" src={this.props.photo} alt="something goes here"/>
        <div className="taco-card-content">
          <div className="taco-rating-column">
            <div className="taco-card-title">{this.props.taco_location}</div>
            <div className="rating-icons">
              <img
                src={this.props.rating >= 1 ? tacoColor : tacoGrey}
                className="taco-icon"
                id="1"
                alt="taco-icon"
              />
              <img
                src={this.props.rating >= 2 ? tacoColor : tacoGrey}
                className="taco-icon"
                id="2"
                alt="taco-icon"
              />
              <img
                src={this.props.rating >= 3 ? tacoColor : tacoGrey}
                className="taco-icon"
                id="3"
                alt="taco-icon"
              />
              <img
                src={this.props.rating >= 4 ? tacoColor : tacoGrey}
                className="taco-icon"
                id="4"
                alt="taco-icon"
              />
              <img
                src={this.props.rating >= 5 ? tacoColor : tacoGrey}
                className="taco-icon"
                id="5"
                alt="taco-icon"
              />
            </div>
            <Moment format="MMMM Do YYYY">{this.props.created_at}</Moment>
          </div>

          <div className="taco-card-full-address">
            <div className="taco-card-address">
              {this.props.address.split(",")[0].trim()}
            </div>
            <div className="taco-card-city">
              {this.props.address.split(",")[1].trim()}
            </div>
          </div>
        </div>

        {/* <button onClick={() => this.deleteTaco(this.props.id)}>Delete</button> */}
      </div>
    );
  }
}

export default TacoCard;
