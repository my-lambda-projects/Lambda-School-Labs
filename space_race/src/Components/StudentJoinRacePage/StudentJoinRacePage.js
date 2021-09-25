import React, { Component } from 'react';
import SignInButton from '../Navigation/SignInButton';
import StudentJoinCard from './StudentJoinCard';
import { connect } from 'react-redux';
import { gettingRace } from '../../Actions/adminDeliveryPage'

class StudentJoinRacePage extends Component {
    componentDidMount() {
        this.props.gettingRace(this.props.match.params.slug)
    }
    render() {
        return(
            <div>
            <SignInButton/>
            <StudentJoinCard race={this.props.race} gotRace={this.props.gotRace} slug={this.props.match.params.slug} history={this.props.history}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        race: state.AdminDelivery.race,
        gotRace: state.AdminDelivery.gotRace,
        index: state.AdminDelivery.index
    }
}
export default connect(mapStateToProps, {gettingRace}) (StudentJoinRacePage);
