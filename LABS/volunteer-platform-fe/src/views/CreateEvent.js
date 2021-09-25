import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { deleteModal } from '../styled';
import createEventImg from '../assets/undraw_blooming_jtv6.svg';
import {
  CreateEventPartOne,
  CreateEventPartTwo,
  CreateEventPartThree,
  CreateEventPartFour,
} from '../components/CreateEvent';
import { Steps } from 'antd';
import CreateEventReview from '../components/CreateEvent/CreateEventReview/CreateEventReview';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent, createRecurringEvent } from '../actions';
import { TopContent, StyledRenderDiv } from './CreateOrg';

let { Step } = Steps;

export const CreateEvent = props => {
  const initialEvent = {
    nameOfEvent: '',
    address: '',
    typesOfCauses: [],
    date: '',
    startTime: moment('00:00:00', 'HH:mm'),
    endTime: moment('00:00:00', 'HH:mm'),
    numberOfVolunteers: '',
    phoneNumber: '',
    pointOfContact: '',
    volunteerRequirements: [],
    interest: [],
    website: '',
    dynamicDates: {
      dynamicDay: '',
      dynamicYear: '',
      dynamicNumber: '',
      dynamicNth: '',
    },
    recurringInfo: {
      repeatTimePeriod: '',
      occurrenceEnds: 'On',
      occurrenceEndDate: moment(),
      occurrenceEndsAfter: 1,
      repeatEveryValue: '',
      days: [],
    },
    otherNotes: '',
  };

  const [localState, setLocalState] = useState(initialEvent);

  const formTitles = {
    1: 'Create An Event',
    2: 'Create An Event',
    3: 'Almost Finished Creating Your Event!!',
    4: 'Almost Finished Creating Your Event!!',
    5: "Here's What We Got",
  };

  const formParts = {
    1: CreateEventPartOne,
    2: CreateEventPartTwo,
    3: CreateEventPartThree,
    4: CreateEventPartFour,
    5: CreateEventReview,
  };

  const steps = [
    {
      title: 'Start',
    },
    {},
    {},
    {},
    {
      title: 'Finished',
    },
  ];
  let [pageNumber, setPageNumber] = useState(1);

  const [state, dispatch] = useStateValue();

  //Destructuring
  const { recurringInfo } = localState;

  const RenderedFormParts = formParts[pageNumber];

  useEffect(() => {
    if (props.location.state.org) {
      setLocalState({
        ...localState,
        orgId: props.location.state.org.orgId,
        address: props.location.state.org.address,
        typesOfCauses: props.location.state.org.causeAreas,
        website: props.location.state.org.website,
        POC: props.location.state.org.POC,
      });
    }
  }, [props.location.state.org]);

  //Handle Submit for Form
  const handleReviewSubmit = () => {
    const event = {
      orgId: localState.orgId,
      orgName: props.location.state.org.organizationName,
      orgImagePath: props.location.state.org.imagePath || '',
      nameOfEvent: localState.nameOfEvent,
      address: localState.address,
      date: localState.date.unix(),
      startTime: localState.startTime.format('LT'),
      endTime: localState.endTime.format('LT'),
      startTimeStamp: moment(
        localState.date.format('LL') + ' ' + localState.startTime.format('LT')
      ).unix(),
      endTimeStamp: moment(
        localState.date.format('LL') + ' ' + localState.endTime.format('LT')
      ).unix(),
      numberOfVolunteers: localState.numberOfVolunteers,
      typesOfCauses: localState.typesOfCauses,
      interest: localState.interest,
      volunteerRequirements: localState.volunteerRequirements,
      pointOfContact: {
        fullName: localState.fullName,
        email: localState.email,
        phoneNumber: localState.phoneNumber,
      },
      eventDetails: localState.eventDetails,
      website: localState.website,
      otherNotes: localState.otherNotes,
    };

    if (recurringInfo.recurringEvent === 'Yes') {
      event.recurringInfo = recurringInfo;
      if (event.recurringInfo.occurrenceEnds === 'On') {
        event.recurringInfo.occurrenceEndDate = event.recurringInfo.occurrenceEndDate.unix();
        event.recurringInfo.occurrenceEndsAfter = '';
      }
      if (event.recurringInfo.occurrenceEnds === 'After') {
        event.recurringInfo.occurrenceEndDate = '';
      }

      createRecurringEvent(event, dispatch);
    } else {
      createEvent(event, dispatch);
    }
    setPageNumber(1);

    props.history.push('/org-dashboard', { org: props.location.state.org });
  };

  const handleChange = (name, value) => {
    setLocalState({
      ...localState,
      [name]: value,
    });
  };
  ///Cancel Form
  const cancelForm = () => {
    const cancelFormModal = deleteModal({
      title: 'Are you sure you want to cancel ?',
      content: 'All information will be delete.',
      onOk: () =>
        props.history.push('/org-dashboard', { org: props.location.state.org }),
    });
    cancelFormModal();
  };

  //Handle Form Part Submit
  const handlePageForward = () => {
    setPageNumber(pageNumber + 1);
    document
      .getElementById('scroll-event-header')
      .scrollIntoView({ behavior: 'smooth' });
  };

  //Go Back a Page Number
  const handlePageBack = () => {
    setPageNumber(pageNumber - 1);
    document
      .getElementById('scroll-event-header')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledDiv>
      <h1 id={'scroll-event-header'}>{formTitles[pageNumber]}</h1>
      <TopContent>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <Steps current={pageNumber - 1} progressDot size="small">
          {steps.map(step => {
            return (
              <Step key={step} title={step.title} description={step.content} />
            );
          })}
        </Steps>
      </TopContent>
      <CustomRenderDiv>
        <RenderedFormParts
          state={state}
          localState={localState}
          setLocalState={setLocalState}
          handlePageForward={handlePageForward}
          handlePageBack={handlePageBack}
          cancelForm={cancelForm}
          pageNumber={pageNumber}
          handleChange={handleChange}
          handleReviewSubmit={handleReviewSubmit}
        />
      </CustomRenderDiv>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.gray2};
  text-align: center;
`;

const CustomRenderDiv = styled(StyledRenderDiv)`
  .styledDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
  }

  label {
    color: ${({ theme }) => theme.primary8};

    &::before {
      color: ${({ theme }) => theme.primary8};
    }
  }

  .selectMax {
    max-width: 615px;
  }

  .inline {
    width: 40%;
  }

  h4 {
    margin: 30px 0px;
  }

  .errorFlex {
    dispaly: flex;
    flex-direction: column;
  }

  .error-message.error-span.left-aligned {
    color: red;
    font-size: 12px;
  }
  .city-states-input {
    display: flex;
    justify-content: space-between;
  }
  .time-wrapper {
    display: flex;
    justify-content: center;
    label {
      margin-left: 0px;
    }
  }

  .buttonStyles {
    display: flex;
    margin: 50px auto 0;
    padding-top: 40px;
    padding-right: 50px;
    padding-left: 50px;
    justify-content: space-between;
    border-top: 2px solid ${({ theme }) => theme.primary8};

    button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateEvent;
