import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactModal from "react-modal";
import { FaFileAlt } from "react-icons/fa";

const SharedBoxHolder = styled.div`
  width: 45%;
  padding: 1% 0;
  min-width: 150px;
  height: fit-content;  
  min-height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: white;
  border-radius: 5px;
 
  padding-top: 15px;
  padding-bottom: 15px;
 
 
  margin: 0 1.5% 3% 1.5%; 
  min-width: 245px;
 
 @media(max-width: 900px){
  width: 47%;
  margin: 0;
  margin-bottom: 8px; 
}
@media(max-width: 590px){
  width: 100%;
  margin: 0;
  margin-bottom: 8px;
}
  @media (max-width: 390px) {
    height: 100%;
    width: 100%;
    height: 10rem;
    margin: 1.5% auto;
    text-align: none;
    min-height: 110px
 
  @media (max-width: 500px) {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    padding: 2% 0;
 
  }
`;

const Sharedh4 = styled.h4` 
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
line-height: 1.5;
padding: 0; 
  margin: 0;
  margin-left: 5%;
  width: auto;
  max-width: 90%;
  height: fit-content;
@media(max-width: 390px){ 
  
`;

const Modalh2 = styled.h2`
overflow: visible;
overflow-wrap: break-word;
white-space: normal;
height: auto;
`;

const Sharedh3 = styled.h3`
height: fit-content; 
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 0; 
  margin: 0;
  margin-left: 5%;
  margin-bottom: 5px;
  width: auto; 
 
max-width: 88%;
&:hover{ 
  overflow: visible;
  overflow-wrap: break-word;
  white-space: normal;
  height: auto;
@media(max-width: 390px){ 
  height: fit-content; 
`;

const DesperateDiv = styled.div`
height: 100%;
width:48%
  display: flex; 
  flex-wrap: wrap; 
  justify-content: space-around; 
  
  @media(max-width: 900px) {
    height: 100%;
    width: 90%; 
    margin: 0 auto;
    margin-top: 40px; 
    justify-content: space-between;
  } 
  @media(max-width: 390px){
  
    margin: 0 auto;
    margin-top: 20px;
    width: 95%;
`;

const HistoryDiv = styled.div`
  margin: 0% 4%;
  padding: 2% 0%;
`;

const InnerTileDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 500px) {
    margin-bottom: 5px;
    padding: 3% 0;
  }
`;

const ButtonDiv = styled.div`
height: fit-content;
width: fit-content; 
align-items: center;
margin-left: 5%;
border-radius: 7px;
border-radius: 5px;
display: flex;
border:1px solid #206db5
background-color: #ffffff;
padding: 0 3.5%
height: 100%;
cursor: pointer;
&:hover {
  background-color: #e6e6e6;
}
`;

 
const HistoryH3 = styled.button`
width: fit-content;
line-height: 0;
margin: 0;
height: 100%;
padding: 10% 0%;
min-width: 114px;
line-height: 1;
border: none;
color: #206db5;
background-color: inherit;
border-left: 1px solid #206db5;
font-size: 1.8rem;
outline:none;
margin-left: 4%;
// @media(max-width: 390px) {
//   width: 55%;
// }
 
