import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Modal, Select, DatePicker, Input, Icon, Button, message } from 'antd';
import { WrappedAntForm, AntInputNumber, AntSelect } from '../../styled/index';
import moment from 'moment';

export const UserGoal = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalsToEdit, setGoalsToEdit] = useState({
    Hours: '',
    Frequency: undefined, //need to be undefined or else placeholder will not show
    start: null,
    end: null,
  });
  const [displayGoals, setDisplayGoals] = useState({
    hours: '',
    frequency: '',
    duration: {
      start: '',
      end: '',
    },
  });
  const inputRef = useRef(null);

  const { Option } = Select;
  const { MonthPicker } = DatePicker;

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (props.user.goals) {
      setDisplayGoals(props.user.goals);
      setGoalsToEdit({
        Hours: props.user.goals.hours,
        Frequency: props.user.goals.frequency
          ? props.user.goals.frequency
          : undefined,
        start: props.user.goals.duration.start
          ? moment(props.user.goals.duration.start)
          : null,
        end: props.user.goals.duration.end
          ? moment(props.user.goals.duration.end)
          : null,
      });
    }
  }, [props.user]);

  const handleSubmit = values => {
    let goals = {
      hours: values.Hours,
      frequency: values.Frequency,
      duration: {
        start: moment(values.start).format('MMM-YYYY'),
        end: moment(values.end).format('MMM-YYYY'),
      },
    };

    let updatedUser = {
      ...props.user,
      goals: goals,
    };

    props.updateUser(updatedUser);
    setGoalsToEdit({
      Hours: '',
      Frequency: '',
      start: null,
      end: null,
    });
    setIsModalOpen(false);
  };

  const cancelSetGoal = () => {
    setGoalsToEdit({
      Hours: '',
      Frequency: undefined,
      start: null,
      end: null,
    });
    setIsModalOpen(false);
  };

  const removeGoal = () => {
    let newGoals = {
      hours: '',
      frequency: '',
      duration: {
        start: null,
        end: null,
      },
    };

    let updatedUser = {
      ...props.user,
      goals: newGoals,
    };
    props.updateUser(updatedUser);
  };

  const copyLink = event => {
    event.preventDefault();
    inputRef.current.select();
    document.execCommand('copy');
    message.config({top: 100})
    message.success('Link copied.');
  };

  return (
    <StyledDiv>
      <StyledModal
        title="Set Your Goal"
        visible={isModalOpen}
        closable={false}
        footer={null}
      >
        <WrappedAntForm
          layout={'vertical'}
          onSubmit={handleSubmit}
          autofill={goalsToEdit}
          buttonType="primary"
          submitButton
          submitButtonText="Save"
          cancelButton={true}
          cancelButtonText={'Cancel'}
          handleCancel={cancelSetGoal}
        >
          <div className="form-row">
            <AntInputNumber
              name={' Hours '}
              placeholder="Number of hours"
              min={0}
              style={{ width: '200px' }}
            />
            <AntSelect
              name={' Frequency'}
              placeholder="Select frequency"
              style={{ width: '200px' }}
            >
              <Option key="per week" value="per week">
                hours per week
              </Option>
              <Option key="per month" value="per month">
                hours per month
              </Option>
            </AntSelect>
          </div>
          <h5>Duration</h5>
          <div className="form-row">
            <MonthPicker
              name={'Start'}
              placeholder={'Start month'}
              format={'MMM-YYYY'}
              style={{ width: '200px' }}
            />
            <MonthPicker
              name={'End'}
              placeholder={'End month'}
              format={'MMM-YYYY'}
              style={{ width: '200px' }}
            />
          </div>
        </WrappedAntForm>
      </StyledModal>
      <div className="left">
        <div>
          {displayGoals.frequency ? (
            <Button type="link" icon="minus-circle" onClick={removeGoal}>
              Remove Goal
            </Button>
          ) : (
            <Button type="link" icon="plus-circle" onClick={openModal}>
              Set Goal
            </Button>
          )}
        </div>
        {displayGoals.frequency ? (
          <>
            <div>
              <div className="row">
                <h5>Current Goal</h5>  
              </div>
              <p>
                {displayGoals.hours} hours {displayGoals.frequency}
              </p>
            </div>
            <div>
              <h5>Duration</h5>
              <p>
                {displayGoals.duration.start} to {displayGoals.duration.end}
              </p>
            </div>
          </>
        ) : (
          <>
            <h5>Current Goal</h5>
            <p>You do not have any goals at the moment</p>
          </>
        )}
      </div>
      <div className="right">
        <div>
          <h5>Community</h5>
          <p>2/5 friends accepted your challenge for October</p>
        </div>
        <div>
          <h5>Challenge a friend to be your goals</h5>
          <div className="link-row">
            <Input
              style={{ width: '350px' }}
              prefix={<Icon type="link" style={{ color: '#8C8C8C' }} />}
              value={`www.voluntier.com/${props.user.firstName}challenge`}
              ref={inputRef}
            />
            <Button icon="copy" onClick={copyLink}>
              Copy
            </Button>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default UserGoal;

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border: 1px solid ${({ theme }) => theme.gray4};
  background: white;
  border-radius: 3px;
  padding: 1rem 0;

  .left {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .row {
      display: flex,
      justify-content: flex-start;
      align-items: flex-end;

      h5 {
        margin-right: 1rem;
      }
    }

    button {
      color: rgba(0, 0, 0, 0.6);
      padding: 0;
    }

    button:hover {
      color: ${({ theme }) => theme.primary7};
    }
  }

  .right {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .link-row {
      display: flex;
    }
  }
`;

const StyledModal = styled(Modal)`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    h5 {
      align-self: flex-start;
    }

    button {
      align-self: center;
      margin: 1rem 1.5rem;
    }
  }
`;
