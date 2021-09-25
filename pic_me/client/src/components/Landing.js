import React, { Component } from 'react';
import {
  Jumbotron,
  Button,
  Container,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardDeck
} from 'reactstrap';
import { Link } from 'react-router-dom';
import cardimg1 from '../static/landing_01.jpg';
import cardimg2 from '../static/landing_02.jpg';
import cardimg3 from '../static/landing_03.jpg';

class Landing extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1 className="display-4">Meet PicMe, another shot for you </h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, a metus ac eros, sodales eget per eget
              amet eu, dapibus dolor commodo magnis. Porttitor eros arcu. Magna
              nunc, amet blandit lacinia orci eget eu quisque, massa egestas
              aliquam pulvinar dui, semper urna nostra facilisis a ultricies,
              libero amet turpis. Velit vel cras in. Porta quam senectus, duis
              quis ultrices felis magna ac, ac ridiculus est massa ligula sint
              donec. Etiam eget at neque. Mauris tristique penatibus placerat
              sed eu sit, turpis porta aut erat ac, sagittis asperiores
              vestibulum magna dolor enim lorem.{' '}
            </p>
            <hr className="my-2" />
            <p>
              <Button
                className="btn-secondary btn-lg"
                outline
                color="secondary"
                tag={Link}
                to="/SignUp"
              >
                {' '}
                Sign Up{' '}
              </Button>{' '}
              <Button
                className="btn-secondary btn-lg"
                outline
                color="secondary"
                tag={Link}
                to="/Login"
              >
                {' '}
                Log In{' '}
              </Button>
            </p>
          </div>
        </Jumbotron>
        <Container>
          <CardDeck>
            <Card className="border-0">
              <CardImg top width="100%" src={cardimg1} alt="Card image cap" />
              <CardBody>
                <CardTitle>Upload pictures and tag others</CardTitle>
                <CardText>
                  Lorem ipsum dolor sit amet, a metus ac eros, sodales eget per
                  eget amet eu, dapibus dolor commodo magnis. Porttitor eros
                  arcu. Magna nunc, amet blandit lacinia orci eget eu quisque,
                  massa egestas aliquam pulvinar dui, semper urna nostra
                  facilisis a ultricies, libero amet turpis.
                </CardText>
              </CardBody>
            </Card>
            <Card className="border-0">
              <CardImg top width="100%" src={cardimg2} alt="Card image cap" />
              <CardBody>
                <CardTitle>They pick their best shots</CardTitle>
                <CardText>
                  Lorem ipsum dolor sit amet, a metus ac eros, sodales eget per
                  eget amet eu, dapibus dolor commodo magnis. Porttitor eros
                  arcu.
                </CardText>
              </CardBody>
            </Card>
            <Card className="border-0">
              <CardImg top width="100%" src={cardimg3} alt="Card image cap" />
              <CardBody>
                <CardTitle>Get paid</CardTitle>
                <CardText>
                  Porttitor eros arcu. Magna nunc, amet blandit lacinia orci
                  eget eu quisque, massa egestas aliquam pulvinar dui, semper
                  urna nostra facilisis a ultricies, libero amet turpis.
                </CardText>
              </CardBody>
            </Card>
          </CardDeck>
        </Container>
      </div>
    );
  }
}
export default Landing;
