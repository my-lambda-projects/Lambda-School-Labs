import React, {Component} from 'react';
import BrowseElement from '../component/'
import  {connect} from 'react-redux';
import {getRandomUser} from '../store/action'
class BrowseContainer extends Component {

    getRandomUserS =( ) =>{
        this.props.getRandomUser("seeker");
    };
     getRandomUserE =( ) =>{
        this.props.getRandomUser("employer");
    };

    render(){
       return <BrowseElement data={this.props.data} onClick={[this.getRandomUserE, this.getRandomUserS]}/> ;
    }
}
const MapStateToProps = state => ({
    data: state.randomUser.data,
    FETCHING_GET_PROFILE: state.randomUser.FETCHING_GET_PROFILE
})
export  default  connect(MapStateToProps, {getRandomUser})(BrowseContainer);