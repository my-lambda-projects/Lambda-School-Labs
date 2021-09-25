import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { Well, Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';
import { Header, AddJob, AddList, EditJob, DeleteList } from '../components/AllComponents';
import ROOT_URL from './config';

class Jobs extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lists: [],
    };
  }

  getAllLists = () => {
    const token = localStorage.getItem('token');
    axios
    .get(`${ROOT_URL}/jobslist`, 
    { headers: { "Authorization": token }},
    )
    .then(lists => {
      const newList = lists.data
      this.setState({lists: newList});
    })
    .catch(err => console.log(err));
  }

  getAllJobs = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`${ROOT_URL}/jobs`, { headers: { "Authorization": token }})
      .then(jobs => {
        jobs = jobs.data;
        console.log('reaches inside getAllJobs', jobs);
        const newList = this.state.lists;
        newList.forEach(list => list.jobs = [])
        jobs.forEach(job => {
          for (let i = 0; i < newList.length; i++) {
            if (newList[i].status === job.status) {
              newList[i].jobs.push(job);
              break;
            }
          }
        });
        this.setState({ lists: newList });
      })
      .catch(() => {
        console.log('Error retrieving all the jobs');
      });
  }
  
  componentDidMount() {
    this.getAllLists(); 
    this.getAllJobs(); 
  }

  onDragOver = (e) => e.preventDefault();

  onDragStart = (e, id) => {
    console.log('dragstart:', id);
    e.dataTransfer.setData('id', id);
  }

  onDrop = (e, status) => {
    const _id = e.dataTransfer.getData('id');
    console.log('ondrop status, _id', status, _id);
    axios
      .put(`${ROOT_URL}/updateStatus`, { _id, status })
      .then((job) => {
        console.log('job received is', job);
        this.getAllJobs()
      })
      .catch(err => console.log('error sending updateStatus put to server', err ));
  }

  render() {
    return (
      <div className="parent">
        {console.log('state.list in DraggableJobs', this.state.lists)}
        <Header />
        <Grid className="board__container">
          <Well className="jobs-well">
          <PageHeader className="board__header">Jobs List</PageHeader>
              <Row className="board__row">
              {this.state.lists.map(list => (
                <Col key={list.id} xs={6} md={4} >
                  <div 
                    className="droppable list"
                    name={list.status}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, list.status)}>
                    <Panel className="list">
                      <Panel.Heading className="list__heading">
                        <Panel.Title componentClass="h3">{list.status}</Panel.Title>
                        <DeleteList 
                          lists={this.state.lists} 
                          id={list.id} 
                          getAllJobs={this.getAllJobs} 
                          getAllLists={this.getAllLists}/>
                      </Panel.Heading>
                      <Panel.Body>
                        <AddJob lists={this.state.lists} currentStatus={list.status} getAllJobs={this.getAllJobs}/>
                        {list.jobs.map(job => {
                            return (
                              <div 
                                className='draggable'
                                draggable
                                onDragStart={(e) => this.onDragStart(e, job._id)}>
                                  <EditJob     
                                    lists={this.state.lists} 
                                    key={shortid.generate()} 
                                    job={job} 
                                    getAllJobs={this.getAllJobs}/>
                              </div>
                            )
                        })}
                      </Panel.Body>
                    </Panel>
                  </div>
                </Col>
              ))}
            </Row>
            <Row>
              <div className="addlist__btn--container">
                <AddList lists={this.state.lists} getAllJobs={this.getAllJobs} getAllLists={this.getAllLists}/>
              </div>
            </Row>
          </Well>
        </Grid>
      </div>
    );
  }
}

export default Jobs;
