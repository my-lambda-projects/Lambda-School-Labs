import React from 'react';
import './AdminSchedule.css';
import { Link } from 'react-router-dom'
import AdminNav from '../AdminNav/AdminNav';
import Calendar from 'react-calendar';
import FullCalendar from 'fullcalendar-reactwrapper';
import { Card, CardText, Row, Col, CardHeader, CardFooter, CardBody } from 'reactstrap';

class AdminSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        events:[
                    {
                        title: 'Maria: Hair Cut',
                        start: '2018-08-01T18:00:00'
                    },
                    {
                        title: 'Brenda: Extensions',
                        start: '2018-08-08T11:30:00',
                        end: '2018-08-08'
                    },
                    {
                        title: 'Harmony: Barbering',
                        start: '2018-08-08T13:30:00',
                        end: '2018-08-08'
                    },
                    {
                        title: 'Wyatt: Cut & Color',
                        start: '2018-08-08T15:30:00',
                        end: '2018-08-08'
                    },
                    {
                        title: 'Bianca: Styling',
                        start: '2018-08-08T17:30:00',
                        end: '2018-08-08'
                    },
                    {
                        title: 'Wyatt: Hair Cut',
                        start: '2018-08-08T18:30:00',
                        end: '2018-08-08'
                    },
                    {
                        title: 'Naomi: Barbering',
                        start: '2018-08-08T19:30:00',
                        end: '2018-08-08'
                    },
                    {
                        title: 'Isabella: Cut & Color',
                        start: '2018-08-08T18:30:00',
                        end: '2018-08-08'
                    },
                    {
                        id: 999,
                        title: 'Maria: Extensions',
                        start: '2018-08-09T15:00:00'
                    },
                    {
                        title: 'Naomi: Cut & Color, Extensions ',
                        start: '2018-08-09T09:30:00',
                        end: '2018-08-08'
                    },
                    {
                        id: 999,
                        title: 'Harmony: Color',
                        start: '2018-08-16T16:00:00'
                    },

                    {
                        title: 'Bianca: Barbering',
                        start: '2018-08-11T12:30:00',
                        end: '2018-08-11'
                    },
                    {
                        title: 'Staff Meeting',
                        start: '2018-08-12T10:30:00',
                        end: '2018-08-12T12:30:00'
                    },
                    {
                        title: 'Staff Vacation',
                        start: '2018-08-20T10:30:00',
                        end: '2018-08-23T12:30:00'
                    },
                    {
                        title: 'Isabella: Color',
                        start: '2018-08-13T07:00:00'
                    },
                    {
                        title: 'Wyatt: Extensions',
                        start: '2018-08-28T07:00:00'
                    },
                    {
                        title: 'Naomi: Barbering',
                        start: '2018-08-12T10:30:00',
                        end: '2018-08-12T12:30:00'
                    }

                ],		
        }
      }

        render () {
        return (
            <div className="AdminSchedule">
            <nav className="App-header">
                        <Link className="link signup" to="/" style={{textDecoration: 'none'}}> Home </Link>
                        <Link className="link signup" to="/User/Schedule" style={{textDecoration: 'none'}}> Client </Link>
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Logout </Link>
            </nav>
                    <Row>
                        <Col sm="2">
                            <AdminNav/>
                        </Col>
                        <Col sm="7">
                            <h1 className="ScheduleHeader">Schedule</h1>
                            <div className="AdminCalendar">
                            <FullCalendar
                                id = "your-custom-ID"
                                header = {{
                                    left: 'prev,next today myCustomButton',
                                    center: 'title',
                                    right: 'month,basicWeek,basicDay,list'
                                }}
                                defaultDate={'2018-08-12'}
                                navLinks= {true} // can click day/week names to navigate views
                                editable= {true}
                                eventLimit= {true} // allow "more" link when too many events
                                events = {this.state.events}	
                            />
                            </div>
                        </Col>
                        <Col sm="2">
                        <div className="AppointmentCards">
                                <h3 className="todayA">Today's Appointments</h3>
                                <Card>
                                    <CardHeader>5:30pm</CardHeader>
                                    <CardBody>
                                        <CardText body>Stylist: Bianca <br/> Client: Cindy <br/> Services: Styling, Extensions</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 days ago</small>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>6:30pm</CardHeader>
                                    <CardBody>
                              
                                        <CardText>Stylist: Isabella<br/> Client: Michelle <br/> Services: Cut & Color</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 days ago</small>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>6:30pm</CardHeader>
                                    <CardBody>
                                        <CardText body>Stylist: Wyatt <br/> Client: Brandon <br/> Services: Hair Cut</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 days ago</small>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>7:30pm</CardHeader>
                                    <CardBody>
                                        <CardText>Stylist: Naomi <br/> Client: SaaSha <br/> Services: Barbering</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 2 mins ago</small>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Col>
                    </Row>
            </div>
        )
    }
}

export default AdminSchedule; 

{/*
class AdminSchedule extends React.Component { 

    state = {
        date: new Date(),
      }
    
      onChange = date => this.setState({ date })
    
      render() {
        return (
            <div className="AdminSchedule">
                    <Row>
                        <Col sm="3">
                            <AdminNav/>
                        </Col>
                        <Col sm="7">
                            <h1 className="ScheduleHeader">Schedule</h1>
                            <div className="AdminCalendar">
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                            </div>
                        </Col>
                        <Col sm="2">
                        <div className="AppointmentCards">
                                <Card>
                                    <CardHeader>9:00am</CardHeader>
                                    <CardBody>
                                        <CardText body>Stylist: Ariel <br/> Client: Cindy <br/> Services: Cut and Blow</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>10:00am</CardHeader>
                                    <CardBody>
                              
                                        <CardText>Stylist: Ariel <br/> Client: Cindy <br/> Services: Cut and Blow</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>12:15pm</CardHeader>
                                    <CardBody>
                               
                                        <CardText body>Stylist: Ariel <br/> Client: Cindy <br/> Services: Cut and Blow</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>5:00pm</CardHeader>
                                    <CardBody>
                                        <CardText>Stylist: Ariel <br/> Client: Cindy <br/> Services: Cut and Blow</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Col>
                    </Row>
            </div>
          
        );
      }
    
}

export default AdminSchedule;
*/}