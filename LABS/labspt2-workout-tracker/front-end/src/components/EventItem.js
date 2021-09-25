import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";


import Checkbox from './Checkbox.jsx'


import './styles/ScheduleView.sass'

class EventItem extends Component {



  render() {

    
    return (
        
        <div className='event-full'>
        {/* <h1 className='cat'>{this.props.item["category"]}</h1> */}
        <div className='event-check'>
        <Checkbox name={this.props.item.exerciseName} Update={this.props.Update} item={this.props.item} value={false} />

        <p className="indented-item">Weight: {this.props.item.weight}</p>

        <p className="indented-item">Reps: {this.props.item.reps}</p>
        <p className="indented-item">Sets: {this.props.item.sets}</p>

       
        </div>
        </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   };
// };

// export default connect(mapStateToProps)(ScheduleView);

export default EventItem;