import React from 'react';
import { Card, CardTitle, CardText, Row, Col, CardHeader, CardFooter, CardBody } from 'reactstrap';

const AdminFeedbackCard = (props) => {

    const rating = ["bad", "fair", "great"]

    return (
        <Card>
            <CardHeader>Stylist:{props.stylist}</CardHeader>

            <CardBody>
                <CardTitle>Services:{props.services}</CardTitle>

                <CardText>Consultation Rating:{rating[props.consultaionRating]}</CardText>
                <CardText>Customer Service Rating:{props.customerServiceRating}</CardText>
                <CardText>Time Rating:{props.timeRating}</CardText>
                <CardText>Styling Rating:{props.stylingRating}</CardText>

                <CardText>Overall Rating:{props.overallRating}</CardText>
                <CardText>Overall Feedback:{props.overallFeedback}</CardText>
            </CardBody>
            
            <CardFooter>
                <small className="text-muted">Last updated 3 mins ago</small>
            </CardFooter>
        </Card>
    )
}

export default AdminFeedbackCard;