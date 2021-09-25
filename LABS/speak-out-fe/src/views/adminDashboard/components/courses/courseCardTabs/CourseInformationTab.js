import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCourseById,
  toggleEditCourse,
  toggleDeleteModel,
  deleteCourseById
} from '../../../../../actions';
import CourseEditForm from './CourseEditForm';
import {
  FormWrap,
  Div,
  TextDiv,
  Label,
  FormSet,
  SaveButton,
  DeleteButton,
  ButtonDiv
} from '../../mainStyle/styledComponent';
import { timeConverter, dateConverter } from '../../../../../utils/helpers.js';
import Modal from '../../modals/DeleteModal';

const CourseInformationTab = props => {
  const { push } = useHistory()
  const courseInfo = props.getCourseById
  useEffect(() => {
    courseInfo()
  }, [courseInfo]);

  const editCourseInfo = e => {
    e.preventDefault();
    props.toggleEditCourse('true');
  };

  const startDate = dateConverter(props.courseById.start_date);
  const endDate = dateConverter(props.courseById.end_date);
  const startTime = timeConverter(props.courseById.start_time);
  const endTime = timeConverter(props.courseById.end_time);

  const areYouSureYouWantToDelete = e => {
    e.preventDefault();
    props.toggleDeleteModel(true);
  };

  const deleteCourseInfo = async () => {
    await props.deleteCourseById(props.courseById.course_id);
      push('/dashboard/courses')
  };

  return (
    <div>
      {courseInfo ? (
        !props.isEditing ? (
          <>
            <FormWrap>
              <FormSet>
                <Div>
                  <div>
                    <Label>Status</Label>

                    <TextDiv>
                      {(props.courseById && props.courseById.status) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Term</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.term) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Course Type</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.course_type) ||
                        '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Group Type</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.group_type) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.level) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Section</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.section) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>School Grade</Label>
                    <TextDiv>{props.courseById.school_grade || '-'}</TextDiv>
                  </div>
                  <div>
                    <Label>Course Schedule</Label>
                    <TextDiv>{props.courseById.course_schedule || '-'}</TextDiv>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <TextDiv>{startDate || '-'}</TextDiv>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <TextDiv>{endDate || '-'}</TextDiv>
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <TextDiv>{startTime || '-'}</TextDiv>
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <TextDiv>{endTime || '-'}</TextDiv>
                  </div>
                  <div>
                    <Label>Room</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.room) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Teacher</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.teacher) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Hourly Rate</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.hourly_rate) ||
                        '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.status) || '-'}
                    </TextDiv>
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <TextDiv>
                      {(props.courseById && props.courseById.notes) || '-'}
                    </TextDiv>
                  </div>
                </Div>
                <Div>
                  <div style={{ gridColumn: 'span3' }}></div>
                </Div>
              </FormSet>
              <ButtonDiv>
                <SaveButton type='submit' onClick={editCourseInfo}>
                  Edit
                </SaveButton>
                <DeleteButton type='submit' onClick={areYouSureYouWantToDelete}>
                  Delete
                </DeleteButton>
              </ButtonDiv>
            </FormWrap>
            <Modal submitActionCB={deleteCourseInfo} />
          </>
        ) : (
          <CourseEditForm {...props} />
        )
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    courseById: state.coursesTableReducer.courseById,
    isEditing: state.coursesTableReducer.isEditing
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getCourseById,
    toggleEditCourse,
    toggleDeleteModel,
    deleteCourseById
  })(CourseInformationTab)
);
