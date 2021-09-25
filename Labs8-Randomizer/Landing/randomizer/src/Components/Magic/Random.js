// Libraries
import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { withAlert } from "react-alert";

// Components
import StudentChart from '../Rechart/StudentChart';

// Stylings
const Maindiv = styled.div`
background-color: rgba(255,255,255,.9);
display: flex;
width: 600px;
height: 500px;
padding-left: 15px;
border-radius: 7px;
border: 3px solid #dfece6;
flex-direction: column;

@media (max-width: 400px) {
  width: 100%;
  margin-left: 20%;
  height: 510px;
  margin-top: 0px;
}
`
const Namediv = styled.div`
display: flex;
width: 600px;
height: 150px;
margin-top: 15px;
justify-content: center;

@media (max-width: 400px) {
  width: 100%;
  margin-top: 35px;
}
`
const Orangediv = styled.div`
display: flex;
width: 580px;
height: 80px;
margin-top: 0px;
justify-content: space-between;

@media (max-width: 400px) {
  width: 100%;
  flex-wrap: wrap;
}
`
const Buttonholder = styled.div`
width: 200px;
display: flex;
height: 75px;

@media (max-width: 400px) {
  width: 100%;
}
`
const Chartdiv = styled.div`
display: flex;
width: 400px;
height: 200px;
position: absolute;
margin-top: 115px;
margin-left: 75px;

@media (max-width: 400px) {
margin-left: 0px;
width: 200px;
}
`
const Buttondiv = styled.div`
display: flex;
width: 600px;
height: 75px;
z-index: +1;
align-items: center;
justify-content: space-between;
margin-top: 125px;

@media (max-width: 400px) {
  width: 100%;
  flex-wrap: wrap;
  margin-top: 95px;
}
`

const Misc = styled.h1`

font-size: 40px;
margin-right: 25px;
margin-top: 20px;

@media (max-width: 400px) {
  margin-bottom: 0px;
  margin-top: 0px;
  padding-top: 10px;
  font-size: 24px;
}
`
const Part = styled.button`
outline: 0;
font-size: 20px;
width: 150px;
height: 40px;
text-decoration: none;
cursor: pointer;
color:black;
background-color: #4caf50;
border: none;
transition: .5s;
:hover {
   color: white;
}

@media (max-width: 400px) {
  font-size: 14px;
  margin-left: 25px;
  margin-bottom: 5px;
}
`
const Dec = styled.button`
outline: 0;
font-size: 20px;
border: none;
width: 150px;
height: 40px;
text-decoration: none;
cursor: pointer;
color: black;
background-color: #E91E63;
transition: .5s;
margin-right: 15px;
:hover {
  color: white
}

@media (max-width: 400px) {
 font-size: 14px;
 margin-left: 25px;
 margin-top: 5px;
}
`
const Edit = styled.button`
border: none;
width: 120px;
height: 36px;
text-decoration: none;
cursor: pointer;
color: black;
background-color: #F7947B;
transition: .5s;
z-index: +1;
margin-right: 10px;
margin-top: 25px;
:hover {
  color: white;
}

@media (max-width: 400px) {
  margin-top: 10px;
  width: 75px;
  margin-right: 50px;
 }
`

