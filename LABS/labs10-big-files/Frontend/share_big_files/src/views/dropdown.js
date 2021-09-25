import React from 'react';
// import SignOut from '../components/signOut';
import history from "../history";
import styled from 'styled-components';

const DropdownDiv = styled.div`
    position: relative;

    border-radius: 10px;
    margin-left: 85%;
    @media(max-width: 768px) {
        // margin-right: 10%;
    }
    @media(max-width: 390px) {
        display: none;
    }
`;
const UnorderedList = styled.div`
list-style-type: none;
margin: 0;
padding: 0;
top:45px;
right:0px;
border-radius: 10px;
width: 200px;
background-color: white;
font-weight:bold;
position: absolute;

box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
`;
const ListItemA = styled.a`
color: #36454f;
text-decoration: none;
border-radius: 10px;
`;
const ListItem = styled.li`

background-color: #fffff0; 

padding: 8px 16px;
border-bottom: 1px solid black;
&:last-child {
    border-bottom: none;
}
&:hover {
    background-color: #e5e5e5;
    color: white;
}
`;

const Button = styled.button`

width:100%; 
height:4.3rem;
background-color: #ff7518;

padding:12px;
border-radius: 10px; 
font-weight:bold;
color:white;
@media(max-width: 768px) {
    text-align: left;
}
&:before {
    content:"";
    position:absolute;
    width:0px; 
    height:0px; 
    border-radius: 10px;
    border: 10px solid;
    border-color: white transparent transparent transparent;
    right:6px;
    top:18px;   
}
`;




class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

signOutHandler() {
    console.log('Sign out handler fired')
    localStorage.clear('accessToken');
    localStorage.clear('expiresAt');
    history.push("/add");
    window.location.reload();
    
    }

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

}

  render() {
    return (
        <DropdownDiv>
         <Button onClick={this.showDropdownMenu}> Navigate To </Button>

          { this.state.displayMenu ? (
          <UnorderedList>
         <ListItem><ListItemA href="/add">Add New</ListItemA></ListItem>
         <ListItem><ListItemA href="/create">Create</ListItemA></ListItem>
         <ListItem><ListItemA href="/billing">Billing</ListItemA></ListItem>
         <ListItem><ListItemA onClick={this.signOutHandler} href="/">Log Out</ListItemA></ListItem>
          </UnorderedList>
        ):
        (
          null
        )
        }

       </DropdownDiv>

    );
  }
}

export default Dropdown;