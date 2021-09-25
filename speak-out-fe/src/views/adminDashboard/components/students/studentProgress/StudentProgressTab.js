import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudentProgress, togglePostComponent } from '../../../../../actions';
import { withRouter } from 'react-router-dom';
import { Progress } from 'antd';
import AddStudentProgressForm from './AddStudentProgressForm';
import EditStudentProgressForm from './EditStudentProgressForm'
import { FormWrap, FormSet, Label, Div, SaveButton, ButtonDiv } from '../../mainStyle/styledComponent';

const StudentProgressTab = props => {

    // let options = { year: 'numeric', month: 'numeric', day: 'numeric' }; //'long'
    // let report_date = new Date(props.progressByStudentId.report_date).toLocaleDateString('en-GB', options)
    useEffect(() => {
        props.getStudentProgress(props.studentID)
    }, [])

    const [edit, setEdit] = useState(false)

    if (edit) {
        return (
            < EditStudentProgressForm {...props} setEdit={setEdit} edit={edit} />
        )
    } else if (props.progressByStudentId) {

        const categories = ["speaking_fluency", "speaking_accuracy", "vocabulary", "pronunciation", "grammar", "listening", "writing", "reading", "interest", "participation", "submitting_homework", "homework_accuracy", "homework_effort", "notes", "report_date"];

        return (
            <FormWrap>
                <FormSet>
                    <Div>

                    { categories.map((area, id) => {

                        return (
                            <div key={id}>
                                {/* need to get readable text for label */}
                                <Label>{area}</Label> 
                                <Progress type="circle" percent={area * 10} width={80} />
                            </div>
                        );
                    }) }
                    
                        <div>
                            <Label>Notes</Label>
                            <Label>{props.progressByStudentId.notes}</Label>
                        </div>
                        <div>
                            <Label>Report Date</Label>
                            <Label>{props.progressByStudentId.report_date}</Label>
                        </div>
                        <div></div>
                        <div>                        
                            <Progress
                                type="circle"
                                // percent={props.progressByStudentId.speaking_fluency * 10}
                                percent={2 * 10}
                                strokeColor='green'
                                label= 'Overall'
                                width={200}
                                format={percent => `${percent}% Total`}
                                className='overall-circle'
                                />
                        </div>

                    </Div>
                </FormSet>
                    <ButtonDiv>
                        <SaveButton onClick={() => { setEdit(true) }} >
                                Edit Report
                        </SaveButton>
                    </ButtonDiv>
            </FormWrap>
        )
    } else {
        return (
            < AddStudentProgressForm {...props} />
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.studentProgressReducer.isLoading,
        progressByStudentId: state.studentProgressReducer.progressByStudentId,
        error: state.studentProgressReducer.error,
        isPosted: state.studentProgressReducer.isPosted,
        isPosting: state.studentProgressReducer.isPosting,
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        { getStudentProgress, togglePostComponent }
    )(StudentProgressTab)
)








