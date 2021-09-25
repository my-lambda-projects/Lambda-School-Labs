import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDropDownCourses, addCourse, editEnrollStudent, unenrollEnrollStudent, toggleDeleteModel } from '../../../../../actions';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';

import {
    FormWrap,
    Input,
    Button,
    Label,
    FormSet,
    Div2,
    ButtonDiv,
    DisabledInput,
  } from '../../mainStyle/styledComponent.js';

  import Modal from '../../modals/DeleteModal';

const EditEnrollStudentForm = props => {

    const [state, setState] = useState({
        result_type_code : props.info.result_type_code,
        notes : `${props.info.notes}`
    });

const statusArr = [
  {value: -3, label: 'unconfirmed'},
  {value: -2, label: 'no show'},
  {value: -1, label: 'cancelled enrollment'},
  {value: 0, label: 'drop'},
  {value: 1, label: 'transfer out'},
  {value: 2, label: 'fail'},
  {value: 3, label: 'incomplete'},
  {value: 4, label: 'no exam'},
  {value: 5, label: 'pass'},
  {value: 6, label: 'confirm'},
];

  function handleChange2(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  const areYouSureYouWantToDelete = e => {
    e.preventDefault();
    props.toggleDeleteModel(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.setEditForm(false);
    props.editEnrollStudent( props.info.student_id, props.info.course_id, state)
  }

  const handleCancel = event => {
    event.preventDefault();
    props.setEditForm(false);
  };

  const deleteStudentInfo = async () => {
    await props.unenrollEnrollStudent( props.info.student_id, props.info.course_id)
    props.setEditForm(false);
  };

  return (
    <>
    <FormWrap onSubmit={handleSubmit}>
      <FormSet>
        <Div2>
           <div>
             <Label>Result</Label>
              <Dropdown
                  controlClassName='myControlClassName'
                  className='dropdown'
                  name='result_type_code'
                  onChange={(e) => setState({ ...state, result_type_code: e.value })}
                  value={statusArr[state.result_type_code + 3]}
                  options={statusArr}
              />
              </div>
           <div style={{ gridColumn: 'span 4' }}>
                    <Label>Notes</Label>
                    <div>
                        <textarea
                        style={{
                        width: '100%', height: '80px', outline: 'none',
                        border: '1px solid transparent', borderRadius: '3px'
                        }}
                        type='text'
                        name='notes'
                        placeholder='Notes'
                        onChange={handleChange2}
                        value={state.notes}
                        />
                        </div>
                    </div>
        </Div2>
      </FormSet>
      <ButtonDiv>
        <Button
          onClick={handleCancel}
          style={{ background: '#C73642', width: '80px' }}
        >
          Cancel
        </Button>
        <Button type='submit'>
          Edit Enrollment 
        </Button>
        <Button
          onClick={areYouSureYouWantToDelete}
          style={{ background: '#C73642', width: '80px' }}
        >
          Unenroll
        </Button>
      </ButtonDiv>
      <Modal submitActionCB={deleteStudentInfo} />
    </FormWrap>
    </>
    ); 
};

const mapStateToProps = state => {
    return {
      termDropdown: state.coursesTableReducer.termTable,
      courseTypeDropdown: state.coursesTableReducer.courseTypeTable,
      groupTypeDropdown: state.coursesTableReducer.groupTypeTable,
      schoolGradeDropdown: state.coursesTableReducer.schoolGradeTable,
      levelDropdown: state.coursesTableReducer.levelTable,
      courseScheduleDropdown: state.coursesTableReducer.courseScheduleTable,
      roomDropdown: state.coursesTableReducer.roomTable,
      teacherDropdown: state.coursesTableReducer.teacherTable,
      isPosting: state.coursesTableReducer.isPosting,
      studentById: state.studentByIdReducer.studentById,
    };
  };

export default withRouter(
    connect(mapStateToProps, {toggleDeleteModel, editEnrollStudent, getDropDownCourses, addCourse, unenrollEnrollStudent})(
      EditEnrollStudentForm
    )
  );
  