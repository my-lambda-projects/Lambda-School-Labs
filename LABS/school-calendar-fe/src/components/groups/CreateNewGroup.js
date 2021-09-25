import React, { useState, useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
// import { useToasts } from 'react-toast-notifications';


const CreateNewGroup = ({ setShowContacts, setShowCreateNewGroup }) => {

  //needed variables for first axios call, current user object and token from currentUser object
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { adminInfo, setGroupList, width, setNavState } = useContext(Context);

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

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const [newGroup, setNewGroup] = useState({
    groupName: '',
    groupDescription: '',
    groupColor: '',
    groupIcon: '',
    adminId: adminInfo.adminId
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    setNewGroup({
      ...newGroup,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit fired');
    console.log('ADMIN ID: ', adminInfo.adminId);
    if (!newGroup.groupName) {
      setMessage('Please provide a name for your group');
    } else {    
    axiosWithAuth(token)
      .post(`/api/groups/${adminInfo.adminId}`, newGroup)
      .then(async res => {
        await setGroupList([...res.data.groups]);
        if(width < 768){
          setNavState(2);
        } else {
          setShowCreateNewGroup(false);
          setShowContacts(true);
        }
      })
      .catch(err => {
        console.log('ERROR 2: ', err);
      });
    }
  };

  // controls Cancel behavior
  const handleCancel = () => {
    // if desktop view
    if(width >= 768){
      setShowCreateNewGroup(false);
    // if mobile view
    } else {
      setNavState(2);
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <CancelBtn
          onClick={handleCancel}
        >
          Cancel
        </CancelBtn>
        <Header>New Group</Header>
      </HeaderContainer>
      <Form>
        <Label htmlFor="groupName">
          {' '}
          Group Name
          <Input
            type="text"
            placeholder="New Group Name"
            name="groupName"
            value={newGroup.groupName}
            onChange={(e) => handleChange(e)}
          />
        </Label>

        <br />
        <Label>Group color</Label> 
        <ColorsContainer>
          {colorOptions.map(color => {
            if (selectedColor === color) {
              return (
                <ColorOption
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setNewGroup({
                      ...newGroup,
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
                    setNewGroup({
                      ...newGroup,
                      groupColor: color
                    })
                  }}
                  color={`${color}`}
                />
              );
            }
          })}
        </ColorsContainer>
        <Label>Group icon</Label> 
        <IconsContainer>
          {iconOptions.map(icon => {
            if (selectedIcon === icon) {
              return (
                <Icon
                  key={icon}
                  onClick={() => {
                    setSelectedIcon(icon)
                    setNewGroup({
                      ...newGroup,
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
                    setNewGroup({
                      ...newGroup,
                      groupIcon: icon
                    })
                  }}
                  className={icon}
                ></Icon>
              );
            }
          })}
        </IconsContainer>
        <Label htmlFor="groupName">
          {' '}
          Notes
          <Input
            type="text"
            placeholder="Bring uniforms, be ready to WIN!"
            name="groupDescription"
            value={newGroup.groupDescription}
            onChange={(e) => handleChange(e)}
          />
        </Label>
        <SubmitBtn type="submit" label="submit" onClick={handleSubmit}>
          Add members
        </SubmitBtn>
      </Form>
      <p>{message}</p>
    </Container>
  );
};
export default CreateNewGroup;

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
  @media ${device.desktop} {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    
    }

`;

const Header = styled.h1`
  width: 60%;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  @media ${device.desktop} {
    text-align: left;
  }
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

const SubmitBtn = styled.div`
margin: 0.5rem auto;
cursor: pointer;
width: 90%;
color:  #28807d;
font-weight: bold;
border: 2px solid  #28807d;
border-radius: 0.5rem;
text-align: center;
padding: 0.25rem 1rem;
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
  margin: 3% 0;
`;

const Icon = styled.i`
  font-size: 3.5rem;
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  @media ${device.desktop} {
    font-size: 40px;
    }
`;

const ColorOption = styled.div`
  width: 50px;
  height: 50px;
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
