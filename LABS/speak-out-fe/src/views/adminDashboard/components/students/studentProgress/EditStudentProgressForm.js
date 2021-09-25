import React, { useState } from 'react'
import { connect } from 'react-redux';
import { toggleEditProgressComponent, editStudentProgress, getStudentProgress } from '../../../../../actions';
import { Spin } from 'antd';
import '../../mainStyle/mainTable.scss';
import { FormWrap, FormSet, Label, Div, SaveButton, ButtonDiv, CancelButton, Input } from '../../mainStyle/styledComponent';
import StudentProgressTab from './StudentProgressTab';
import { useForm } from 'react-hook-form';

const EditStudentProgressForm = props => {
    
    // set date to today's date if no date from props
    let reportDate = Date.now();

    if (props.progressByStudentId.report_date)
        { reportDate = new Date(props.progressByStudentId.report_date).toISOString().split("T")[0]; }

    const [cancelEdit, setCancelEdit] = useState(false)

	const { register, errors, handleSubmit } = useForm();

    const formSubmit = data => {
        
        props.editStudentProgress(props.studentID, data)

        if (props.isEdited) {
            setTimeout(() => {
                props.setEdit(false)
            }, 1000);
        }
    }

    if (cancelEdit) {
        return (
            <StudentProgressTab  {...props} setCancelEdit={setCancelEdit} cancelEdit={cancelEdit}/>
        )
    } else {
    
    return (
                <FormWrap onSubmit={handleSubmit(formSubmit)}>
                {props.isLoading ? (
                <Spin style={{ marginTop: '150px' }} size="large" />
            ) : (
                <>
                    <FormSet>
                <Div>
                    <div>
                        <Label>Speaking Fluency</Label>
                        <div>
							 <Input type="number" className={errors.speaking_fluency && "input-error"} name="speaking_fluency" defaultValue={props.progressByStudentId.speaking_fluency} ref={register({required: true})} />
							    {errors.speaking_fluency && 'Speaking Fluency Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Speaking Accuracy</Label>
                        <div>
							 <Input type="number" className={errors.speaking_accuracy && "input-error"} name="speaking_accuracy" defaultValue={props.progressByStudentId.speaking_accuracy} ref={register({required: true})} />
							    {errors.speaking_accuracy && 'Speaking Accuracy Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Vocabulary</Label>
                        <div>
							 <Input type="number" className={errors.vocabulary && "input-error"} name="vocabulary" defaultValue={props.progressByStudentId.vocabulary} ref={register({required: true})} />
							    {errors.vocabulary && 'Vocabulary Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Pronunciation</Label>
                        <div>
							 <Input type="number" className={errors.pronunciation && "input-error"} name="pronunciation" defaultValue={props.progressByStudentId.pronunciation} ref={register({required: true})} />
							    {errors.pronunciation && 'Pronunciation Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Grammar</Label>
                        <div>
							 <Input type="number" className={errors.grammar && "input-error"} name="grammar"defaultValue={props.progressByStudentId.grammar} ref={register({required: true})} />
							    {errors.grammar && 'Grammar Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Listening</Label>
                        <div>
							 <Input type="number" className={errors.listening && "input-error"} name="listening" defaultValue={props.progressByStudentId.listening} ref={register({required: true})} />
							    {errors.listening && 'Listening Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Writing</Label>
                        <div>
							 <Input type="number" className={errors.writing && "input-error"} name="writing" defaultValue={props.progressByStudentId.writing} ref={register({required: true})} />
							    {errors.writing && 'Writing Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Reading</Label>
                        <div>
							 <Input type="number" className={errors.reading && "input-error"} name="reading" defaultValue={props.progressByStudentId.reading} ref={register({required: true})} />
							    {errors.reading && 'Reading Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Interest</Label>
                        <div>
							 <Input type="number" className={errors.interest && "input-error"} name="interest" defaultValue={props.progressByStudentId.interest} ref={register({required: true})} />
							    {errors.interest && 'Interest Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Participation</Label>
                        <div>
							 <Input type="number" className={errors.participation && "input-error"} name="participation" defaultValue={props.progressByStudentId.participation} ref={register({required: true})} />
							    {errors.participation && 'Participation Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Submitting Homework</Label>
                        <div>
							 <Input type="number" className={errors.submitting_homework && "input-error"} name="submitting_homework" defaultValue={props.progressByStudentId.submitting_homework} ref={register({required: true})} />
							    {errors.submitting_homework && 'Submitting Homework Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Homework Effort</Label>
                        <div>
							 <Input type="number" className={errors.homework_effort && "input-error"} name="homework_effort" defaultValue={props.progressByStudentId.homework_effort} ref={register({required: true})} />
							    {errors.homework_effort && 'Homework Effort Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Notes</Label>
                        <div>
							 <Input type="text" className={errors.notes && "input-error"} name="notes" defaultValue={props.progressByStudentId.notes} ref={register({required: true})} />
							    
                        </div>				
                    </div>
                    <div>
                        <Label>Overall</Label>
                        <div>
							 <Input type="number" className={errors.overall && "input-error"} name="overall" defaultValue={props.progressByStudentId.overall} ref={register({required: true})} />
							    {errors.overall && 'Overall Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Course ID</Label>
                        <div>
							 <Input type="number" className={errors.course_id && "input-error"} name="course_id" defaultValue={props.progressByStudentId.course_id} ref={register({required: true})} />
							    {errors.course_id && 'Course ID is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Student ID</Label>
                        <div>
							 <Input type="number" className={errors.student_id && "input-error"} name="student_id" defaultValue={props.student_id} ref={register({required: true})} />
							    {errors.student_id && 'Student ID is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Teacher ID</Label>
                        <div>
							 <Input type="number" className={errors.teacher_id && "input-error"} name="teacher_id" defaultValue={props.progressByStudentId.teacher_id} ref={register({required: true})} />
							    {errors.teacher_id && 'Teacher ID is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Report Date</Label>
                        <div>
							 <Input type="date" className={errors.report_date && "input-error"} name="report_date" defaultValue={reportDate} ref={register({required: true})} />
							    {errors.report_date && 'Report Date is Required'}
                        </div>				
                    </div>
                    </Div>
            </FormSet>
                    <ButtonDiv>
                        <CancelButton onClick={() => { setCancelEdit(true)}}>
                            Cancel
                        </CancelButton>
                        <SaveButton onClick={handleSubmit} style={{width: '120px'}}>
                            Save Report
                        </SaveButton>
                    </ButtonDiv>
                    </>
                    )}
                </FormWrap>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.studentProgressReducer.isLoading,
        progressByStudentId: state.studentProgressReducer.progressByStudentId,
        isEditing: state.studentProgressReducer.isEditing,
        isEdited: state.studentProgressReducer.isEdited,
        error: state.studentProgressReducer.error
    };
};
export default connect( mapStateToProps, { editStudentProgress, toggleEditProgressComponent, getStudentProgress } )(EditStudentProgressForm)