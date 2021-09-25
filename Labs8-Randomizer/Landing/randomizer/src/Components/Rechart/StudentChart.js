// Libraries
import React from 'react';
import styled from 'styled-components';
import {  PieChart, Pie,  Cell} from 'recharts';


// Variables
const StudentChart= props => {  
const data = [{ value: parseInt(props.P) }, { value: parseInt(props.NP)},];
const COLORS = [ '#0ee77b','#ec1111', '#FFBB28', '#FF8042'];

// Stylings
const Homediv = styled.div`
margin-right: 30px;
background-color: none;
display: flex;
justify-content: center;
flex-wrap: wrap;
border-radius: 4px;
align-items: center;
`

     return  (
         <Homediv>
        <PieChart width={215} height={300}>
        <Pie
        dataKey={null}
          data={data} 
          cx={120} 
          cy={200} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          paddingAngle={5}
        >
        	{
          	data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
   
      </PieChart>
      </Homediv>
     )
 }
 export default StudentChart