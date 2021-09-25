// Libraries
import React, {Component} from 'react';
import { YAxis, XAxis, CartesianGrid, BarChart,  Bar, Tooltip, ResponsiveContainer, Text} from 'recharts';
import styled from 'styled-components';
import axios from 'axios'

// Stylings
const Outerdiv = styled.div`
display: flex;
height: 100%;
width: 100%;`

const Graphbox = styled.div`
text-decoration: none;
background: none;
padding-top: 10px;
width: 800px;
height: 390px;
display: flex;
flex-direction: column;
margin-bottom: 20px;
outline: 0;
font-family:'Raleway', sans-serif;
border: 3px solid grey;
border-radius: 4px;

@media (max-width: 850px) {
width: 500px;
}

@media (max-width: 400px) {
  width: 75%;
  margin-left: 14%;
  
  }
`
const Buttonholder = styled.div`
width: 400px;
height: 125px;
flex-direction: row;
margin-left: 75px;
@media (max-width: 600px) {
 width:  250px;
 margin-left: 50px;
  }
`

const Graphbutton = styled.button`
text-decoration: none;
background-color: #72CBD3;
height: 40px;
width: 100px;
font-family:'Raleway', sans-serif;
font-size: 12px;
border: 1px solid grey;
margin-left: 5px;
margin-right: 5px;
margin-bottom: 5px;
margin-top: 0px;
cursor: pointer;
transition: .3s;
color: black;
padding: 5px 5px;
:hover {
  color: white;
}

@media (max-width: 600px) {
  font-size: 10px;
  width: 75px;
  height: 40px;
  }
`

const Title = styled.h1`
height: 50px;
margin-top: 0px;
margin-bottom: 0px;
padding-left: 75px;

@media (max-width: 600px) {
  font-size: 14px;
  }
`

const Students = styled.h1`
height: 50px;
margin-top: 0px;
margin-bottom: 0px;
font-size: 24px;
padding-left: 75px;

@media (max-width: 600px) {
  font-size: 14px;
  }
`
const Perc = styled.h1`
height: 50px;
margin-top: 0px;
margin-bottom: 0px;
font-size: 18px;
padding-left: 75px;

@media (max-width: 600px) {
  font-size: 14px;
  }
`
 class Chartprop extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataBox: [],
      part: 0,
      total: 0,
      percentage: 0,
      cl: this.props.Data['className'],
      number: this.props.Data['studentsInfo'].length,
      id:this.props.Data['classID'],
      isHidden: true
    }
  }



    dataList = () => {
      

      if (this.props.Data === undefined || this.props.Data['studentsInfo'].length===0) {
        return
      }
      else{
        
      let students = this.props.Data['studentsInfo']
    students.map( (one, index )=> {
      let obj = {
        name: `${one['studentName']}`,
        Participated: one['participation']['P'],
        Declined: one['participation']['NP'],
      }
      this.state.dataBox.push(obj)
      this.state.total = this.state.total + one['participation']['P'] + one['participation']['NP']
      this.state.part = this.state.part + one['participation']['P']
      this.state.percentage = Math.round((this.state.part/this.state.total) * 100)
      })
      if (this.state.total === 0){
        this.setState({isHidden: false},()=>{
          return
        })
      }
      else{
        return this.state.dataBox;
        }
      }
    }


    routeToRandom = (e) => {
      e.preventDefault()
      localStorage.setItem('classID', this.state.id)
      this.props.history.push('/Random')
    }

    deleteClass = (e) => {
      e.preventDefault()
     
      axios.delete('https://labs8randomizer.herokuapp.com/clss/deleteclass', {data: {'classID': this.state.id}})
      .then (res =>{
       
        window.location.reload()}

      )
    }

    routeToEdit = (e) => {
      e.preventDefault()
      localStorage.setItem('classID', this.state.id)
      this.props.history.push('/Class')
    }



          render() {
     return  (

        <Outerdiv>

      <Graphbox>  

        { this.state.isHidden &&
<ResponsiveContainer width="80%" height="50%" >
<BarChart style={{cursor: 'pointer'}}  height={200} data={this.dataList()}
  margin={{top: 5, right: 5, left: 5, bottom: 5}} title={this.state.cl}>
  <XAxis hide="true" width={50} dataKey="name"/>

  <YAxis style={{cursor: 'pointer'}} />
  <CartesianGrid  style={{cursor: 'pointer'}} />
  <Tooltip style={{cursor: 'pointer'}}/>
 <Text scaleToFit="true"/>
  <Bar barSize={25} stackId="a"dataKey="Participated" fill="Green"  style={{cursor: 'pointer'}} />
  <Bar  stackId="a"dataKey="Declined" fill="Red" style={{cursor: 'pointer'}} />
</BarChart>
</ResponsiveContainer>
}
<Title>{this.state.cl}</Title>
<Students>Students Enrolled: {this.state.number}</Students>
<Perc> Class Participation Percentage: {this.state.percentage}% </Perc>
<Buttonholder>
<Graphbutton onClick={this.routeToRandom}>Randomizer </Graphbutton>
<Graphbutton onClick={this.deleteClass}>Delete Class</Graphbutton>
<Graphbutton onClick={this.routeToEdit}>Edit Class </Graphbutton>
</Buttonholder>
</Graphbox> 

    </Outerdiv>
     )
          }
 }
 export default Chartprop;
