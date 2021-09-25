import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { AntTextArea } from '../../styled/index';
import { StyledCard } from '../../styled/StyledCard';
import { Icon, Input, DatePicker } from 'antd';
import Autocomplete from 'react-google-autocomplete';
import moment from 'moment';

export const UserInfo = ({ user, isEditable, updateInfo}) => {
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState('')
  const [DOB, setDOB] = useState(undefined);
  const [cityAndState, setcityAndState] = useState('')

  useEffect(() => {
    if (user.bio) {
      setBio(user.bio);
    }
    if (user.address) {
      setLocation(user.address);
      let arr = user.address.split(', ');
      setcityAndState(arr[arr.length - 3] + ', ' + arr[arr.length - 2].slice(0, 2));
    }
    if (user.DOB) {
      setDOB(moment(user.DOB));
    }
  }, [user])

  const inputBio = event => {
    setBio(event.target.value);
  }

  const inputDOB = date => {
    console.log(date);
    setDOB(date);
  }

  const openEditor = () => {
    setIsEditing(true);
  }

  const saveInfo = event => {
    event.preventDefault();
    updateInfo(bio, location, DOB);
    setIsEditing(false);
  }

  return (
    <StyledDiv>
      <div className='user-info-btns'>
        {(isEditable && !isEditing) && (
          <div className='user-info-btn' onClick={openEditor}>
            <Icon  type='edit' style={{ fontSize: '28px', cursor: 'pointer'}}/>
            <p>Edit profile</p>
          </div>
          )}
        {isEditing && (
          <div className='user-info-btn' onClick={saveInfo} >
            <Icon type="save" style={{ fontSize: '28px', cursor: 'pointer'}} />
            <p>Save profile</p>
          </div>
        )}
      </div>
      <CustomStyledCard style={{ boxShadow: 'none' }}>
        <div className='outer-container'>
          <div className='inner-container'>
            <div className='left'>
              <h4>General Bio</h4>
              {isEditing ? (
                <AntTextArea 
                  name='bio'
                  value={bio}
                  autosize={{ minRows: 5}}
                  onChange={inputBio}
                  placeholder='Add a blurb about yourself here'
                />
              ) : (
                <div className='bio'>
                  <p>{user.bio ? user.bio : 'You have not set your bio yet'}</p>
                </div>
              )}
            </div>
            <div className='right'>
              <div>
                
                {isEditing ? (
                  <>
                    <label htmlFor='DOB'>DOB:</label>
                    <DatePicker 
                      name={'DOB'}
                      value={DOB}
                      placeholder={'Select DOB'}
                      onChange={inputDOB} />
                    <label htmlFor='address'>Address:</label>
                    <Autocomplete
                      name="address"
                      className="google-autocomplete"
                      onPlaceSelected={place => {
                        setLocation(place.formatted_address)
                      }}
                      types={['address']}
                      componentRestrictions={{ country: 'us' }}
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div className='age-row'>
                      <h5>Age:</h5> 
                      {user.DOB && <p>{user.DOB && moment().diff(moment(user.DOB), 'years')}</p>}
                    </div>
                    <p>
                      <Icon
                        type="environment"
                        theme={'twoTone'}
                        twoToneColor={'#005a87'}
                        style={{ marginRight: '0.5rem' }}/>
                      {user.address && cityAndState}
                    </p>
                  </>
                )}
              </div>
              <div>
                <h5>Follow Me</h5>
                <div className='social-media-btns'>
                  <Icon type='twitter' className='icons'/>
                  <Icon type='instagram' className='icons'/>
                  <Icon type='linkedin' className='icons'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomStyledCard>
    </StyledDiv>
  )
}

export default UserInfo;

const StyledDiv = styled.div`
  width: 90%;
  margin-top: -4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;

  .user-info-btns {
    align-self: flex-end;
    height: 55px;

    .user-info-btn {
      display: flex;
      flex-direction: column; 
      align-items: center;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;

      p {
        margin: 0;
        font-size: 12px
      }
    }

    .user-info-btn:hover {
      color: ${({theme}) => theme.primary7};

      p {
        color: ${({theme}) => theme.primary7};
      }
    }
  }
`


const CustomStyledCard = styled(StyledCard)`
  && {
    background: ${({theme}) => theme.gray2};
    border-radius: 3px;
  }

  .ant-card-body {
    padding: 1rem 2rem;
    min-height: 190px;
  }

  .outer-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inner-container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h4 {
        border-bottom: 1px solid #C4C4C4;
        margin: 0 0 1rem 0;
      }
    }

    .right {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .age-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1rem 0;
        
        h5 {
          margin: 0;
        }

        p {
          margin: 0;
          margin-left: 0.5rem;
        }
      }

      .google-autocomplete {
        width: 100%;
        padding: 0.2rem;
        border-radius: 3px;
        border: 1px solid #D4D4D4;
      }
    }
  }

  .social-media-btns {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .icons {
      font-size: 24px;
      margin-right: 20px; 
    }
  }
` 