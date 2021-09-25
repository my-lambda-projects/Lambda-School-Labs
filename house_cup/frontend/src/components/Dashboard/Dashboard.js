import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';
import './Dashboard.css';
import AccountOverview from '../AccountOverview/AccountOverview';
import Scoreboard from '../Scoreboard/Scoreboard';
import Settings from '../Auth/Settings';
import Sidebar from '../Sidebar/Sidebar';
import Schools from '../Schools/Schools';
import CreateTeacherView from '../Teachers/CreateTeacherView';
import ListTeachersView from '../Teachers/ListTeachersView';
import CreateHouseView from '../Houses/CreateHouseView';
import ListHousesView from '../Houses/ListHousesView';
import ListSchoolsView from '../Schools/ListSchoolsView';

class Dashboard extends Component {

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
  }
  render() {
    return (
      <div className="Dashboard">
        <Sidebar>
          <Switch>
            <Route exact path="/dashboard" component={AccountOverview} />
            <Route exact path="/schools" component={Schools} />
            <Route exact path="/schools/list" component={ListSchoolsView} />
            <Route exact path="/houses/create" component={CreateHouseView} />
            <Route exact path="/houses" component={ListHousesView} />
            <Route exact path="/teachers/create" component={CreateTeacherView} />
            <Route exact path="/teachers" component={ListTeachersView} />
            <Route exact path="/scoreboard" component={Scoreboard} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </Sidebar>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
};
// export default withRouter(Dashboard);
export default withRouter(connect(mapStateToProps, { getUserRoles })(Dashboard));
