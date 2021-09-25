import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { deleteTeacher } from '../../../../actions';
import './Teacher.css';

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
    };
  }

  deleteTeacher = async (id) => {
    await this.props.deleteTeacher(id, this.props.history);
  }

  render() {
    return (
      <div className="Table__row Teacher" >
        <div className="Table__column">
          {this.state.firstName} {this.state.lastName}
        </div>
        <div className="Table__column">
          {this.state.email}
        </div>
        <div className="Table__column Table__column--action Table__column--action-delete">
          <Glyphicon
            glyph="trash"
            onClick={() => this.deleteTeacher(this.state.id)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, { deleteTeacher})(Teacher));

