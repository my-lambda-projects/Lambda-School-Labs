import React from 'react';
import { WrappedAntForm, AntTextArea } from '../../../styled';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Editor = ({ onSubmit, submitting }) => {
  return (
    <StyledEditor>
      <WrappedAntForm
        onSubmit={onSubmit}
        submitButtonText={'Send'}
        buttonType={'submit'}
        submitButton={true}
        buttonLoading={submitting}
        autofill={submitting && { comment: '' }}
      >
        <AntTextArea name={'Comment'} trigger={'onBlur'}/>
      </WrappedAntForm>
    </StyledEditor>
  );
};

const StyledEditor = styled.div`
  width: 80%;
  margin: 0 auto;
`;

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Editor;