const Reset = styled.button`
margin-top: 5px;
border: none;
width: 120px;
height: 36px;
text-decoration: none;
cursor: pointer;
color: black;
background-color: #F7947B;
transition: .5s;
z-index: +1;
margin-top: 25px;
:hover {
  color: white
}

@media (max-width: 400px) {
  width: 75px;
  margin-top: 10px;
 }
`
const Bigbutton = styled.button`
width: 250px;
height: 75px;
text-decoration: none;
cursor: pointer;
border: none;
background-color:#00E1F5;
color: black;
font-size: 36px;
:hover {
  color: white;
}

@media (max-width: 400px) {
  width: 200px;
  font-size: 18px;
  height: 50px;
}
`
const Ptag = styled.p`
font-size: 16px;
color: #737373;
position: absolute;
margin-top: 150px;
margin-left: 75px;
`
const Ptag2 = styled.p`
font-size: 16px;
color: #737373;
position: absolute;
margin-top: 50px;
margin-left: 15px;
`
class Magic extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state={
        studentnamearray: [],
        classinfo: "Class",
        Student: 'Student',
        PartRates: [],
        P: 0,
        NP: 0
    }
  }

    componentDidMount() {
      if (localStorage.getItem("classID")=== null) {
        this.props.alert.error('choose a class!')
        this.props.history.push('/ViewClasses')
        
      }
      else{
        if (localStorage.getItem("studentID")) {
          localStorage.removeItem("studentID")
        }
        this.handleClass()
      }
    }

    handleClass = e => {
      if (localStorage.getItem("studentID")) {
        localStorage.removeItem("studentID")
      }
        let id= localStorage.getItem('classID')
        axios
          .post('https://labs8randomizer.herokuapp.com/clss/list_students', {"classID":id})

          .then(res => {
            let data = res.data
            
            var newarray = data['studentNames']
            if (newarray.length === 0){
              this.props.alert.error('No students in Class, Add a Student')
              setTimeout(this.props.history.push('/Class'),2000)
              return
            }

            newarray.map(name => {
            this.state.studentnamearray.push(name)
            this.setState({studentnamearray :this.state.studentnamearray})
            })
            this.setState({classinfo: data['class_name']})
            
          })
          .catch(err => {
          });
      };
      handleParticipationGraph = e => {
        this.setState({P:0, NP:0})
        let valid = localStorage.getItem('studentID')

        axios
          .post('https://labs8randomizer.herokuapp.com/clss/participation_list', {'studentID': valid})

          .then(res => {
            var myobj2 = res.data
           
            this.setState({ PartRates: Object.values(myobj2)})
     
            let P = 0;
            let NP = 0;
            this.state.PartRates.map((pnp, index) => {
              P += pnp['P'];
              NP +=pnp['NP'];

            })
            if (P === 0 && NP === 0){
              let p =  document.getElementById('ptag')
              
              p.style.visibility = "visible"
            }
            else {
            this.setState({P: P, NP: NP})
            
          }
            
          })

          .catch(err => {

          });
      };

      Participatehandler = e => {
       
        axios
          .post('https://labs8randomizer.herokuapp.com/clss/participate',  {
            "studentID": localStorage.getItem("studentID"),
          "particpated":'True',
          } )

          .then(res => {
            let p2 =  document.getElementById('ptag')
            if (p2.style.visibility === "visible"){
            p2.style.visibility = "hidden"}
            let p = this.state.P +1
        this.setState({P:p})
          }
            )
          .catch(err => {

          });
          
      };

      Declinehandler = e => {
        
        axios
          .post('https://labs8randomizer.herokuapp.com/clss/participate',  {
            "studentID": localStorage.getItem("studentID"),
          "particpated":'False',
          } )

          .then(res => {
            let p =  document.getElementById('ptag')
            if (p.style.visibility === "visible"){
            p.style.visibility = "hidden"}
            let np = this.state.NP +1
            this.setState({NP:np})

          })

          .catch(err => {

          });
          
      };

 Shufflehandler =() => {
  if (this.state.studentnamearray.length === 0){
    this.props.alert.show("All students have gone, Resetting Class")
    let a = document.getElementById('ptag2')
    a.style.visibility = 'hidden'
    this.setState({
      studentnamearray: [],
        Student: 'Student',
        PartRates: [],
        P: 0,
        NP: 0
    },()=>{
      this.handleClass()
      let a = document.getElementById('ptag')
         a.style.visibility = 'hidden'
    })
     setTimeout(this.props.history.push('/Random'), 1000)
    return
  }
    if (localStorage.getItem("studentID")) {
      localStorage.removeItem("studentID")
  }
    

    let p =  document.getElementById('ptag')
    p.style.visibility = "hidden"
    const randomnum = Math.floor(Math.random() * this.state.studentnamearray.length);
    this.setState({Student: this.state.studentnamearray[randomnum]['fullName']})
    localStorage.setItem('studentID', this.state.studentnamearray[randomnum]['studentID'].toString());
     this.handleParticipationGraph();
     this.state.studentnamearray.splice(randomnum,1)
     this.setState({studentnamearray: this.state.studentnamearray}, ()=>{
       if (this.state.studentnamearray.length === 0){
         let a = document.getElementById('ptag2')
         a.style.visibility = 'visible'
       }
     })
 }



 Edithandler = () => {
    localStorage.removeItem('studentID');
    this.props.history.push('/Class')
 }

 Resethandler = () => {
    localStorage.removeItem('studentID');
    window.location.reload()
 }
  render() {

      return (
        <React.Fragment>
        <Maindiv>
        
        <Orangediv>
        <Misc>{this.state.classinfo}</Misc>
          <Buttonholder>
        <Edit onClick={this.Edithandler}>Edit Class</Edit>
                  <Reset onClick={this.Resethandler}>Reset 'All Go'</Reset>  
          </Buttonholder>
          </Orangediv>
        
         
          
            <Namediv>
                  <Misc>{this.state.Student}</Misc>   
            </Namediv>

            
                  <Buttondiv>
                  <Part onClick={this.Participatehandler}>Participated</Part>
                  <Bigbutton onClick={this.Shufflehandler}>Randomize!</Bigbutton>
                  
                  <Dec onClick={this.Declinehandler}>Declined</Dec>
            </Buttondiv>  
            

            
            </Maindiv>
            <Chartdiv id="Chart" >
            <StudentChart style={{marginTop:'0px'}}  P={this.state.P}  NP={this.state.NP}/>
            <Ptag2 id="ptag" style={{visibility:'hidden'}}>No student participation data</Ptag2>
            <Ptag id="ptag2" style={{visibility:'hidden'}}>Last Student</Ptag>
            </Chartdiv>
            </React.Fragment>
      )
  }
}
export default withAlert(Magic);