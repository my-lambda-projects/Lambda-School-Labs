import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, message, Form, Input, DatePicker } from 'antd';
import Autocomplete from 'react-google-autocomplete';
import { successModal, StyledCancelButton, StyledButton } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { register } from '../actions';
import sampleProfile from '../assets/undraw_profile.svg';
import { device } from '../styled/deviceBreakpoints';
import moment from 'moment';
export const Signup = props => {
  const [state, dispatch] = useStateValue();

  /**
   * @type {User}
   */
  let user = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    uid: '',
    DOB: moment(moment().subtract(18, 'years')),
  };
  const [localState, setLocalState] = useState(user);
  //const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (state.auth.googleAuthUser) {
      user.uid = state.auth.googleAuthUser.uid;
      if (state.auth.googleAuthUser.displayName) {
        const name = state.auth.googleAuthUser.displayName.split(' ');
        user.firstName = name[0];
        user.lastName = name[1];
      }

      if (state.auth.googleAuthUser.email) {
        user.email = state.auth.googleAuthUser.email;
      }

      if (state.auth.googleAuthUser.phoneNumber) {
        user.phoneNumber = state.auth.googleAuthUser.phoneNumber;
      }

      if (state.auth.googleAuthUser.photoURL) {
        user.photoURL = state.auth.googleAuthUser.photoURL;
      }
      setLocalState({ ...user });
    }
  }, [state]);

  const handleSubmit = e => {
    e.preventDefault();
    register({...localState, DOB: localState.DOB.format('LL')}, dispatch);
    regUserSuccessModal();
  };

  const regUserSuccessModal = successModal({
    title: 'Registration Success!',
    maskStyle: { background: `rgba(97, 37, 0, 0.2)` },
    onOk: () => props.history.push('/dashboard'),
  });

  const cancelRegister = () => {
    message.warning('Registration is required to continue using Voluntier');
  };

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };

  return (
    <StyledDiv>
      <h1>Get Registered</h1>
      {localState.photoURL ? (
        <Avatar
          src={localState.photoURL}
          shape="square"
          size={64}
          icon="user"
        />
      ) : (
        <img src={sampleProfile} alt="undraw profile" />
      )}
      <Form layout={'vertical'} onSubmit={handleSubmit}>
        <div className="row-half">
          <Form.Item label="First Name" required>
            <Input
              name={'firstName'}
              value={localState.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Last Name" required>
            <Input
              name={'lastName'}
              value={localState.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="row-full">
          <Form.Item label="Address" required>
            <Autocomplete
              name="address"
              className="google-autocomplete"
              onPlaceSelected={place => {
                setLocalState({
                  ...localState,
                  address: place.formatted_address,
                });
              }}
              types={['address']}
              componentRestrictions={{ country: 'us' }}
              value={localState.address}
              onChange={e => handleChange('address', e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="row-half">
          <Form.Item label="Email" required>
            <Input
              name={'email'}
              value={localState.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phone Number" required>
            <Input
              name={'phoneNumber'}
              value={localState.phoneNumber}
              onChange={e => handleChange('phoneNumber', e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="row-center">
          <Form.Item label="Date of Birth" required>
            <DatePicker
              name="DOB"
              value={localState.DOB}
              onChange={e => handleChange('DOB', e)}
              format={['MM/DD/YY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'MM-DD-YY']}
            />
          </Form.Item>
        </div>
        <div className="buttonStyles">
          <StyledCancelButton onClick={cancelRegister} type="primary">
            Cancel
          </StyledCancelButton>
          <StyledButton
            onClick={handleSubmit}
            disabled={state.auth.isLoading}
            loading={state.auth.isLoading}
            type="primary"
          >
            Register
          </StyledButton>
        </div>
      </Form>
    </StyledDiv>
  );
};

export default Signup;

const StyledDiv = styled.div`
  && {
    display: flex;
    background: ${({ theme }) => theme.gray1};
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-center: space-between;
    padding-bottom: 3rem;
    label {
      color: ${({ theme }) => theme.primary8};

      &::before {
        color: ${({ theme }) => theme.primary8};
      }
    }
    img {
      width: 200px;
      margin: 1.5rem auto;
    }

    form {
      width: 100%;
    }

    .google-autocomplete {
      width: 100%;
      height: 32px;
      display: inline-block;
      padding: 4px 11px;
      font-size: 14px;
      line-height: 1.5;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid rgb(217, 217, 217);
      font-family: ${({ theme }) => theme.bodytext};

      &::placeholder {
        color: rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-family: ${({ theme }) => theme.bodytext};
      }
    }
    .row-half,
    .row-full {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 3.5rem;

      @media ${device.tablet} {
        width: 90%;
      }

      @media (max-width: 650px) {
        padding-left: 0;
      }
    }

    .row-full {
      .ant-form-item {
        width: 100%;
      }
    }

    .row-center {
      width: 50%;
      margin: 0 auto;
      .ant-calendar-picker {
        width: 100%;
      }
    }
    .row-half {
      .ant-form-item {
        width: 45%;

        @media ${device.tablet} {
          margin-right: 0.8rem;
          margin-left: 0.8rem;
        }
      }
    }

    .buttonStyles {
      display: flex;
      margin: 50px auto 0;
      padding-top: 40px;
      padding-right: 70px;
      padding-left: 70px;
      justify-content: space-around;
    }
  }
`;

const formItemLayoutShort = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 10 },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
