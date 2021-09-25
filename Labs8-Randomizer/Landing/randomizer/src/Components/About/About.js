// Libraries
import React from 'react';
import styled from 'styled-components';


// PNGs
import Mark from '../Img/Smallmark.png';
import Linked from '../Img/linkedin32.png';
import Nick from '../Img/nicksface2.png';
import Sus from '../Img/sus.PNG';
import Emme from '../Img/emme.PNG';
import Ray from '../Img/ray.PNG';

const Homediv = styled.div`
margin-left: 100px;

border: 3px solid #dfece6;
display: flex;
flex-wrap: wrap;
background-color: rgba(255,255,255,.9);
@media (max-width: 400px) {
   border: none;
   background-color: none;
    margin-left: 125px;
    
  }
`

const Port = styled.div`
display: flex;
width: 300px;
height: 300px;
border: none;
border-radius: 50px;
flex-wrap: wrap;
margin-right: 100px;
margin-bottom: 50px;
padding: 5px 5px 5px 5px;

@media (max-width: 400px) {
    width: 145px;
    height: 275px;
    border: 3px solid #dfece6;
  }
`

const Name = styled.h1`
color: #F56600;
@media (max-width: 400px) {
    font-size: 24px;
  }
`
const Git = styled.img`
cursor: pointer;
margin-bottom: 15px;
`
const Linker = styled.img`
cursor: pointer;
`
const Face = styled.img`
width: 175px;
height: 175px;
margin-right: 30px;
border-radius: 50%;
@media (max-width: 400px) {
   width: 100px;
   height: 100px;
  }
`
const Picholder = styled.div`
display: flex;
flex-direction: column;
@media (max-width: 400px) {
    flex-direction: row;
   }
`
const H2 = styled.h1`
margin-left: 100px;
font-size: 44px;
@media (max-width: 400px) {
    font-size: 35px;
     margin-left: 115px;
   }
`

const Title = styled.p`
font-size: 14px;
margin: 0px;
`

class Settings extends React.Component {


      render(){
        return(
            <div style={{backgroundColor: 'rgba(255,255,255,.5)'}}>
                <H2>Developers</H2>
                
               

          <Homediv>
              

              <Port>
                
                  <Name>Nickolaus Smith</Name>
                  <Title>Front End Developer</Title>
                  <Face src={Nick}></Face>
                  <Picholder>
                  <a href="https://github.com/NickolausSmith" target="_blank" rel="noopener noreferrer">
                  <Git src={Mark}></Git>
                  </a>
                  <a href="https://www.linkedin.com/in/nick-smith-9b7254167/" target="_blank" rel="noopener noreferrer">
                  <Linker src={Linked}></Linker>
                  </a>
                  </Picholder>

              </Port>

              <Port>
              
                  <Name>Susanna McDonald</Name>
                  <Title> Database Engineer</Title>
                  <Face src={Sus}></Face>
                    <Picholder>
                  <a href="https://github.com/sulemc" target="_blank" rel="noopener noreferrer">
                  <Git src={Mark}></Git>
                  </a>
                  <a href="https://www.linkedin.com/in/susanna-mcdonald/" target="_blank" rel="noopener noreferrer">
                  <Linker src={Linked}></Linker>
                  </a>
                  </Picholder>
              </Port>

              <Port>
              
                  <Name>Emmeline Aquino</Name>
                  <Title>Full Stack Developer</Title>
                    <Face src={Emme}></Face>
                  <Picholder>
                  <a href="https://github.com/emaquino44" target="_blank" rel="noopener noreferrer">
                  <Git src={Mark}></Git>
                  </a>
                  <a href="https://www.linkedin.com/in/emaquino44/" target="_blank" rel="noopener noreferrer">
                  <Linker src={Linked}></Linker>
                  </a>
                  </Picholder>
              </Port>

              <Port>
              
                  <Name>Raymond Garcia</Name>
                  <Title>Front End Developer</Title>
                  <Face src={Ray}></Face>
                  <Picholder>
                  <a href="https://github.com/Raymondgrc" target="_blank" rel="noopener noreferrer">
                  <Git src={Mark}></Git>
                  </a>
                  <a href="https://www.linkedin.com/in/raymondgarcia1/" target="_blank" rel="noopener noreferrer">
                  <Linker src={Linked}></Linker>
                  </a>
                  </Picholder>
              </Port>
           
            </Homediv>
            </div>
          )
        }
      }
    
    export default Settings;
    