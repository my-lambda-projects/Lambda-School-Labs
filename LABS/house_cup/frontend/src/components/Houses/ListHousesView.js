import React, { Component } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles, getHousesBySchool } from '../../actions';
import ListHouses from './components/ListHouses/ListHouses';
import './ListHousesView.css';

class ListHousesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      houses: [],
      getHousesResolved: false,
    };
  }

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
    await this.props.getHousesBySchool(this.props.history);
  }

  async componentWillReceiveProps(props) {
    const { isSuperAdmin, isSchoolAdmin, isTeacher } = props.auth;
    if (isSchoolAdmin === false) {
      if (isTeacher) {
        this.props.history.push('/scoreboard');
      } else if (isSuperAdmin) {
        this.props.history.push('/schools/list');
      }
    }
    await this.setState({
      auth: { ...props.auth },
      houses: [...props.houses],
      getHousesResolved: props.houses !== undefined,
    });
  }
  render() {
    return (
      <div className="ListHousesView">
        {
          (this.state.getHousesResolved) ?
            (
              (this.state.houses.length > 0) ?
                <ListHouses houses={this.state.houses} /> :
                <Redirect to={{
                    pathname: '/houses/create',
                    state: {
                      message: 'You don\'t have any houses yet, create one below.',
                    },
                  }} 
                /> 
            ): null
        }
        <Link to="/houses/create">
          <button>Add New House</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles, getHousesBySchool })(ListHousesView));
