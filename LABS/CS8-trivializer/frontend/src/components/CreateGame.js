import React, { Component } from 'react';

import { connect } from "react-redux";

import Dropzone from 'react-dropzone';
import DatePicker from 'react-date-picker';

import { getGame, getRounds, saveGame } from '../actions';
import { withRouter } from 'react-router';
import { Nav, Link } from './primitives/Nav';
import { 
    RoundButton, 
    RoundButtonWrapper,
    AddIcon,
    AddIconWrapper,
    Text,
    TextWrapper,
    ListWrapper
    } 
        from './primitives/CreateGame';

import RCard from './RCard';
import NewRCard from './NewRCard';
import plus from '../assets/plus.png'

import jwt_decode from "jwt-decode";

import {
  CreateGameWrapper,
  LabelWrapper,
  ButtonWrapper,
  Button,
  Label,
  Title,
  GameCardWrapper,
  CGListWrapper,
  TopContainer,
  Center

} from "./primitives/CreateGame";


class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            files: [],
            date: new Date(),
            name: '',
            localGameName: null,
            user_type: null,
         }
         this.handleInput = this.handleInput.bind(this);
         this.saveGameHandler = this.saveGameHandler.bind(this);
         
    }
  
    // ADD MODAL THAT SAYS GAME SAVED SUCCESSFULLY LATER

    onDrop(files) {
      this.setState({
        files
      });
    };

    onChangeDate = date => this.setState({ date });

    handleInput(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    
    }


    componentDidMount() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        this.setState({ user_type: decoded.user_type});
        console.log("USER TYPE", decoded.user_type)

        let gameId = this.props.match.params.id;
        this.props.getRounds(gameId)
        this.props.getGame(this.props.match.params.id)
        
         this.setState({localGameName: localStorage.getItem(`gameName${this.props.match.params.id}` )})

        console.log("CreateGame CDM rounds", this.props.storedRound)    
    }

    saveGameHandler = (event) => {
        event.preventDefault()
        let { files, date, name } = this.state;
        let game = { files, date, name };
        
        localStorage.setItem(`gameName${this.props.match.params.id}`, name)

        this.props.saveGame(this.props.match.params.id, game)
    }

    

    addRoundHandler = (gameId) => {
        this.props.history.push(`/create-round/${gameId}`)
      }

    render(){
        let gameId = this.props.match.params.id;

        let list =  this.props.storedRound.map((r, i) => { 
            return (
                
                    <RCard key={r._id} id={r._id} roundName={r.roundName} numberOfQuestions={r.numberOfQuestions}/>            
                    )
                });
        let renderList;        

                if (this.state.user_type === "Premium" ) {    
        
                    renderList = list;   
                }
        
                if (this.state.user_type === "Tier 1" ) {    
                
                    renderList = list.slice(0,10);    
                }
        
                if (this.state.user_type === "Free" ) {    
                
                    renderList = list.slice(0,3); 
                    
                }        

        let hide;
            if (this.props.storedRound.length >= 3 && this.state.user_type === "Free" ) { // && this.state.user_type === "Free"
                hide = {display: "none"};
            }
            
        
            if (this.props.storedRound.length >= 10 && this.state.user_type === "Tier 1" ) { // && this.state.user_type === "Free"
                hide = {display: "none"};
            }          

    return (
        <CreateGameWrapper>
            <Nav>
              <Link onClick={()=> this.props.history.push('/games')}>Games List</Link>
              <Link onClick={()=> this.props.history.push('/settings')}>Settings</Link>
              <Link onClick={()=> this.props.history.push('/billing')}>Billing</Link>
            </Nav>
    <TopContainer>         
            
            {console.log("STORED ROUND", this.props.storedRound)}
            {console.log("STATE",this.state)}

            {/* <form> */}

            <div>
                <fieldset>        
                    <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    accept="image/jpeg, image/png, image/gif"
                    >
                    <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </fieldset>
            </div>

            <Center>
                <fieldset>
                    <DatePicker
                        onChange={this.onChangeDate}
                        value={this.state.date}
                    />      
                </fieldset>
                {console.log("games", this.props.storedGames)}
                <fieldset>
                    <LabelWrapper>
                    <Label>Game Name</Label>
                    </LabelWrapper>
                    <input
                    name="name"
                    type="text"
                    component="input"
                    autoComplete="none"
                    placeholder={this.state.localGameName}
                    onChange={this.handleInput}
                    value={this.state.name}
                    />
                </fieldset>
               </Center>
            {/* </form>     */}

     <div>
         <ButtonWrapper>
          <Button>Print Answer Sheets</Button>
        </ButtonWrapper>

        <ButtonWrapper>
          <Button>Print Answer Key</Button>
        </ButtonWrapper>

        <ButtonWrapper>
          <Button onClick={(e)=> this.saveGameHandler(e)}>Save Game</Button>
        </ButtonWrapper>
     </div> 

    </TopContainer>
      
        
        
        <CGListWrapper>
            <NewRCard>
                <TextWrapper><Text> New Round </Text></TextWrapper>
                <AddIconWrapper><AddIcon src={plus} style={hide}  style={hide} onClick={()=> this.addRoundHandler(gameId)} /></AddIconWrapper>
            </NewRCard>        
            {renderList}
            {console.log("CreateGames SG", this.props.storedGames)}
        </CGListWrapper>
        </CreateGameWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
      storedGames: state.game.storedGames,
      storedRound: state.round.storedRound,
      round: state.round.round,
      errorMessage: state.auth.errorMessage
    };
  }

  export default connect( mapStateToProps,{ getGame, getRounds, saveGame })(withRouter(CreateGame));