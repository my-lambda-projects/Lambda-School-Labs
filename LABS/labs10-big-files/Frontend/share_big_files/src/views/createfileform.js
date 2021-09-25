import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaPlusCircle, FaRegEnvelope} from "react-icons/fa";
import "filepond/dist/filepond.min.css";
import Alert from 'react-s-alert';
import "./FloatingLabel.css"
import "./ValidationStyle.css"
require('react-s-alert/dist/s-alert-default.css');
require('react-s-alert/dist/s-alert-css-effects/genie.css');
require('react-s-alert/dist/s-alert-css-effects/bouncyflip.css');


const CreateFileForm = () => {
  const [file, setFile] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploadedFileSize, setUploadedFileSize] = useState("");
  const [emailSubject, setEmailSubject] = useState(" ");
  const [message, setMessage] = useState(" ");
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [fileId, setFileId] = useState("");
  const [billing, setBilling] = useState(""); 
  const [sendGridClicked, setSendGridClicked] = useState(false); 
  const [touched, setTouched] = useState({
    fileName: false,
    recipientEmail: false
  })
  const profile = JSON.parse(localStorage.getItem("profile"));
  const senderEmail = profile.email;
  
  
  /* *********************** Functions *********************** */ 
 
  /* -------------Use Effect--------------- */
  useEffect(() => {
    if (url && fileId) {
      sendGrid(sendGridCallBack);
    }
  }, [url, fileId]);

  useEffect(() => {
    if (file && sendGridClicked) {
      submitFile();
    }
  }, [file, sendGridClicked]);

  useEffect(()=> {
    fetchData()
  }, [])
  
  
  /* ------------- Error Handling --------------- */
  const errors = validate(fileName, recipientEmail, uploadedFile);
  const isDisabled = Object.keys(errors).some(x => errors[x]);
  
  function validate(fileName, recipientEmail, uploadedFile) {
    return {
      fileName: fileName.length === 0,
      recipientEmail: recipientEmail.length === 0,
      uploadedFile: uploadedFile.length === 0,
    };
  }

  function handleBlur(field) {
    setTouched({ ...touched, [field]: true })
  };

  function canBeSubmitted() {
    const errors = validate(fileName, recipientEmail, uploadedFile);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  function shouldMarkError(field) {
    const hasError = errors[field];
    const shouldShow = touched[field];
    return hasError ? shouldShow : false;
  };

  function sendGridToggle(e) {
    if (!canBeSubmitted()) {
      e.preventDefault();
      return;
    }
    setSendGridClicked(true);
  };


/* ------------- File Upload --------------- */
// Takes the uploaded file and sets it to state. Also sets setUploadFile to file name
function handleFileUpload(event) {
  if(billing){ if (event.target.files[0].size > 4000000) {
    console.log("Too Large")
    setUploadedFileSize("File's may not exceed 4MB")
  } else {
    setFile(event.target.files);
    setUploadedFile(event.target.files[0].name)
    // if (file === "") {
      //   setFileName(event.target.files[0].name);
      // }
    }
  } else if(event.target.files[0].size > 2000000) {
    console.log("Too Large")
    setUploadedFileSize("File's may not exceed 2MB for basic users")
  } else {
    setFile(event.target.files);
    setUploadedFile(event.target.files[0].name)
    // if (file === "") {
      //   setFileName(event.target.files[0].name);
      // }
    }}



  //Checks if user is pro or not
  const fetchData = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    axios
      .get(`https://api.backendproxy.com/api/users/${profile.nickname}`)
      .then(response => {
        console.log(response);
        setBilling(response.data[0].paid);
      })
      .catch(err => console.log(err));
  };


  function submitThenSend(response, callback) {
    console.log(response);
    callback();
  }

 
 
  function submitFile() {

      const sendObject = {
        fk_email: senderEmail,
        filename: fileName,
        file_size: file[0].size,
        file_type: file[0].type
      };
      
      axios
        .post(`https://api.backendproxy.com/api/s3/files/id`, sendObject)
        .then(response => {
          submitThenSend(response, sendFile);
        })
        .catch(err => console.log(err));
  }


  const sendFile = () => {
    const formData = new FormData();
    formData.append("fileUpload", file[0]);

    if (billing)
    {
    axios
      .put("https://api.backendproxy.com/api/s3/paidfiles/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        setFileId(response.data.rows[0].file_id);
        let urlString = response.data.rows[0].url;
        urlString = urlString.split("/");
        setUrl(urlString[3]);
      })
      .catch(error => console.log(error));
    } else {
      axios
        .put("https://api.backendproxy.com/api/s3/files/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          setFileId(response.data.rows[0].file_id);
          let urlString = response.data.rows[0].url;
          urlString = urlString.split("/");
          setUrl(urlString[3]);
        })
        .catch(error => console.log(error));
    }
  };

  function sendGridCallBack() {
    setTimeout(() => {
      window.location.reload()
    }, 5000);
 
    // console.log('hi')
  }

  function sendGrid(callback) {
    setSendGridClicked(true);

    const uniqueURL = `https://sfiles.netlify.com/download/?email=${recipientEmail}&url=${url}&fileid=${fileId}`;
    console.log('uniqueURL:', uniqueURL)
 
    const myDetails = {
      to: recipientEmail,
      from: senderEmail,
      subject: emailSubject,
      text: message,
      html: message,
      url: uniqueURL
    };
      axios
        .post("https://api.backendproxy.com/api/sendgrid/send", myDetails)
        .then(response => {
            Alert.info(`<h1>${fileName} has successfully been sent to ${recipientEmail}!</h1>`, {
            position: 'top',
            effect: 'genie',
            timeout: 4000,
            offset: 250,
            html: true,
            
          })
     
        })
        .catch(error => {
          console.log("Error! RIGHT HERE", error);
        });
        callback();
  }

  return (
    <CreateEditDiv>
        <AddFileDiv>
            <FlexDiv>
                <FileInput
                  type="file"
                  onChange={handleFileUpload}
                  style={hiddenStyle}
                />
                <FaPlusCircle size={50} color="#ffffff" style={faHover}/>
                <TitleH2>Add Your File</TitleH2>
            </FlexDiv>
            {uploadedFile ? <CustomH3>{uploadedFile}</CustomH3> : <CustomError>{uploadedFileSize}</CustomError>}
        </AddFileDiv>
        <InnerDiv>
            <div className="field">
                <input
                  value={fileName}
                  type="text"
                  id="Filename"
                  name="setFileName"
                  placeholder="MyFamilyPicture.jpg"
                  onChange={e => setFileName(e.target.value)} 
                  onBlur={() => handleBlur("fileName")}
                  className={shouldMarkError("fileName") ? "error" : ""}
                  />
                  <label htmlFor="Filename">Filename</label> 
            </div>

            <div className="field">
                <input
                  type="text"
                  id="Recipient"
                  placeholder="JaneDoe@example.com"
                  onChange={e => setRecipientEmail(e.target.value)} 
                  onBlur={() => handleBlur("recipientEmail")}
                  className={shouldMarkError("recipientEmail") ? "error" : ""}
                  />
                  <label htmlFor="Recipient">Recipient Email</label> 
            </div>
            <div className="field">
                <input
                  type="email"
                  id="subject"
                  placeholder="Family Picture"
                  onChange={e => setEmailSubject(e.target.value)}
                  />
                  <label htmlFor="subject">Email Subject (optional)</label> 
            </div>
            <div className="field">
                <textarea
                  type="text"
                  id="message"
                  placeholder="Here's our most recent family picture."
                  onChange={e => setMessage(e.target.value)}
                  />
                  <label htmlFor="message">Email Message (optional)</label> 
            </div>
        </InnerDiv>
        <BorderDiv />
        <SendGridDiv onClick={sendGridToggle} disabled={isDisabled}>
            <FaRegEnvelope size={40} color="#ffffff" />
                <WhiteBorder></WhiteBorder>
            <SendGridH2>Share Via Email</SendGridH2>
        </SendGridDiv>
        <Alert stack={{limit: 3}} html={true} />
    </CreateEditDiv>
  );
};


