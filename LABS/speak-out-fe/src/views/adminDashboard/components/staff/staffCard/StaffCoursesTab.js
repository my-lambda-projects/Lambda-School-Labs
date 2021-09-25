import '../../students/studentCard/studentTable.scss';

import { Button, Spin, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStaffCourses } from '../../../../../actions';
import { timeConverter } from '../../../../../utils/helpers.js';
import AttendanceModal from './AttendanceModal';

const StaffCoursesTab = props => {
  const { staffID, teacher } = props;
  useEffect(() => {
    props.getStaffCourses(staffID);
  }, []);

  const [modalVisible, setModalVisible] = useState({
    visible: false,
    loading: false,
  });

  const [courseID, setCourseID] = useState(0);

  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  const staffCourseColumns = [
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 1,
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 2,
    },
    {
      title: 'Group Type',
      dataIndex: 'group_type',
      key: 3,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 4,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 5,
    },
    {
      title: 'Course Type',
      dataIndex: 'course_type',
      key: 6,
    },
    {
      title: 'Course Schedule',
      dataIndex: 'course_schedule',
      key: 7,
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 8,
      render: (value, row, index) => {
        return <span>{timeConverter(value)}</span>;
      },
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 9,
      render: (value, row, index) => {
        return <span>{timeConverter(value)}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 10,
    },
    {
      title: 'Attendance',
      key: 11,
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              setCourseID(record.course_id);
              setStartDate(record.start_date);
              setEndDate(record.end_date);
              setModalVisible({ visible: true });
            }}
          >
            Take Attendance
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {props.isLoading ? (
        <Spin style={{ marginTop: '150px' }} size='large' />
      ) : (
        <>
          <Table
            dataSource={props.coursesByStaffId}
            className='coursesTable'
            columns={staffCourseColumns}
            pagination={false}
          />
          <AttendanceModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            staffID={staffID}
            teacher={teacher}
            courseID={courseID}
            startDate={startDate}
            endDate={endDate}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.staffCourseReducer.isLoading,
    coursesByStaffId: state.staffCourseReducer.coursesByStaffId,
  };
};

export default withRouter(
  connect(mapStateToProps, { getStaffCourses })(StaffCoursesTab)
);
