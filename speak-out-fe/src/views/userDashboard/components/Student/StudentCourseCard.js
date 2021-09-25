import React, { useEffect, useState } from 'react';
import { getStudentCourses } from '../../getStudentCourses';
import { getDateStringENGBFormat, timeConverter } from '../../../../utils/helpers';
import './StudentCourseCard.scss';

// Sets Course state for students
function StudentCourseCard({ student }) {
  const [studentCourse, setStudentCourse] = useState([]);
  const [courseBool, setCourseBool] = useState(false);

  useEffect(() => {
    if (!courseBool) {
      getStudentCourses(student.id)
        .then(res => {
          setStudentCourse(res);
          setCourseBool(true);
        })
        .catch(err => console.log(err));
    }
  }, [studentCourse]);

  return (
    <div className="container">
      <div className="student">
        <h2>
          <span>{student.first_name}</span>
          {student.additional_names}
        </h2>
      </div>
      <div className="container">
        <div>
          <p>{studentCourse.length} course(s)</p>
        </div>
        {!studentCourse || studentCourse.length === 0 ? (
          <p>{student.first_name} has not registered for any courses yet.</p>
        ) : (
          <div>
            {studentCourse.map(course => (
              <div key={course.course_id} className="course-content">
                <p>{course.group_type}</p>
                <p>{course.course_days}</p>
                <p>
                  {timeConverter(course.start_time)} to {timeConverter(course.end_time)}
                </p>
                <p>
                  <span>Starts</span>
                  {getDateStringENGBFormat(course.first_day)}
                </p>
                <p>
                  <span>Ends</span>
                  {getDateStringENGBFormat(course.last_day)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCourseCard;
