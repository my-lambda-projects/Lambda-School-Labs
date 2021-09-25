import 'antd/dist/antd.css';
import '../mainStyle/mainCard.scss';

import { Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getCourseTable,
  getDropDownCourses
} from '../../../../actions';
import { timeConverter } from '../../../../utils/helpers.js';
import CourseRegistrationForm from './CourseRegistrationForm';
import SearchCourseTable from './SearchCourseTable';

const CourseTable = props => {
  const { push } = useHistory()
  const [form, setForm] = useState(false);

  useEffect(() => {
    props.getCourseTable();
  }, []);

  useEffect(
    () => {
      if (props.isPosted) props.getCourseTable();
    },
    [props.isPosted]
  );

  const handleCancelButtonOnForm = () => {
    setForm(false);
  };

  const handleAddButton = () => {
    setForm(!form);
  };

  const tableColumns = [
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 1,
      fixed: 'left',
      width: 90
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 2,
      fixed: 'left',
      width: 90
    },
    {
      title: 'Group Type',
      dataIndex: 'group_type',
      key: 3,
      width: 150
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 4,
      width: 90
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 5,
      width: 90
    },
    {
      title: 'Course Type',
      dataIndex: 'course_type',
      key: 6,
      width: 90
    },
    {
      title: 'School Grade',
      dataIndex: 'school_grade',
      key: 7,
      width: 90
    },
    {
      title: 'Course Schedule',
      dataIndex: 'course_schedule',
      key: 8,
      width: 90
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 9,
      render: value => {
        return (
          <span>
            {timeConverter(value)}
          </span>
        );
      },
      width: 90
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 10,
      render: value => {
        return (
          <span>
            {timeConverter(value)}
          </span>
        );
      },
      width: 90
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 11,
      width: 90
    },
    {
      title: 'Students',
      dataIndex: 'total_students',
      key: 12,
      width: 90
    },
    {
      title: 'Confirmed',
      dataIndex: 'confirmed_students',
      key: 13,
      width: 95
    },
    {
      title: 'Unconfirmed',
      dataIndex: 'unconfirmed_students',
      key: 14,
      width: 95
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 15,
      fixed: 'right',
      width: 90
    }
  ];

  const courseData = props.courseList.sort((a, b) => {
    return b.id - a.id;
  });
  return (
    <div>
      <h2
        style={{ textAlign: 'left', marginLeft: '1.3rem' }}
      >
        Courses Table
      </h2>
      <div className="row-above">
        <div>
          <SearchCourseTable />
        </div>
        <div
          className="create-new-entry"
          style={{ cursor: 'pointer', color: '#26ABBD' }}
          onClick={handleAddButton}
        >
          <div style={{ marginRight: '10px' }}>
            Add Course
          </div>
          <div>
            <FontAwesomeIcon
              style={{ width: '18px', height: '21px' }}
              icon={faPlusCircle}
              size="lg"
            />
          </div>
        </div>
      </div>

      {form
        ? <CourseRegistrationForm
            handleCancelButtonOnForm={
              handleCancelButtonOnForm
            }
            setForm={setForm}
          />
        : null}

      {props.isLoading
        ? <Spin
            style={{ marginTop: '150px' }}
            size="large"
          />
        : <Table
            className="rowHover"
            dataSource={courseData}
            columns={tableColumns}
            pagination={false}
            rowKey="course_id"
            scroll={{ x: 400 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  push(`/dashboard/courses/${record.course_id}`)
                }
              };
            }}
          />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.coursesTableReducer.isLoading,
    isPosted: state.coursesTableReducer.isPosted,
    courseList: state.coursesTableReducer.courseList,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getCourseTable,
    getDropDownCourses
  })(CourseTable)
);
