import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import FaPlus from 'react-icons/lib/fa/plus';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import FaCircle from 'react-icons/lib/fa/plus-circle';

class ClientList extends Component {
  render() {
    if (this.props.loading) {
      return <div> Loading... </div>;
    } else {
      if (!this.props.paid) {
        this.props.history.push('/dashboard/billing');
      }
      if (this.props.clients.length) {
        return (
          <div>
            <Row>
              <Col>
                <StyledButton
                  onClick={() =>
                    this.props.history.push('/dashboard/clients/new')
                  }
                >
                  Add New Client <StyledIcon />
                </StyledButton>
              </Col>
            </Row>

            <Row>
              {this.props.clients.map((client, i) => {
                return (
                  <ClientCard tag={Link} id={client._id} name={client.name} />
                );
              })}
            </Row>
          </div>
        );
      }
      return <MainDash />;
    }
  }
}

const ClientCard = props => {
  return (
    <Col sm="6" key={props.id}>
      <Link
        to={`/dashboard/clients/${props.id}`}
        style={{ textDecoration: 'none', fontFamily: 'Roboto Mono' }}
      >
        <StyledCard>
          <CardBody>
            <CardTitle>{props.name}</CardTitle>
          </CardBody>
        </StyledCard>
      </Link>
    </Col>
  );
};

const MainDash = props => {
  if (window.localStorage.getItem('UserType') === 'client') {
    return <div>Have a vendor add you as a client to get started.</div>;
  } else {
    return (
      <div>
        <AddText>
          <div>New Client</div>
          <div>
            <StyledLink to="/dashboard/clients/new">
              <FaCircle />
            </StyledLink>
          </div>
        </AddText>
      </div>
    );
  }
};

const StyledButton = styled(Button)`
  display: flex;
  margin: auto;
  justify-content: space-around;
  min-width: 20vw;
  margin-bottom: 2vh;
  background-color: #4c4b63 !important;
`;

const StyledIcon = styled(FaPlus)`
  margin-left: 1vw;
  font-size: 1.2em;
`;

const AddText = styled.div`
  padding-top: 15vh;
  font-size: 4em;
`;

const StyledCard = styled(Card)`
  background-color: white;
  color: #4c4b63;
  margin-bottom: 3vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4c4b63;
`;

const mapStateToProps = state => {
  return {
    clients: state.userReducer.clients,
    loading: state.userReducer.loading,
    paid: state.userReducer.paid,
    userType: state.userReducer.userType
  };
};

export default withRouter(connect(mapStateToProps, null)(ClientList));
