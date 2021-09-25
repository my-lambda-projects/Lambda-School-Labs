import React from 'react';
import axios from 'axios';
import './AdminFeedback.css';
import { Link } from 'react-router-dom'
import AdminFeedbackCard from './AdminFeedbackCard';
import AdminNav from '../AdminNav/AdminNav';
import { Card, CardTitle, CardText, Row, Col, CardDeck, CardHeader, CardFooter, CardBody } from 'reactstrap';

class AdminFeedback extends React.Component {


    
    state = {
        feedbackCards: [],

        stylist:"",
        service:"",

        consultationRating:"",
        customerServiceRating:"",
        timeRating:"",
        stylingRating:"",
        
        overallRating:"",
        overallFeedback:""
    }

    
    componentDidMount() {
        this.getFeedbackCards();
    }

    getFeedbackCards() {
        axios
            .get('https://john-cs8-hairschool.herokuapp.com/hairschool/user/feedbacks')
            .then(response => response.data)
            .then( feedbackCards => { this.setState({feedbackCards}) } )
            .catch(error => {console.error(`Server Error: ${error}`) } );
    }

    deleteFeedbackCard(id) {
        console.log(id)
        axios
            .delete(`https://john-cs8-hairschool.herokuapp.com/hairschool/user/feedbacks/${id}`)
            .then( () => { this.getFeedbackCard(); } );
    }
   

   
    render () {
        return (
            <div className="AdminFeedback">
            <nav className="App-header">
                        <Link className="link signup" to="/" style={{textDecoration: 'none'}}> Home </Link>
                        <Link className="link signup" to="/User/Feedback" style={{textDecoration: 'none'}}> Client </Link>
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Logout </Link>
            </nav>
             <Row>
                <Col sm="2">
                    <AdminNav/>
                </Col>
                <Col sm="9">
                    <h1 className="ScheduleHeader">Client Feedback</h1>
                    <div className="Cards">
                     <Row>

                        <CardDeck>
                            {this.state.feedbackCards.map((feedbackCard) => {
                                return <AdminFeedbackCard 
                                    deleteFeedbackCard={this.deleteFeedbackCard} 
                                    id={feedbackCard.id}
                                    stylist={feedbackCard.stylist}
                                    service={feedbackCard.service}
                                    consultationRating={feedbackCard.consultationRating}
                                    consultationFeedback={feedbackCard.consultationFeedback}
                                    customerServiceRating={feedbackCard.customerServiceRating}
                                    customerServiceFeedback={feedbackCard.customerServiceFeedback}
                                    timeRating={feedbackCard.timeRating}
                                    timeFeedback={feedbackCard.timeFeedback}
                                    stylingRating={feedbackCard.stylingRating}
                                    stylingFeedback={feedbackCard.stylingFeedback}
                                    overallRating={feedbackCard.overallRating}
                                    overallFeedback={feedbackCard.overallFeedback}
                                    key={feedbackCard.id}
                                    />
                            })}

                            <Card>
                                    <CardHeader>Client: SaaSha </CardHeader>
                                    <CardBody>
                                        <CardText> Stylist: Naomi </CardText>
                                        <CardText> Services: Cut & Color, Extensions</CardText>
                                        <CardText> Styling Rating: 4</CardText>
                                        <CardText> Consultation Rating: 3</CardText>
                                        <CardText> Customer Service Rating: 5</CardText>
                                        <CardText> Punctuality Rating: 3</CardText>
                                        <CardText> Overall Rating: 4</CardText>
                                        <CardText> Overall Feedback: "Naomi was a great Stylist, Excellent Customer Service!" </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Posted 2min ago</small>
                                    </CardFooter>
                            </Card>
                            <Card>
                                    <CardHeader>Client: Cindy</CardHeader>
                                    <CardBody>
                                        <CardText> Stylist: Wyatt </CardText>
                                        <CardText> Services: Hair Cut</CardText>
                                        <CardText> Styling Rating: 5</CardText>
                                        <CardText> Consultation Rating: 4</CardText>
                                        <CardText> Customer Service Rating: 5</CardText>
                                        <CardText> Punctuality Rating: 3</CardText>
                                        <CardText> Overall Rating: 5</CardText>
                                        <CardText> Overall Feedback: "Wyatt was a Awesome!, I'll definitely be back!" </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Posted 2 days ago</small>
                                    </CardFooter>
                            </Card>
                        </CardDeck>
                     </Row>
                    </div> {/* Cards */}

                </Col>                    
             </Row>
            </div>
        )
    }
}

export default AdminFeedback;