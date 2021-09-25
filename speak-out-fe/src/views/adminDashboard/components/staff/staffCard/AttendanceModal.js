import 'react-dropdown/style.css';
import '../StaffTable.scss';

import { Button, DatePicker, Modal, Spin, Table } from 'antd';
import axiosWithAuth from '../../../../../utils/axiosWithAuth'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getDropDownCourses,
  postStudentAttendance,
} from '../../../../../actions';

import {
  CalenderLabel,
  DropdownLabel,
  LeftTopDiv,
  RightTopDiv,
  TopSection,
} from '../../mainStyle/styledComponent.js';

const AttendanceModal = props => {
  //set initial State
  const [state, setState] = useState({
    meeting: {
      teacher_id: props.staffID,
      course_id: props.courseID,
      meeting_date: moment().format('YYYY-MM-DD'),
      notes: 'testing',
      material_covered: 'testing',
    },
    students: [],
  });

  const [teacher, setTeacher] = useState(props.teacher);

  useEffect(() => {
    props.getDropDownCourses();
  }, []);
  //manage the state of the Students array
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    setState(state => (
      
      {
      ...state,
      meeting: {
        ...state.meeting,
        course_id: props.courseID,
      },
      students: [],
    }));
  }, [props.courseID]);

  useEffect(() => {
    //AXIOS call to get all necessary information and (by not being in a Redux action) gives the ability to manipulate student array more effectively.
    if (state.meeting.meeting_date && state.meeting.course_id) {
      axiosWithAuth()
        .get(
          `/attendance/date/${state.meeting.meeting_date}/course/${state.meeting.course_id}`
        )
        .then(res => {
          setAttendees(res.data.attendanceRecord);
          setTeacher(res.data.meeting.teacher);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [state.meeting.meeting_date, state.meeting.course_id]);

  //Array(datasource) for attendance dropdown menu
  const attendanceStatus = ['present', 'absent', 'late'];

  //Columns of Table to be rendered in Modal
  const attendanceColumns = [
    {
      title: 'Student ID',
      dataIndex: 'student_id',
      key: 1,
    },
    {
      title: 'Name',
      key: 2,
      render: (text, record) => (
        <span>
          <p>
            {record.student_name} {record.student_additional_names}
          </p>
        </span>
      ),
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 3,
      render: (text, row, index) => {
        return (
          <Dropdown
            className='modalDropdownTwo'
            value={attendees[index].attendance}
            onChange={e =>
              setAttendees(
                attendees.map((each, i) => {
                  if (i === index) {
                    return { ...each, attendance: e.value };
                  } else {
                    return each;
                  }
                })
              )
            }
            controlClassName='myControlClassNameModal'
            options={attendanceStatus}
          />
        );
      },
    },
  ];

  //Handles the "Submit" button.
  const handleOk = () => {
    //maps student array to proper format before sending
    const studentsArr = attendees.map(each => {
      return {
        student_id: each.student_id,
        attendance: each.attendance,
      };
    });
    props.postStudentAttendance({ ...state, students: studentsArr });
    //Closes modal
    props.setModalVisible({ loading: false, visible: false });
    //resets State to current date after submit
    setState({
      meeting: {
        teacher_id: props.staffID,
        course_id: props.courseID,
        meeting_date: moment().format('YYYY-MM-DD'),
        notes: 'testing',
        material_covered: 'testing',
      },
      students: [],
    });
  };

  //Handles the "Return" button (closes modal and resets state as seen below)
  const handleCancel = () => {
    props.setModalVisible({ visible: false });
  };

  const changeHandler = (date, dateString) => {
    setState({
      ...state,
      meeting: {
        ...state.meeting,
        meeting_date: dateString,
      },
    });
  };

  //dateFormat for moment()
  const dateFormat = 'YYYY-MM-DD';

  //actual Rendering on web page
  return (
    <>
      {props.isLoading ? (
        <Spin style={{ marginTop: '150px' }} size='large' />
      ) : (
        <>
          <Modal
            title={`Course ID: ${props.courseID}`}
            visible={props.modalVisible.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ padding: 0 }}
            footer={<div >
                <Button key='back' onClick={handleCancel}>
                  Return
                </Button>
                <Button key='submit' type='primary' onClick={handleOk}>
                  Submit
                </Button>
              </div>
            }
          >
            <TopSection>
              <LeftTopDiv>
                <CalenderLabel>Meeting Date</CalenderLabel>
                <DatePicker
                  size='default'
                  className='attendanceDate'
                  onChange={changeHandler}
                  defaultValue={moment()}
                  style={{ width: 120 }}
                  value={
                    state.meeting.meeting_date
                      ? moment(state.meeting.meeting_date)
                      : moment()
                  }
                  format={dateFormat}
                />
              </LeftTopDiv>
              <RightTopDiv>
                <DropdownLabel>Teacher</DropdownLabel>
                <Dropdown
                  value={teacher}
                  onChange={e => {
                    setState(state => ({
                      ...state,
                      meeting: {
                        ...state.meeting,
                        teacher_id: e.value,
                      },
                    }));
                    setTeacher(e.label);
                  }}
                  controlClassName='myControlClassName'
                  className='modalDropdown'
                  options={props.teacherDropdown}
                />
              </RightTopDiv>
            </TopSection>
            <Table className='attendanceStudents'
              dataSource={attendees}
              columns={attendanceColumns}
              pagination={false}
            />
          </Modal>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.staffCourseReducer.isLoading,
    teacherDropdown: state.coursesTableReducer.teacherTable,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    postStudentAttendance,
    getDropDownCourses,
  })(AttendanceModal)
);
