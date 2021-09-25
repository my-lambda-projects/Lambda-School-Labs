import React, { Component } from 'react';
import SchoolInd from './SchoolInd';

class ListSchools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: props.schools,
    };
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      schools: [...props.schools],
    });
  }

  render() {
    return (
      <div className="ListTeachers Table">
        <h3 className="table__title">Created Schools</h3>
        <div className="Table__row Table__row--head" >
          <div className="Table__column">Name</div>
          <div className="Table__column">Admin Email</div>
          <div className="Table__column">plan</div>
          <div className="Table__column Table__column--action" />
        </div>
        {
          this.state.schools.map((school) => {
            return (
              <SchoolInd
                key={school._id}
                id={school._id}
                name={school.name}
                admin={school.admin}
                plan={school.plan}
              />
            );
          })
        }
      </div>
    );
  }

}

export default ListSchools;
