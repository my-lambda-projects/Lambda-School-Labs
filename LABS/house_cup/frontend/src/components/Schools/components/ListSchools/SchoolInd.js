import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { deleteSchool } from '../../../../actions';

class SchoolInd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      adminEmail: props.admin.email,
      plan: props.plan,
    };
  }

  deleteSchool = async (id) => {
    await this.props.deleteSchool(id, this.props.history);
  }

  render() {
    return (
      <div className="Table__row Teacher" >
        <div className="Table__column">
          {this.state.name}
        </div>
        <div className="Table__column">
          {this.state.adminEmail}
        </div>
        <div className="Table__column">
          Premium
        </div>
        <div className="Table__column Table__column--action Table__column--action-delete">
          <Glyphicon
            glyph="trash"
            onClick={() => this.deleteSchool(this.state.id)}
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

export default withRouter(connect(mapStateToProps, { deleteSchool })(SchoolInd));

