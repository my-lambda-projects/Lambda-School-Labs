import React, { useState } from 'react';
import CreateEventReviewList from './CreateEventReviewList';
import CreateEventReviewEditForm from './CreateEventReviewEditForm';
import styled from 'styled-components';

export const CreateEventReview = props => {
  const [edit, setEdit] = useState();

  const {
    localState,
    setLocalState,
    handleReviewSubmit,
    handlePageBack,
    cancelForm,
  } = props;

  return (
    <StyledRenderedDiv>
      {edit ? (
        <CreateEventReviewEditForm
          localState={localState}
          setLocalState={setLocalState}
          handleReviewSubmit={handleReviewSubmit}
          handlePageBack={handlePageBack}
          setEdit={setEdit}
          edit={edit}
        />
      ) : (
        <CreateEventReviewList
          localState={localState}
          handleReviewSubmit={handleReviewSubmit}
          cancelForm={cancelForm}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </StyledRenderedDiv>
  );
};

const StyledRenderedDiv = styled.div`
  margin: 0 auto;
  padding: 1.5rem 3rem;
  border-radius: ${({ theme }) => theme.borderRadiusDefault};

  .styledReviewDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;

    label {
      color: ${({ theme }) => theme.primary8};
      &::before {
        color: ${({ theme }) => theme.primary8};
      }
    }
    .title {
      margin-botton: 20px;
      color: ${({ theme }) => theme.primary8};
    }

    .city-states-input {
      label {
      }
    }
  }

  .errorFlex {
    display: flex;
    flex-direction: column;
  }
  .timeWrapper {
    display: flex;
  }
  .error-message.error-span.left-aligned {
    color: red;
    font-size: 12px;
  }
`;

export default CreateEventReview;