`;

const ReturnButtonDiv = styled.div`
display: flex;
justify-content: center;
`;

const ReturnButton = styled.button`
height: 50px;
width: 200px;
border-radius 5px;
border: white;
font-weight: bold;
letter-spacing: .15em;
`;

const TileTextDiv = styled.div`
height: 100%;
width: 100%
margin-bottom: 7px; 
`;

const ViewedDiv = styled.div`
margin-bottom: 20px;
`;

const FileDisplay = () => {
  const [email, setEmail] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState({
    file_id: "999999",
    file_size: "0",
    file_type: "Null",
    filename: "Null",
    fk_email: "Null",
    fk_user_id: "null",
    upload_date: "2019-03-12T19:50:42.104Z",
    url:
      "https://s3lambdafiles123.s3.us-east-2.amazonaws.com/thisone-1552420242334.png"
  });
  const [viewedHistory, setViewedHistory] = useState([{email: "fake@gmail.com", download_date: "2019-03-13T16:41:04.493Z"}]);
  const [loaded, setLoaded] = useState(false);
  const [modalBoolean, setModalBoolean] = useState(false);

  //const [userExists, setUserExists] = useState(null);
  const profile = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {});

  useEffect(()=>{
    console.log(viewedHistory)
  })

  const modalSwitchFunction = (event) => {
    ModalSwitchOn(event, modalSwitch)

  }

  const viewhistoryFunction = (response) =>{
    setViewedHistory(Array.from(response.data));
  }

  const ModalSwitchOn = (event, callback) => {
    // setTargetTile(event.target)

    var target = event.target.getAttribute("value");
    console.log(target);
    var filteredObject = userData.filter(obj => {
      return obj.file_id === target;
    });
    console.log("************************");
    console.log(filteredObject);
    setSelectedFile(filteredObject[0]);
    axios

      .get(`https://api.backendproxy.com/api/downloads/${target}`)
      .then(response => {
        viewhistoryFunction(response)
        callback()
      })
      .catch(err => console.log(err));
 
  };

  const modalSwitch = () => {
    setModalBoolean(!modalBoolean);
  };

  const ModalSwitchOff = event => {
    setModalBoolean(!modalBoolean);
  };

  const fetchData = () => {
    console.log("in fetch data");
    console.log(profile.nickname);

    axios
      .get(`https://api.backendproxy.com/api/users/${profile.nickname}`)
      .then(response => {
        console.log(response);
        //if response from db based on username is zero, user is not in db.
        //conditionalAddUser puts them in db.
        if (Object.keys(response.data).length === 0) {
          conditionalAddUser();
        } else {
          getUserData();
        }
      })
      .catch(err => console.log(err));
  };

  const getUserData = () => {
    const userEmailObject = {
      fk_email: profile.email
    };

    axios
      .post(
        "https://api.backendproxy.com/api/s3/files/fk_email",
        userEmailObject
      )
      .then(response => {
        setUserData(response.data);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const profileEmail = profile.email;
    setEmail(profileEmail);
    console.log("Email on state is: " + email);
    fetchData();
  }, []);

  //Function to add user to database
  const conditionalAddUser = () => {
    console.log("In conditionalAddUser");

    let newUser = {
      username: profile.nickname,
      paid: false,
      email: profile.email
    };

    axios
      .post(`https://api.backendproxy.com/api/users/users`, newUser)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };
  if (!loaded) {
    return <></>;
  }
  if (loaded ) {
    var selectedByteDivider = selectedFile.file_size >= 10000 ? 10000 : 1000;
    var selectedByteType = selectedFile.file_size >= 10000 ? "MB" : "KB";
    return (
      <DesperateDiv>
        <ReactModal
        isOpen={modalBoolean}
        contentLabel="onRequestClose Example"
        onRequestClose={ModalSwitchOff}
        className="modal"
        style={{
          overlay: {
            backgroundColor: "rgb(125, 125,125, 0.8);"
          },
          content: {
            margin: "0 auto",
            marginTop: "20px",
            border: "none",
          }
        }}
      >
        <HistoryDiv>
          <Modalh2>File Name: {selectedFile.filename}</Modalh2>
          <Sharedh4>
            Size:{" "}
            {`${(selectedFile.file_size / selectedByteDivider).toFixed(2)}`}
            {selectedByteType}
          </Sharedh4>
          <Sharedh4>Type: {selectedFile.file_type}</Sharedh4>
          <Sharedh4>Date: {selectedFile.upload_date.slice(0, 10)}</Sharedh4>
          <Sharedh4>Time: {selectedFile.upload_date.slice(11, -5)}</Sharedh4>
          <h3>Total Downloads: {viewedHistory.length} </h3>
          {viewedHistory.map((file, index) => {
            return (
              <ViewedDiv key={index}>

                <h2>Date: {file.download_date.slice(0, 10)} </h2>
                <Sharedh4>Email: {file.email} </Sharedh4>
                <Sharedh4>Time: {file.download_date.slice(11, -5)}</Sharedh4>

              </ViewedDiv>
            );
          })}
          <ReturnButtonDiv>
          <ReturnButton onClick={ModalSwitchOff}>Return</ReturnButton>
          </ReturnButtonDiv>
        </HistoryDiv>
        </ReactModal>
        {userData[0]
          ? userData.map((file, index) => {
              var byteDivider = file.file_size >= 10000 ? 10000 : 1000;
              var byteType = file.file_size >= 10000 ? "MB" : "KB";
              return (
                <SharedBoxHolder key={index}>
                  <InnerTileDiv>
                    <TileTextDiv>
                      <Sharedh3>{file.filename}</Sharedh3>
                      <Sharedh4>
                        Size: {`${(file.file_size / byteDivider).toFixed(2)}`}
                        {byteType}
                      </Sharedh4>
                      <Sharedh4>
                        Date: {file.upload_date.slice(5, 7)}/
                        {file.upload_date.slice(8, 10)}/
                        {file.upload_date.slice(0, 4)}
                      </Sharedh4>
                    </TileTextDiv>
                    <ButtonDiv value={file.file_id} onClick={modalSwitchFunction}>
                      <FaFileAlt
                        size={30}
                        color="#206db5"
                        value={file.file_id}
                        onClick={modalSwitchFunction}
                      />
                      <HistoryH3 value={file.file_id} onClick={modalSwitchFunction}>
                        File History
                      </HistoryH3>
                    </ButtonDiv>
                  </InnerTileDiv>
                </SharedBoxHolder>
              );
            })
          : null}
      </DesperateDiv>
    );
  } 
};
export default FileDisplay;
