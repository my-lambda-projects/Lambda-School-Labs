import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getStudentById,
  toggleEditComponent,
  toggleDeleteModel,
  deleteStudentById,
} from '../../../../../actions';
import { withRouter, useHistory } from 'react-router-dom';
import StudentForm from './StudentForm';
import {
  FormWrap,
  Div,
  SaveButton,
  DeleteButton,
  FormSet,
  ButtonDiv,
} from '../../mainStyle/styledComponent';
import Modal from '../../modals/DeleteModal';
import { getDateStringENGBFormat, booleanToYesNo } from '../../../../../utils/helpers';
import StudentInformationTabCategory from './StudentInformationTabCategory';

const StudentInformationTab = props => {
  const { push } = useHistory();
  const studentInfo = props.getStudentById;
  const student = props.studentById;

  useEffect(() => {
    studentInfo();
  }, [studentInfo]);

  const editStudentInfo = e => {
    e.preventDefault();
    props.toggleEditComponent('true');
  };

  const areYouSureYouWantToDelete = e => {
    e.preventDefault();
    props.toggleDeleteModel(true);
  };

  const deleteStudentInfo = async () => {
    await props.deleteStudentById(props.studentById.student_id);
    push('/dashboard/students');
  };

  if (props.isEditing) {
    return <StudentForm {...props} />;
  }

  return (
    <div>
      {student ? (
        <>
          <FormWrap>
            <FormSet>
              <Div>
                <StudentInformationTabCategory category="cpr" value={student.cpr} colspan="1" />
                <StudentInformationTabCategory
                  category="first_name"
                  value={student.first_name}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="additional_names"
                  value={student.additional_names}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="gender"
                  value={student.gender}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="phone_number"
                  value={student.phone_number}
                  colspan="1"
                />
                <StudentInformationTabCategory category="email" value={student.email} colspan="1" />
                <StudentInformationTabCategory
                  category="birthdate"
                  value={getDateStringENGBFormat(student.birthdate)}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="school_name"
                  value={student.school_name}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="school_grade"
                  value={student.school_grade}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="address"
                  value={student.address}
                  colspan="2"
                />
                <StudentInformationTabCategory
                  category="primary_emergency_contact_name"
                  value={student.primary_emergency_contact_name}
                  colspan="2"
                />
                <StudentInformationTabCategory
                  category="primary_emergency_relationship"
                  value={student.primary_emergency_relationship}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="primary_emergency_phone"
                  value={student.primary_emergency_phone}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="emergency_contact_name"
                  value={student.emergency_contact_name}
                  colspan="2"
                />
                <StudentInformationTabCategory
                  category="emergency_relationship"
                  value={student.emergency_relationship}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="emergency_phone"
                  value={student.emergency_phone}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="grade_updated"
                  value={getDateStringENGBFormat(student.grade_updated)}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="no_call"
                  value={booleanToYesNo(student.no_call)}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="delinquent"
                  value={booleanToYesNo(student.delinquent)}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="expelled"
                  value={booleanToYesNo(student.expelled)}
                  colspan="1"
                />
                <StudentInformationTabCategory
                  category="registration_date"
                  value={getDateStringENGBFormat(student.registration_date)}
                  colspan="1"
                />
                <StudentInformationTabCategory category="notes" value={student.notes} colspan="4" />
              </Div>
            </FormSet>
            <ButtonDiv>
              <SaveButton type="submit" onClick={editStudentInfo}>
                Edit
              </SaveButton>
              <DeleteButton type="submit" onClick={areYouSureYouWantToDelete}>
                Delete
              </DeleteButton>
            </ButtonDiv>
          </FormWrap>
          <Modal submitActionCB={deleteStudentInfo} />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.studentByIdReducer.isLoading,
    studentById: state.studentByIdReducer.studentById,
    isEditing: state.studentByIdReducer.isEditing,
    isTestEditing: state.placementTestReducer.isTestEditing,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getStudentById,
    toggleEditComponent,
    toggleDeleteModel,
    deleteStudentById,
  })(StudentInformationTab)
);
