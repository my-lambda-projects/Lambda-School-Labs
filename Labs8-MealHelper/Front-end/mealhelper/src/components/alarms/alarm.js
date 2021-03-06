import React, { Component } from "react";
import { fetchSingleAlarm } from "../../store/actions/alarmActions";


class Alarm extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    console.log("this.props", this.props);
    let userID = this.props.user.id;
    let alarmID = this.props.alarm.id;
    console.log("this.props.user.id", this.props.user.id)
    this.props.fetchSingleAlarm(userID);
    console.log("this.props.alarms", this.props.alarms)
  }

  componentDidUpdate(prevProps) {
    console.log("in componentDidUpdate");
    let userID = this.props.user.id;
    if(JSON.stringify(this.props.alarms) !== JSON.stringify(prevProps.alarms)) {
        this.props.fetchAlarms(userID);
        console.log("this.props.alarms", this.props.alarms)
    }
 }

  render() {
    return (
      <div className="alarm-container">
        <h2>{alarm}</h2>
        <h2>{label}</h2>
      </div>
    )
  }
}

export default Alarm;

const mapStateToProps = state => ({
  alarms: state.alarmsReducer.alarms,
  user: state.userReducer.user
})

export default connect(
  mapStateToProps,
  { fetchSingleAlarm }
)(withRouter(MyAlarms));
