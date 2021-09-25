import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getPlacementTestByIdAndOnline, getPlacementTestByIdAndOral } from '../../../../../actions/adminDashboardActions/placementTestAction';
import { withRouter } from 'react-router-dom';
// import { Icon } from 'semantic-ui-react'
import { FormWrap2, Div5, Div4, SaveButton, FormSet, FormSet2, ButtonDiv, TextDiv, FlexDiv, Label, HR } from '../../mainStyle/styledComponent';
import { getDateStringENGBFormat } from "../../../../../utils/helpers";
import PlacementForm from './placementForm';
import PlacementEdit from './placementEdit';
import './placementTest.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const PlacementTest = props => {
    const [addTest, setAddTest] = useState(false);
    const [editTest, setEditTest] = useState(false);
    
    useEffect(() => {
        props.getPlacementTestByIdAndOral(props.studentID);
        props.getPlacementTestByIdAndOnline(props.studentID);
    }, [addTest, editTest]);

    const editModal = (id) => {
        setEditTest(!editTest);
    };

    const handleAddButton = () => {
        setAddTest(!addTest);
    };

    const onlineTestData = props.onlinePlacementTestById;
    const oralTestData = props.oralPlacementTestById;

    const sortedOnlineData = onlineTestData.sort((a,b) => (a.test_date < b.test_date) ? 1 : -1);
    const sortedOralData = oralTestData.sort((a,b) => (a.test_date < b.test_date) ? 1 : -1);
    
    const background = ["#c3d8e3"]

    return(
        <>
            <FormWrap2>
                <FormSet2 style={{ alignSelf: "start" }}>
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Online Placement Records</h3> 
                    {sortedOnlineData.length === 0 ? 
                        <>
                            <Div4>
                                <div style={{ gridColumnStart: "1", gridColumnEnd: "4" }}>
                                    <h3>This student currently has 0 Online Placement Records!</h3>
                                </div>
                            </Div4>
                            <HR></HR>
                        </>
                    :
                        <>
                        <Div5>
                            {sortedOnlineData.map((item, id) => {
                                
                                return (
                                    (id === 0 ?
                                        <>
                                            <Div4 key={`record-${id+1}`} style={{ backgroundColor: background }} >
                                                <div>
                                                    <Label>Test Date: </Label>
                                                    <TextDiv>
                                                        {getDateStringENGBFormat(item.test_date)}
                                                    </TextDiv>
                                                </div>
                                                <div>
                                                    <Label>Test: </Label>
                                                    <TextDiv>
                                                        {item.test}
                                                    </TextDiv>
                                                </div>
                                                <div>
                                                    <Label>Score: </Label>
                                                    <TextDiv>
                                                        {item.mc_correct}/{item.mc_marked}
                                                    </TextDiv>
                                                </div>
                                            </Div4>
                                            <br></br>
                                            <div style={{ backgroundColor: '#e0ebf0', padding: '5px' }}>
                                                <Label>Answers: </Label>
                                                <FlexDiv style={{ gridColumnStart: "2", gridColumnEnd: "4", paddingTop: "12px" }}>
                                                    {item.answers.map((ans, id) => {
                                                        return (
                                                            
                                                            (ans.userChoice === ans.answer ? 
                                                                <p key={`answer${id}`} style={{ fontSize: "14px", padding: '0 12px' }}>
                                                                    {ans.question}) &nbsp; {ans.userChoice}
                                                                </p>
                                                            :
                                                                    <p key={`answer${id}`} style={{ fontSize: "14px", padding: '0 12px', color: "#a60000" }}>
                                                                    {ans.question}) &nbsp; {ans.userChoice}
                                                                </p>
                                                            )
                                                        )
                                                    })}
                                                </FlexDiv>
                                                <HR></HR>
                                            </div>
                                        </>
                                    : 
                                        <>
                                            <Div4 key={`record-${id+1}`}>
                                                <div>
                                                    <Label>Test Date: </Label>
                                                    <TextDiv>
                                                        {getDateStringENGBFormat(item.test_date)}
                                                    </TextDiv>
                                                </div>
                                                <div>
                                                    <Label>Test: </Label>
                                                    <TextDiv>
                                                        {item.test}
                                                    </TextDiv>
                                                </div>
                                                <div>
                                                    <Label>Score: </Label>
                                                    <TextDiv>
                                                        {item.mc_correct}/{item.mc_marked}
                                                    </TextDiv>
                                                </div>
                                            </Div4>
                                            <br></br>
                                            <div style={{ backgroundColor: '#e0ebf0', padding: '5px' }}>
                                                <Label>Answers: </Label>
                                                <FlexDiv style={{ gridColumnStart: "2", gridColumnEnd: "4", paddingTop: "12px" }}>
                                                    {item.answers.map((ans, id) => {
                                                        return (
                                                            (ans.userChoice === ans.answer ? 
                                                                <p key={`answer${id}`} style={{ fontSize: "14px", padding: '0 12px' }}>
                                                                    {ans.question}) &nbsp; {ans.userChoice}
                                                                </p>
                                                            :
                                                                    <p key={`answer${id}`} style={{ fontSize: "14px", padding: '0 12px', color: "#a60000" }}>
                                                                    {ans.question}) &nbsp; {ans.userChoice}
                                                                </p>
                                                            )
                                                        )
                                                    })}
                                                </FlexDiv>
                                                <HR></HR>
                                            </div>
                                        </>
                                    )
                                )
                            })}
                        </Div5>
                        </>
                    }
                    </div>
                        
                </FormSet2>
                <FormSet2 style={{ alignSelf: "start" }}>
                    <div> 
                        <h3 style={{ textAlign: 'center' }}>Oral Placement Records</h3> 
                        {sortedOralData.length === 0 ? 
                            <>
                            <Div4>
                                <div style={{ gridColumnStart: "1", gridColumnEnd: "4" }}>
                                    <h3>This student currently has 0 Oral Placement Records!</h3>
                                </div>
                            </Div4>
                            <HR></HR>
                            </>
                        :
                            sortedOralData.map((item, id) => {
                                
                                return (
                                    (id === 0 ? 
                                        <>
                                        <Div4 key={`record-${id+1}`} style={{ backgroundColor: background }} >
                                            <div style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>
                                                <Label>Test Date: </Label>
                                                <TextDiv>
                                                    {getDateStringENGBFormat(item.test_date)}
                                                </TextDiv>
                                            </div> 
                                            <div>
                                                <Label>Oral Placement Level: </Label>
                                                <TextDiv>
                                                    {item.description} - {item.certificate_text}
                                                </TextDiv>
                                            </div>
                                            
                                            <div>
                                                <Label>Test: </Label>
                                                <TextDiv>
                                                    {item.test}
                                                </TextDiv>
                                            </div>
                                            <div>
                                                <Label>Level: </Label>
                                                <TextDiv>
                                                    {item.level_id}
                                                </TextDiv>    
                                            </div> 
                                            <div>
                                                <Label>Fluency: </Label>
                                                <TextDiv>
                                                    {item.fluency || "N/A"}
                                                </TextDiv>
                                            </div>   
                                            <div>
                                                <Label>Accuracy: </Label>
                                                <TextDiv>
                                                    {item.accuracy || "N/A"}
                                                </TextDiv>
                                            </div>
                                            <div>
                                                <Label>Comprehension: </Label>
                                                <TextDiv>
                                                    {item.comprehension || "N/A"}
                                                </TextDiv>
                                            </div>

                                            <div>
                                                <Label>Writing Level: </Label>
                                                <TextDiv>
                                                    {item.writing_level || "N/A"} 
                                                </TextDiv>
                                            </div>
                                            <div style={{ gridColumn: "1 / -1" }}>
                                                <Label>Notes: </Label>
                                                <TextDiv>
                                                    {item.notes || "N/A"}
                                                </TextDiv>
                                            </div>
                                        </Div4>
                                        {!editTest ? (
                                            <ButtonDiv style={{ right: 0 }}>
                                                <SaveButton type="submit" onClick={editModal}>
                                                    Edit
                                                </SaveButton>
                                            </ButtonDiv>
                                        ) : (
                                            <PlacementEdit setEditTest={setEditTest} editTest={editTest} {...props} />
                                        )}
                                        <HR></HR>
                                        </>
                                        :
                                        <>
                                        <Div4 key={`record-${id+1}`}>
                                        <div style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>
                                            <Label>Test Date: </Label>
                                            <TextDiv>
                                                {getDateStringENGBFormat(item.test_date)}
                                            </TextDiv>
                                        </div> 
                                        <div style={{ gridColumn: "1fr" }}>
                                            <Label>Oral Placement Level: </Label>
                                            <TextDiv>
                                                {item.description} - {item.certificate_text}
                                            </TextDiv>
                                        </div>
                                        
                                        <div>
                                            <Label>Test: </Label>
                                            <TextDiv>
                                                {item.test}
                                            </TextDiv>
                                        </div>
                                        <div>
                                            <Label>Level: </Label>
                                            <TextDiv>
                                                {item.level_id}
                                            </TextDiv>    
                                        </div> 
                                        <div>
                                            <Label>Fluency: </Label>
                                            <TextDiv>
                                                {item.fluency || "N/A"}
                                            </TextDiv>
                                        </div>   
                                        <div>
                                            <Label>Accuracy: </Label>
                                            <TextDiv>
                                                {item.accuracy || "N/A"}
                                            </TextDiv>
                                        </div>
                                        <div>
                                            <Label>Comprehension: </Label>
                                            <TextDiv>
                                                {item.comprehension || "N/A"}
                                            </TextDiv>
                                        </div>
                                        <div>
                                            <Label>Writing Level: </Label>
                                            <TextDiv>
                                                {item.writing_level || "N/A"}
                                            </TextDiv>
                                        </div>
                                        <div style={{ gridColumn: "1 / -1" }}>
                                            <Label>Notes: </Label>
                                            <TextDiv>
                                                {item.notes || "N/A"}
                                            </TextDiv>
                                        </div>
                                    </Div4>
                                    <HR></HR>
                                    </>
                                    )
                                    
                                )
                            })
                        } 
                    </div>

                </FormSet2>           
            </FormWrap2>  
    {!addTest ? (
        <div
          className='create-new-entry'
          onClick={handleAddButton}
          style={{ cursor: 'pointer', color: '#26ABBD' }}
        >
            <div style={{ marginRight: '10px' }}>Add New Test</div>
            <div>
            <FontAwesomeIcon
              style={{ width: '25px', height: '25px', cursor: 'pointer' }}
              icon={faPlusCircle}
              size='lg'
            />
          </div>
        </div>
    ) : (
        <PlacementForm setAddTest={setAddTest} addTest={addTest} {...props} />
    )}
    </>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.placementTestReducer.isLoading,
        placementTestById: state.placementTestReducer.placementTestById,
        isTestEditing: state.placementTestReducer.isTestEditing,
        onlinePlacementTestById: state.placementTestReducer.onlinePlacementTestById,
        oralPlacementTestById: state.placementTestReducer.oralPlacementTestById
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getPlacementTestByIdAndOnline, getPlacementTestByIdAndOral }
  )(PlacementTest)
  )
