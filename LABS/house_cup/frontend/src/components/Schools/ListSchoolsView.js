import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllSchools } from '../../actions';
import ListSchools from './components/ListSchools/ListSchools';

class ListSchoolsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
    };
  }

  async componentWillMount() {
    await this.props.getAllSchools(this.props.history);
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      schools: [...props.schools],
    });
  }
  render() {
    return (
      <div className="ListTeachersView">
        <ListSchools schools={this.state.schools} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
  };
};

export default withRouter(connect(mapStateToProps, { getAllSchools })(ListSchoolsView));
