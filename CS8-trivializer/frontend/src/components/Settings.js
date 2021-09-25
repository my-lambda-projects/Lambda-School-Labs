import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { updateSettings, signOut } from "../actions/index";
import { Nav, Link } from './primitives/Nav';
import {
  SettingsWrapper,
  LabelWrapper,
  ButtonWrapper,
  Button,
  Label,
  Title
} from "./primitives/Settings";

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
        orgName: '' ,
        email: '',
        oldPassword: '',
        password: ''
      
    }
 

    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const email = decoded.email;
    const orgName = decoded.orgName;

    console.log("USER_TYPE", decoded.user_type)
    this.setState({ orgName, email })
  }

    handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value })

  }

  onSubmit = event => {
    event.preventDefault();

    let formProps = this.state;
    console.log("FORMPROPS IN SUBMING", formProps)
    this.props.updateSettings(formProps, () => {
      this.props.history.push('/games');
  });
} 

  // onSubmit = (event) => {
  //   event.preventDefault();
  //   let formProps = this.state;
  //   const gameId = this.props.match.params.id;
  //   let round = this.props.round;
  //   console.log(this.state.roundName);
  
  //   this.props.getThree( formProps, () => {
      
  //       this.props.addRound(gameId, this.props.round, (id)=> {
  //         this.props.history.push(`/create-game/${id}`);
  //       });
  //   });
     
  // }
  

  
  render() {

    // const token = localStorage.getItem('token');
    // const decoded = jwt_decode(token);
    // const email = decoded.email;
    // const orgName = decoded.orgName;
    
    
    return (
      <SettingsWrapper>
                  <Nav>
                    <Link onClick={()=> this.props.history.push('/games')}>Games List</Link>
                    <Link onClick={()=> this.props.history.push('/sign-in')}>Sign-In</Link>
                    <Link onClick={()=> this.props.history.push('/sign-up')}>Sign-Up</Link>
                    <Link onClick={()=> this.props.history.push('/billing')}>Billing</Link>
                </Nav>  

        <Title>SETTINGS PAGE</Title>
        <form onSubmit={(e)=> this.onSubmit(e)} >
          <fieldset>
            <LabelWrapper>
              <Label>Organization Name</Label>
            </LabelWrapper>
            <input
              name="orgName"
              placeholder={this.state.orgName}
              type="text"
              component="input"
              autoComplete="none"
              onChange={this.handleInput}
              value={this.state.orgName}
            />
          </fieldset>
          <fieldset>
            <LabelWrapper>
              <Label>Email</Label>
            </LabelWrapper>
            <input
              name="email"
              type="text"
              component="input"
              autoComplete="none"
              placeholder={this.state.email}
              onChange={this.handleInput}
              value={this.state.email}
            />
          </fieldset>
          <fieldset>
            <LabelWrapper>
              <Label>Old Password</Label>
            </LabelWrapper>
            <input
              name="oldPassword"
              type="password"
              component="input"
              autoComplete="none"
              onChange={this.handleInput}
              value={this.state.oldPassword}
            />
          </fieldset>
          <fieldset>
            <LabelWrapper>
              <Label>New Password</Label>
            </LabelWrapper>
            <input
              name="password"
              type="password"
              component="input"
              autoComplete="none"
              onChange={this.handleInput}
              value={this.state.password}
            />
          </fieldset>
          <button>Save</button>
          <button
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            {" "}
            Home{" "}
          </button>
          <button onClick={() => this.props.signOut()}>Sign Out</button>
        </form>
      </SettingsWrapper>
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}
export default
  connect( mapStateToProps, { updateSettings, signOut })(withRouter(Settings));
