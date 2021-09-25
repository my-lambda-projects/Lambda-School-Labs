import React, { Component } from 'react';
import Teacher from '../Teacher/Teacher';
import './ListTeachers.css';

class ListTeachers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teachers: props.teachers,
    };
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      teachers: [...props.teachers],
    });
  }

  render() {
    return (
      <div className="ListTeachers Table">
        <h3 className="table__title">Added Teachers</h3>
        <div className="Table__row Table__row--head" >
          <div className="Table__column">Name</div>
          <div className="Table__column">Email Address</div>
          <div className="Table__column Table__column--action" />
        </div>
        {
          this.state.teachers.map((teacher) => {
            return (
              <Teacher
                key={teacher._id}
                id={teacher._id}
                firstName={teacher.firstName}
                lastName={teacher.lastName}
                email={teacher.email}
              />
            );
          })
        }
      </div>
    )
  }
}

export default ListTeachers;
