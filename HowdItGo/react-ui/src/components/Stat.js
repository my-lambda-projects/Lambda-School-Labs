import React from 'react';
import LeftNavigation from './LeftNav';
import axios from 'axios';
import './Stat.css';
import {Col, Container, Row} from "reactstrap";

class StatsPage extends React.Component {
  state = {
    customers: []
  };

  async componentDidMount() {
    const sessionCookie = await localStorage.getItem('sessionCookie');
    const email = await localStorage.getItem('email');
    if (!sessionCookie) {
      this.props.history.push('/signup');
      return;
    }
    axios
      .post(`/get-customers`, { email })
      .then(response => {
        const customers = Object.entries(response.data.customers) || [];
        this.setState({ customers: [...customers] });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (

      <div className="page">

          <Container>
              <Row>
                  <Col>
                      <h1>Track Your Reviews</h1>
                      <p>This area will display the customers that you have sent links to, and display if the link has or has not been clicked.</p>
                  </Col>
                  <Col>
          <div className="statBox">
              {this.state.customers.map(customer => {
                  return (
                      <div key={customer[0]}>
                          <div>{`${customer.length-1} ${customer[1].firstName} ${customer[1].lastName} ${
                              customer[1].clickedLink
                                  ? 'clicked your review link!'
                                  : 'has not clicked your review link yet!'
                              }`
                          }


                          </div>


                      </div>
                  );
              })}
          </div>
                  </Col>
              </Row>
          </Container>
      </div>
    );
  }
}

export default StatsPage;
