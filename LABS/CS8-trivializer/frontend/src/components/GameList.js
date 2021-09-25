import React, { Component } from 'react';

import { GameWrapper, ListWrapper, AddIcon, AddIconWrapper, Text, TextWrapper, Button, ButtonWrapper } from './primitives/GameList';
import { Nav, Link } from './primitives/Nav';

import requireAuth from '../hoc/requireAuth';

import { connect } from 'react-redux';
import { compose } from 'react';
import { addGame, getGames } from '../actions';
import { withRouter } from 'react-router';


import GameCard from './GameCard';
import NewCard from './NewCard';

import jwt_decode from "jwt-decode";

import plus from '../assets/plus.png'

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_type: null,
        }
    }
 
    componentDidMount() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.sub;

        this.props.getGames(userId);
        this.setState({ user_type: decoded.user_type});
        console.log("USER TYPE", decoded.user_type)
        console.log("USER ID", decoded.sub)
    }

    addGameHandler = userId  => {
        this.props.addGame( userId, (id) => {
          this.props.history.push(`/create-game/${id}`);
        });
      };
   

    homeRouteClick = () => {
        this.props.history.push("/");
      };

    render() {
        
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.sub;
        
        let renderList;
     
        let list =  this.props.storedGames.map((g, i) => { 
            return <GameCard key={g._id} id={g._id} gameId={g._id} created={g.createdAt} name={g.name} logo={g.logo} date={g.date}  />
            
            });

    
        if (this.state.user_type === "Premium" ) {    
        
            renderList = list;   
        }

        if (this.state.user_type === "Tier 1" ) {    
        
            renderList = list.slice(0,10);    
        }

        if (this.state.user_type === "Free" ) {    
        
            renderList = list.slice(0,1); 
            
        }

        let hide;
            if (this.props.storedGames.length >= 1 && this.state.user_type === "Free" ) { // && this.state.user_type === "Free"
                hide = {display: "none"};
            }
        
       
            if (this.props.storedGames.length >= 10 && this.state.user_type === "Tier 1" ) { // && this.state.user_type === "Free"
                hide = {display: "none"};
            }    
            

        return( 
            <GameWrapper>
                <Nav>
                    <Link onClick={()=> this.props.history.push('/settings')}>Settings</Link>
                    <Link onClick={()=> this.props.history.push('/sign-in')}>Sign-In</Link>
                    <Link onClick={()=> this.props.history.push('/sign-up')}>Sign-Up</Link>
                    <Link onClick={()=> this.props.history.push('/billing')}>Billing</Link>
                </Nav>    

    
                <ListWrapper>
                    <div style={hide}><NewCard  >
                        <TextWrapper><Text> New Game </Text></TextWrapper>
                        <AddIconWrapper><AddIcon src={plus} onClick={()=> this.addGameHandler(userId)} /></AddIconWrapper>
                    </NewCard></div>    
                    {renderList}
                
                </ListWrapper>
                
                {console.log("STOREDedGames GL", this.props.storedGames)}
            </GameWrapper>
        )
    }
}

function mapStateToProps(state) {
    return { 
        storedRound: state.round.storedRound,
        storedGames: state.game.storedGames,  
        errorMessage: state.auth.errorMessage 
    };
  }
  
  export default connect(mapStateToProps, { addGame, getGames })(withRouter(GameList));

 