export default CreateFileForm;


const hiddenStyle = { 
  height: "7%",
  minHeight: "65px",
  width: "17%",
  display: "block",
  minWidth: "290px",
  position: "absolute",
  opacity: "0",
  cursor: "pointer",
  zIndex: 9999,
};

const faHover = {
  cursor: "pointer",
}

const CreateEditDiv = styled.div` 
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  height: fit-content;
  width: 48%; 
  min-width: 500px
 
  line-height: 3;
  border-radius: 5px;
  background-color: white;
  z-index: 0;
   @media(max-width: 900px){
     width: 90%;
     min-width: 275px;
     margin: 0;
     margin: 0 auto;
   }
  @media(max-width:390px){
    width: 95%;
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;

const TitleH2 = styled.h1`
  display: inline;
  margin: 0;
  height: 100% 
  width: fit-content;
  border-left: 1px solid white;
  margin-left: 2.5%;
  padding-left: 2.5%;
  padding-top: 0;
  font-size: 3rem;
  color: white;
  line-height: 2;
  &:hover{
    cursor: pointer;
`;
 
const SendGridDiv = styled.div`
  width: 220px;
  height: 49px;
  border-radius: 5px;
  margin: 3% auto;
  background-color: #206db5; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

`;

const SendGridH2 = styled.h2`
line-height: 2;
  color: white;
  font-size: 2rem;
  font-style: Raleway
  font-weight: bold;
  margin: 0; 
  padding-left: 2.5%;
  width: fit-content;
  height: fit-content; 
  `;

const AddFileDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  border-bottom: 1px solid black;
  margin: 0 auto;
  align-items: center; 
`;

const CustomH3 = styled.h4`
  margin: 0 auto;
  line-height: 1;
  padding-bottom: 2%
  
  ` 
  const CustomError = styled.h4`
  margin: 0 auto;
  line-height: 1;
  color: red;
  padding-bottom: 2%

` 
const FileInput = styled.input`
  font-size: 1.7rem;
  font-weight: 400;
  border-radius: 5px; 
  display: none;
  height: 100%;
  width: 100%;
`;

const BorderDiv = styled.div`
  height: 2px;
  border-bottom: 1px solid black;
`;

const FlexDiv = styled.div`
  height: fit-content;
  width: fit-content;
  min-width: 270px; 
  display: flex;
  align-items: center; 
  justify-content: center; 
  border-radius: 5px; 
  background-color: #206db5;
  margin: 2.5% auto;
  &:hover{
    cursor: pointer; 
  }
`;

const WhiteBorder = styled.div`
  height:100%;
  width: 1px;
  border-right: 1px solid white;
  padding-left: 3.5%;
`;


