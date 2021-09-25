import React, { useState } from 'react';
import { Steps, Button, Row, Col, Layout, Modal } from 'antd';
import { connect } from 'react-redux';
import { createNewStudent } from '../../../../actions/adminDashboardActions/studentTableActions';
import { useHistory } from 'react-router-dom';
import './RegisterStudentForm.scss';

// Sub component imports
import StudentDetails from './StudentDetails';
import StudentAddress from './StudentAddress';
import StudentContacts from './StudentContacts';
import StudentReview from './StudentReview';

const RegisterStudentForm = props => {
  const [regState, setRegState] = useState(0);
  const token = localStorage.getItem('token');
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const userID = tokenData.subject;
  const { Step } = Steps;
  const { Content } = Layout;
  const [studentForm, setStudentForm] = useState({
    user_id: userID,
    birthdate: '04/01/2010', // default birthday passed into student Registration form
  });
  const history = useHistory();

  const handleChange = e => {
    setStudentForm({
      ...studentForm,
      [e.target.id]: e.target.value,
    });
  };

  const formHelper = ({ value }) => {
    if (value === 'M' || value === 'F') {
      setStudentForm({
        ...studentForm,
        gender: value,
      });
    } else {
      setStudentForm({
        ...studentForm,
        birthdate: value,
      });
    }
  };

  const gradeHelper = ({value}) => {
    if (value) {
      setStudentForm({
        ...studentForm,
        school_grade: value,
      });
  }
};

  const submitForm = values => {
    props.createNewStudent(studentForm);
  };

  // Success message modal
  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'Student Registered!',
      content: `Returning to Dashboard in ${secondsToGo} seconds.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Returning to Dashboard in ${secondsToGo} seconds.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const buttonFunctions = () => {
    submitForm();
    countDown();
    history.push('/dashboard');
  };

  const steps = [
    {
      title: 'details',
    },
    {
      title: 'address',
    },
    {
      title: 'emergency contacts',
    },
    {
      title: 'review',
    },
  ];

  function next() {
    const current = regState + 1;
    setRegState(current);
  }

  function prev() {
    const current = regState - 1;
    setRegState(current);
  }

  function getStep(regState) {
    switch (regState) {
      case 0:
        return (
          <StudentDetails
            studentForm={studentForm}
            handleChange={handleChange}
            formHelper={formHelper}
            gradeHelper={gradeHelper}
            next={next}
          />
        );
      case 1:
        return (
          <StudentAddress
            studentForm={studentForm}
            handleChange={handleChange}
            formHelper={formHelper}
            next={next}
          />
        );
      case 2:
        return (
          <StudentContacts
            studentForm={studentForm}
            handleChange={handleChange}
            next={next}
          />
        );
      case 3:
        return <StudentReview studentForm={studentForm} next={next} />;
      default:
        return null;
    }
  }

  return (
    <Content style={{ margin: '1.8rem 0' }}>
      <Row>
        <Col span={16}>
          <Steps current={regState}>
            {steps.map(item => (
              <Step key={item.title} />
            ))}
          </Steps>
        </Col>
      </Row>

      <Row justify={'center'}>
        <Col>
          <div className="form-steps-div">{getStep(regState)}</div>
        </Col>
      </Row>

      <Row justify={'center'}>
        <Col>
          <div className="form-steps-action">
            {regState > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {regState === 3 ? (
              <Button type="primary" onClick={buttonFunctions}>
                Submit
              </Button>
            ) : null}
          </div>
        </Col>
      </Row>
    </Content>
  );
};

const mapStateToProps = state => ({
  createNewStudentIsLoading:
    state.studentTableReducer.createNewStudentIsLoading,
  createNewStudentSuccessMessage:
    state.studentTableReducer.createNewStudentSuccessMessage,
});

export default connect(mapStateToProps, { createNewStudent })(
  RegisterStudentForm
);
