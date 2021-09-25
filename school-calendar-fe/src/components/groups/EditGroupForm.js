import React, { useState, useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
// import { useToasts } from 'react-toast-notifications';

const EditGroupForm = ({ setShowEditGroupForm }) => {
  //needed variables for first axios call, current user object and token from currentUser object
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { adminInfo, width, setNavState, currentGroup, getGroupList } = useContext(Context);
  const { token } = currentUser;

  const colorOptions = [
    '#c70c00',
    '#ff2bae',
    '#ffcc77',
    '#9d6e1f',
    '#561302',
    '#8a0a01',
    '#2e5780',
    '#f65b1c',
    '#2f95f9',
    '#81c1ff',
    '#f19805',
    '#218047'
  ];
  const iconOptions = ['fas fa-star', 'fas fa-square', 'fas fa-circle'];

  const [selectedColor, setSelectedColor] = useState(currentGroup.groupColor);
  const [selectedIcon, setSelectedIcon] = useState(currentGroup.groupIcon);

  const [updateGroup, setUpdateGroup] = useState({
                                                  ...currentGroup,
                                                groupColor: currentGroup.groupColor ? currentGroup.groupColor : '',
                                                groupIcon: currentGroup.groupIcon ? currentGroup.groupIcon : ''
                                              });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setUpdateGroup({
      ...updateGroup,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(JSON.stringify(updateGroup) !== JSON.stringify(currentGroup)){
        axiosWithAuth(token)
        .put(`/api/groups/${adminInfo.adminId}/${currentGroup.id}`, updateGroup)
        .then(res => {
            console.log(res.data);
            if(width < 768){
              setNavState(2);
            } else if (width >= 768) {
              setShowEditGroupForm(false);
              getGroupList();
            }         
        })        
        .catch(err => {
          console.log(err)
        })
    }else{
        console.log('bro, these are the same object')
        if(width < 768){
          setNavState(2);
        } else if (width >= 768) {
          setShowEditGroupForm(false);
        }
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <CancelBtn onClick={()=>{setNavState(2)}}>
          Cancel
        </CancelBtn>
        <Header>Edit Group</Header>
      </HeaderContainer>
      <Form>
        <Label htmlFor="groupName">
          Group Name:
          <Input
            type="text"
            placeholder="New Group Name"
            name="groupName"
            value={updateGroup.groupName}
            onChange={handleChange}
          />
        </Label>

        <br />

        <Label htmlFor="groupName">
          {' '}
          Group Description:
          <Input
            type="text"
            placeholder="New Group Description"
            name="groupDescription"
            value={updateGroup.groupDescription}
            onChange={handleChange}
          />
        </Label>
        <ColorsContainer>
          {colorOptions.map(color => {
            if (selectedColor === color) {
              return (
                <ColorOption
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setUpdateGroup({
                      ...updateGroup,
                      groupColor: color
                    })
                  }}
                  color={`${color}`}
                  border={`solid 3px black`}
                  borderRadius={`5px`}
                />
              );
            } else {
              return (
                <ColorOption
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setUpdateGroup({
                      ...updateGroup,
                      groupColor: color
                    })
                  }}
                  color={`${color}`}
                />
              );
            }
          })}
        </ColorsContainer>
        <IconsContainer>
          {iconOptions.map(icon => {
            if (selectedIcon === icon) {
              return (
                <Icon
                  key={icon}
                  onClick={() => {
                    setSelectedIcon(icon)
                    setUpdateGroup({
                      ...updateGroup,
                      groupIcon: icon
                    })
                  }}
                  className={icon}
                  border={`solid 3px black`}
                  borderRadius={`5px`}
                />
              );
            } else {
              return (
                <Icon
                  key={icon}
                  onClick={() => {
                    setSelectedIcon(icon)
                    setUpdateGroup({
                      ...updateGroup,
                      groupIcon: icon
                    })
                  }}
                  className={icon}
                ></Icon>
              );
            }
          })}
        </IconsContainer>
        <SubmitBtn type="submit" label="submit" onClick={handleSubmit}>
          Submit
        </SubmitBtn>
      </Form>
      <p>{message}</p>
    </Container>
  );
};
export default EditGroupForm;

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};

const device = {
  desktop: `(min-width: ${size.desktop})`
};


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2%;
`;

const Header = styled.h1`
  width: 60%;
  text-align: right;
  font-size: 22px;
  font-weight: bold;
`;

const CancelBtn = styled.p`
  width: 40%;
  font-size: 20px;
  line-height: 27px;
  color: #28807d;
  &:hover {
    cursor: pointer;
  }
`;
const Form = styled.form`
  display: flex;
  padding: 2%;
  flex-wrap: wrap;
  margin: 0 0 16%;
`;

const Label = styled.label`
  width: 100%;
  margin: 3% 0;
  font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding 1%;
    border: none;
    border-bottom: solid 1px #999898;
    background-color: #F4F8F9;
    margin: 1% 0;
    outline: none
`;

const SubmitBtn = styled.button`
  width: 70%;
  background: #28807d;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 4%;
  margin: 8% auto;
  border: 1px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
`;
const ColorsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const IconsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 5% 0;
`;

const Icon = styled.i`
  font-size: 5rem;
  paddin: 1%;
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  @media ${device.desktop} {
    font-size: 40px;
    }
`;

const ColorOption = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.color};
  margin: 1%;
  paddin: 1%;
  border: ${props => props.border};
  border-radius: 5px;
  @media ${device.desktop} {
    height: 45px;
    width: 45px;
    }

`;
