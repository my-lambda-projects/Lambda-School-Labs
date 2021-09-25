import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';
import CreateSchool from './components/CreateSchool';

class Schools extends Component {

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
  }

  render() {
    return (
      <div>
        <CreateSchool />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles })(Schools));
