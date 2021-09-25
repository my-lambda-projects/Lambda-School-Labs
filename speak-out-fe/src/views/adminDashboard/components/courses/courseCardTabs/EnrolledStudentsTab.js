import 'antd/dist/antd.css';
import '../../mainStyle/mainCard.scss';

import { Spin, Table } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStudentTableByCourseID } from '../../../../../actions';

const EnrolledStudentsTab = props => {
  useEffect(() => {
    props.getStudentTableByCourseID(props.courseID);
  }, []);

  const courseColumns = [
    {
      title: 'Student ID',
      dataIndex: 'student_id',
      key: 1,
    },
    {
      title: 'CPR',
      dataIndex: 'cpr',
      key: 2,
    },
    {
      title: 'First Name',
      dataIndex: 'student_first_name',
      key: 3,
    },
    {
      title: 'Additional Names',
      dataIndex: 'student_additional_names',
      key: 4,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 4,
    },
    {
      title: 'First Day',
      dataIndex: 'first_day',
      key: 6,
    },
    {
      title: 'Last Day',
      dataIndex: 'last_day',
      key: 7,
    },
    {
      title: 'Student Result',
      dataIndex: 'student_result_type',
      key: 8,
    },
  ];

  const studentData = props.enrolledStudents
    .map(each => {
      let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }; //'long'
      let firstDay = new Date(each.first_day).toLocaleDateString(
        'en-GB',
        options
      );
      let lastDay = new Date(each.last_day).toLocaleDateString(
        'en-GB',
        options
      );
      each.first_day = firstDay;
      each.last_day = lastDay;
      return each;
    })
    .sort((a, b) => {
      return a.student_id - b.student_id;
    });

  return (
    <div>
      {props.isLoading ? (
        <Spin style={{ marginTop: '150px' }} size='large' />
      ) : (
        <Table
          className='rowHover'
          dataSource={studentData}
          columns={courseColumns}
          pagination={{ pageSize: 15 }}
          rowKey='id'
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.coursesTableReducer.isLoading,
    enrolledStudents: state.coursesTableReducer.studentsById,
    courseID: state.coursesTableReducer.courseById.course_id,
  };
};

export default withRouter(
  connect(mapStateToProps, { getStudentTableByCourseID })(EnrolledStudentsTab)
);
