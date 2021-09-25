import React, { Component } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles, getTeachers } from '../../actions';
import ListTeachers from './components/ListTeachers/ListTeachers';
import './ListTeachersView.css';

class ListTeachersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      getTeachersResolved: false,
    };
  }

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
    await this.props.getTeachers(this.props.history);
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
      teachers: [...props.teachers],
      getTeachersResolved: props.teachers !== undefined,
    });
  }

  render() {
    return (
      <div className="ListTeachersView">
        {
          (this.state.getTeachersResolved) ?
            (
              (this.state.teachers !== null && this.state.teachers.length > 0) ?
              <ListTeachers teachers={this.state.teachers} /> :
              <Redirect to={{
                  pathname: '/teachers/create',
                  state: {
                    message: 'You haven\'t added any teachers yet, add one below.',
                  },
                }}
              />
            ) : null
        }
        <Link to="/teachers/create">
          <button>Add New Teacher</button>
        </Link>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles, getTeachers })(ListTeachersView));
