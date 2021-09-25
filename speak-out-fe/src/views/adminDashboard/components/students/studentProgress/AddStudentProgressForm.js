import React, { useState } from 'react'
import { connect } from 'react-redux';
import { postStudentProgress, togglePostComponent } from '../../../../../actions';
import 'react-dropdown/style.css';
import '../../mainStyle/mainTable.scss';
import { FormWrap, Input, SaveButton, Label, FormSet, Div, ButtonDiv } from '../../mainStyle/styledComponent';
import { useForm } from 'react-hook-form';

const StudentProgressForm = props => {

	const { register, errors, handleSubmit } = useForm();

    const formSubmit = data => {

        let average = 0;
        let length = 0;

        // change all form inputs to a number (int or float)
        for (let property in data)
            {
                data[property] = Number(data[property]);
                average += data[property];
                length += 1;
            }

        // round to one decimal place
        data.average = (average / length).toFixed(1);

        props.postStudentProgress(data);
    }
    
    return (
        <FormWrap onSubmit={handleSubmit(formSubmit)}>
            <FormSet>
                <Div>
                    <div>
                        <Label>Speaking Fluency</Label>
                        <div>
							 <Input type="number" className={errors.speaking_fluency && "input-error"} name="speaking_fluency" ref={register({required: true})} />
							    {errors.speaking_fluency && 'Speaking Fluency Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Speaking Accuracy</Label>
                        <div>
							 <Input type="number" className={errors.speaking_accuracy && "input-error"} name="speaking_accuracy" ref={register({required: true})} />
							    {errors.speaking_accuracy && 'Speaking Accuracy Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Vocabulary</Label>
                        <div>
							 <Input type="number" className={errors.vocabulary && "input-error"} name="vocabulary" ref={register({required: true})} />
							    {errors.vocabulary && 'Vocabulary Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Pronunciation</Label>
                        <div>
							 <Input type="number" className={errors.pronunciation && "input-error"} name="pronunciation" ref={register({required: true})} />
							    {errors.pronunciation && 'Pronunciation Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Grammar</Label>
                        <div>
							 <Input type="number" className={errors.grammar && "input-error"} name="grammar" ref={register({required: true})} />
							    {errors.grammar && 'Grammar Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Listening</Label>
                        <div>
							 <Input type="number" className={errors.listening && "input-error"} name="listening" ref={register({required: true})} />
							    {errors.listening && 'Listening Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Writing</Label>
                        <div>
							 <Input type="number" className={errors.writing && "input-error"} name="writing" ref={register({required: true})} />
							    {errors.writing && 'Writing Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Reading</Label>
                        <div>
							 <Input type="number" className={errors.reading && "input-error"} name="reading" ref={register({required: true})} />
							    {errors.reading && 'Reading Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Interest</Label>
                        <div>
							 <Input type="number" className={errors.interest && "input-error"} name="interest" ref={register({required: true})} />
							    {errors.interest && 'Interest Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Participation</Label>
                        <div>
							 <Input type="number" className={errors.participation && "input-error"} name="participation" ref={register({required: true})} />
							    {errors.participation && 'Participation Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Submitting Homework</Label>
                        <div>
							 <Input type="number" className={errors.submitting_homework && "input-error"} name="submitting_homework" ref={register({required: true})} />
							    {errors.submitting_homework && 'Submitting Homework Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Homework Effort</Label>
                        <div>
							 <Input type="number" className={errors.homework_effort && "input-error"} name="homework_effort" ref={register({required: true})} />
							    {errors.homework_effort && 'Homework Effort Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Notes</Label>
                        <div>
							 <Input type="text" className={errors.notes && "input-error"} name="notes" ref={register({required: true})} />
							    
                        </div>				
                    </div>
                    <div>
                        <Label>Overall</Label>
                        <div>
							 <Input type="number" className={errors.overall && "input-error"} name="overall" ref={register({required: true})} />
							    {errors.overall && 'Overall Score is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Course ID</Label>
                        <div>
							 <Input type="number" className={errors.course_id && "input-error"} name="course_id" ref={register({required: true})} />
							    {errors.course_id && 'Course ID is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Student ID</Label>
                        <div>
							 <Input type="number" className={errors.student_id && "input-error"} name="student_id" ref={register({required: true})} />
							    {errors.student_id && 'Student ID is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Teacher ID</Label>
                        <div>
							 <Input type="number" className={errors.teacher_id && "input-error"} name="teacher_id" ref={register({required: true})} />
							    {errors.teacher_id && 'Teacher ID is Required'}
                        </div>				
                    </div>
                    <div>
                        <Label>Report Date</Label>
                        <div>
							 <Input type="number" className={errors.report_date && "input-error"} name="report_date" ref={register({required: true})} />
							    {errors.report_date && 'Report Date is Required'}
                        </div>				
                    </div>
                    </Div>
            </FormSet>
                <ButtonDiv>
                    <SaveButton onClick={handleSubmit} type="submit">
                        Add Report
                    </SaveButton>
                </ButtonDiv>
        </FormWrap>
    )
}
const mapStateToProps = state => {
    return {
        isLoading: state.studentProgressReducer.isLoading,
        progressByStudentId: state.studentProgressReducer.progressByStudentId,
        isPosted: state.studentProgressReducer.isPosted,
        isPosting: state.studentProgressReducer.isPosting,
        error: state.studentProgressReducer.error
    };
};

export default connect( mapStateToProps, { postStudentProgress, togglePostComponent } )(StudentProgressForm)