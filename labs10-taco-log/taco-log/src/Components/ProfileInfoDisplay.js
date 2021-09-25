import React, { Component } from "react";
// import { Card, CardBody, CardTitle } from "reactstrap";
import "../css/ProfileInfoDisplay.css";
import tacoColor from "../img/taco-color.png";

class ProfileInfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      modal: false
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.userInfo.name,
      email: this.props.userInfo.email
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitChanges = e => {    
    e.preventDefault()  
    const changes = {
      name: this.state.name,
      email: this.state.email
    };
    this.props.updateUser(localStorage.getItem("user_id"), changes);    
    this.toggleModal()
      
  };

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="p-info-top">
        <div className={this.state.modal ? "edit-modal display" : "edit-modal"}>
          <div className="content">
            <div>Edit your information</div>
            <div className="title-input-wrap">
              <div className = "input-title">Display Name</div>
              <input
                onChange={this.handleInputChange}
                placeholder={this.state.name}
                value={this.state.name}
                name="name"
              />
            </div>
            <div className="title-input-wrap">
              <div className = "input-title">Email</div>
              <input
                onChange={this.handleInputChange}
                placeholder={this.state.email}
                value={this.state.email}
                name="email"
              />
            </div>
            <div className="edit-btns-wrap">
              <div className="edit-btn" onClick={this.submitChanges}>Accept</div>
              <div className="edit-btn" onClick={() => this.toggleModal()}>Cancel</div>
            </div>
          </div>
        </div>

        <div className="p-info-dis">
          <div className="p-info-content">
            <img className="p-img" src={this.props.userInfo.photoURL} alt="p-img"/>
            <div className="info-column">
              <div className="p-info-name">{this.props.userInfo.name}</div>
              <div className="p-info-email">{this.props.userInfo.email}</div>
              <div className="p-info-logged">
                <img src={tacoColor} className="p-info-logged-img" alt="something"/>
                <span>{this.props.userInfo?this.props.userInfo.user_stats.tacos_logged:0}</span> Tacos
                Logged
              </div>
            </div>
            <div className="edit-column">
              <div className="edit-link" onClick={() => this.toggleModal()}>
                <img
                  onClick={() => this.toggleModal()}
                  src={require("../img/edit-icon.png")}
                  className="edit-icon"
                  alt="edd"
                />
                <span>Update Your Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfoDisplay;
