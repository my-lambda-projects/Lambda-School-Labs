import React, { Component } from 'react';
import {connect} from 'react-redux'
import { gettingRace } from '../../Actions/adminDeliveryPage'
import QuestionCard from './AdminDeliveryPage';
import './AdminDeliveryPage.css';

class AdminDelivery extends Component {
    componentDidMount() {
        this.props.gettingRace(this.props.match.params.slug)
    }
    render() {
        return (
            <div>
                Admin Delivery Page
                <div className="main">
                    <QuestionCard  slug={this.props.match.params.slug}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {gettingRace})(AdminDelivery);
