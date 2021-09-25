import React, { Component } from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import {connect} from 'react-redux';

class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let total = this.props.classStudents.length
    let hired = 0;
    this.props.classStudents.forEach(each => {
      if (each.hired === true) {
        hired++
      }
    })
    return (
      <div>
        <Container>
          <div class="ui column divided grid">
            <div class="row">
              <div class="three wide column">
                <Header as="h2" icon>
                  <Icon name="ui users circular image" color="purple" />
                  {this.props.classNameSelected}
                </Header>
              </div>
              <div class="nine wide column">
                <p />
                <b>ACTIVITY FEED</b>
                <Segment color="purple">
                  <p>Jane Bernard has applied to three gigs.</p>
                  <p>Tim Kelly has two second round interviews.</p>
                  <p>Steve Bonano made 17 new connections.</p>
                </Segment>
              </div>
              <div class="four wide column">
                <div class="ui horizontal statistics">
                  <div class="statistic color purple">
                    <div class="value">{hired}/{total}</div>
                    <div class="label">Have Landed Gigs!</div>
                  </div>
                  <div>
                    <div class="ui horizontal divider">
                      <i class="orange fire icon" /> HOT RIGHT NOW!
                    </div>
                    <i class="github icon" />
                    {this.props.first} &nbsp;| &nbsp;
                    <b>h</b> {this.props.second}
                  </div>
                  <p />
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <p />
                </div>
                <div class="column">
                  <p />
                </div>
                <div class="column">
                  <p />
                </div>
              </div>
            </div>
            <div />
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    classNameSelected: state.classNameSelected,
    classStudents: state.classStudents,
    first: state.first,
    second: state.second,
    huntr: state.githubData.huntr
  }
}

export default connect(mapStateToProps, {})(ActivityFeed);
