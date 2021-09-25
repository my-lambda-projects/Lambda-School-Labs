import React from "react";
import NavHeader from "./navheader";
import LeftMenu from "./leftmenu";
import AddFile from "./addfile";
import styled from "styled-components";
// import Dropdown from "./dropdown";


const AddFilePage = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin: 0 auto;
  // background-image: url("https://images.unsplash.com/photo-1524122209929-5bc27bd9c250?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  background-color: #f5f5f0;
  background-size: cover;
 
  @media (max-width: 390px) {
  }
`;

const MenuFileHolder = styled.div`
  display: flex;
  height: auto;

  @media (max-width: 390px) {
    display: block;
  }
`;

const MobileDiv = styled.div`
display: flex;
align-items: space-between;
justify-content: flex-start
  flex-wrap: wrap;
  margin-top: 5%;
@media(max-width: 390px){
  display: flex;
  flex-wrap: wrap;
}
`;

const AddFileHolder = props => {
  return (
    <AddFilePage>
      {/* <Dropdown logout={props.logout} /> */}
      <NavHeader logout={props.logout} />
      <MenuFileHolder>
        <LeftMenu /> 
        <MobileDiv>
        <AddFile />
        </MobileDiv>
      </MenuFileHolder>
    </AddFilePage>
  );
};
export default AddFileHolder;
