import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';



class StartRace extends Component {
  render() {
    let url = window.location.host;
    let adminUrl = this.props.startRace ? `/admindelivery/${this.props.race.slug}` : null;
    return (
      <div>
        {!this.props.startRace ? null :
        <div>
          <h4>Students can join race here: <a href={`${url}/joinrace/${this.props.race.slug}`}>{url}/joinrace/{this.props.race.slug}</a> </h4>
          <Button variant="outlined" href={adminUrl} className={this.props.classes.button}>
            Continue To Race
          </Button>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startRace: state.CreateRace.startRace,
    race: state.CreateRace.race
  }
}

export default connect(mapStateToProps, {})(StartRace)