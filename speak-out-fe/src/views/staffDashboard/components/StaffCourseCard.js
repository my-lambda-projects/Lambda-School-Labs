import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { timeConverter, dateConverter } from '../../../utils/helpers';
import { Button } from 'antd';
import AttendanceModal from '../../adminDashboard/components/staff/staffCard/AttendanceModal';

import './staffDashboard.scss';

const StaffCourseCard = () => {
  let { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    loading: false,
  });

  // Grab Staff's Courses
  useEffect(() => {
    axiosWithAuth()
      .get(`/course/${courseId}`)
      .then(res => {
        setCourseData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="courses">
      <div className="staff-courses">
        <h2 className="teacher">{courseData.teacher}</h2>
        <h4 className="courseItem">Course ID: {courseData.course_id}</h4>
        <h4 className="courseItem">
          {courseData.group_type} -- {courseData.level}
        </h4>
        <h4 className="courseItem">
          {courseData.term} -- {courseData.course_schedule}{' '}
        </h4>
        <h5 className="courseItem">
          {timeConverter(courseData.start_time)} - {timeConverter(courseData.end_time)}
        </h5>
        <h4 className="courseItem"> Course Type: {courseData.course_type}</h4>
        <h4 className="courseItem"> Hourly Rate: {courseData.hourly_rate}</h4>
        <h4 className="courseItem"> Room: {courseData.room}</h4>
        <h4 className="courseItem"> Notes: {courseData.notes}</h4>
      </div>
      <Button
        onClick={() => {
          setModalVisible({ visible: true });
        }}
      >
        Take Attendance
      </Button>
      <AttendanceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        staffID={courseData.teacher_id}
        teacher={courseData.teacher}
        courseID={courseData.course_id}
        startDate={dateConverter(courseData.start_date)}
        endDate={dateConverter(courseData.end_date)}
      />
    </div>
  );
};

export default StaffCourseCard;
