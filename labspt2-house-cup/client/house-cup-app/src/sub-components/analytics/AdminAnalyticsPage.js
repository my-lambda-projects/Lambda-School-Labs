import React, { Component } from 'react';
import Chart from "react-google-charts";
import Graph from '../Styles/Graphs.js';
import SideMenu from '../SideMenu.js';
import Select from 'react-select';
import auth from '../../utils/Auth.js';
import dummyData from './dummy.js';
import axios from 'axios';

export default class AdminAnalyticsPage extends Component {
  constructor(props) {
    super(props);
     this.state = {
        graphData: dummyData,
        selectedOption: null,
        data: null,
        year: '2019',
        isPaidMember: false                    
      }
  }

 handleChange = (selectedOption) => {
    const year = selectedOption["label"]
    const yearData = this.state.graphData.data[year];
    let limitedData = yearData.slice(0,5);
    console.log(yearData)
    if(this.state.isPaidMember) {
       this.setState({
        selectedOption: selectedOption,
        data: yearData
       })
    } else {
      this.setState({ 
        selectedOption: selectedOption,
        data: limitedData
       });

    }
     console.log(limitedData)
    
    console.log(`Option selected:`, selectedOption["label"]);
  }

  renderGraphs = () => {
    this.setState({
      options: this.state.options,
      data: [...this.state.data]
    })
  }

getMember = () => {
  const {getAccessToken} = auth;
  const headers = {Authorization : `Bearer ${getAccessToken()}`}
  axios.get('http://localhost:5000/users/member', {headers})
        .then( response => {
          console.log(`Response from line 47 member`, response.data.isAdmin);
          if(response.data.isAdmin) {
              this.setState({
                 isPaidMember: true
              })
          }
        })
        .catch(err => {
           console.log(`Error message from analytics page`, err);
        });
}

getHouses = () => {
  const {getAccessToken} = auth;
  const headers = {Authorization : `Bearer ${getAccessToken()}`}
  axios.get('http://localhost:5000/schools/houses/data', {headers})
        .then( response => {
          console.log(response.data);
        })
        .catch(err => {
           console.log(`Error message from analytics page`, err);
        });
}

componentDidMount() {
  this.getMember();
  this.getHouses();
  const length = this.state.graphData.years.length;
  const year = this.state.graphData.years[length-1]
  if(this.state.isPaidMember) {
    this.setState({
      selectedOption: this.state.graphData.years[length-1],
      data: this.state.graphData.data[year.label]
   })
  } else {
    this.setState({
      selectedOption: this.state.graphData.years[length-1],
      data: this.state.graphData.data[year.label].slice(0,5)
   });
  }
  
  window.addEventListener('resize', this.renderGraphs);
  
   
}  

 
 componentUpdate() {
   window.addEventListener('resize', this.renderGraphs);
 }

  render() {
      const { selectedOption } = this.state;
      const length = this.state.graphData.years.length;
      console.log(this.props.isPaidMember)
    return (
      <div className="analytics">
        <SideMenu />
        <div className="graphs">
          <form className="select" onSubmit={this.handleSubmit}>
            <Select value={selectedOption}
              name="selectedOption"
              defaultValue={this.state.graphData.years[length - 1]}
              onChange={(value) => this.handleChange(value)}
              options={this.state.graphData.years} />
          </form>

          <Graph>
            <Chart
              chartType="LineChart"
              data={this.state.data}
              options={this.state.graphData.options}
              loader={<div className='loading'>...Loading Chart</div>}
              className="chart"
              max-width={"100%"}
              height={"480px"}
            />
          </Graph>
        </div>
      </div>
    )
  }
}


