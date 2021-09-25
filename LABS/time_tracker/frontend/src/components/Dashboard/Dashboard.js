import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserInfo, logOut } from '../../store/action/userActions';

// Components
import CreateClient from '../CreateClient/CreateClient';
import Settings from '../Settings/Settings';
import ClientList from '../ClientList/ClientList';
import VendorClientPage from '../VendorClientPage/VendorClientPage';
import TimestampDetail from '../TimestampDetail/TimestampDetail';
import Invoice from '../Invoice/Invoice';
import NewInvoice from '../NewInvoice/NewInvoice';
import Subscription from '../Subscription/Subscription';
import HOCAuth from '../HOC/HOCAuth';
import TopBar from '../TopBar/TopBar';

class Dashboard extends Component {
  state = {
    user: '',
    name: '',
    email: '',
    clients: [],
    hoursLogged: [],
    invoices: [],
    userType: ''
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getUserInfo(this.props.user, this.props.userType);
    }
  }

  render() {
    return (
      <div>
        <TopBar />

        <Main>
          <Col md="2">
            <StyledMenu>
              {this.props.userType === 'client' ? (
                <StyledDiv>
                  <StyledLink to="/dashboard/clients">Vendors</StyledLink>
                </StyledDiv>
              ) : (
                <StyledDiv>
                  <StyledLink to="/dashboard/clients">Clients</StyledLink>
                </StyledDiv>
              )}
              {this.props.userType === 'client' ? null : (
                <StyledDiv>
                  <StyledLink to="/dashboard/billing">Billing</StyledLink>
                </StyledDiv>
              )}
              <StyledDiv>
                <StyledLink to="/dashboard/settings">Settings</StyledLink>
              </StyledDiv>
              <StyledDiv>
                <StyledLink to="/dashboard/clients/invoices">
                  Invoices
                </StyledLink>
              </StyledDiv>
            </StyledMenu>
          </Col>
          <Col>
            <Switch>
              <Route
                path={'/dashboard/clients/invoices/new'}
                component={NewInvoice}
              />
              <Route path={'/dashboard/clients/invoices'} component={Invoice} />
              <Route
                path={'/dashboard/clients/timestamp/:id'}
                component={TimestampDetail}
              />
              <Route path={'/dashboard/clients/new'} component={CreateClient} />
              <Route
                path={'/dashboard/clients/:id'}
                component={VendorClientPage}
              />

              <Route path={'/dashboard/billing'} component={Subscription} />

              <Route
                path={'/dashboard/clients'}
                component={HOCAuth(ClientList)}
              />

              <Route path={'/dashboard/settings'} component={Settings} />
              <Route
                exact
                path={'/dashboard'}
                render={() => <Redirect to="/dashboard/clients" />}
              />
              <Route
                path={''}
                render={() => <Redirect to="/dashboard/clients" />}
              />
            </Switch>
          </Col>
        </Main>
      </div>
    );
  }
}

const StyledMenu = styled.div`
  border: 1px black;
  border-color: none;
  margin-top: 53px;
  background-color: rgb(208, 207, 207, 0.25) !important;
  @media (min-width: 768px) {
    min-height: 60vh;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none !important;
  color: #4c4b63;
  margin-top: 5px;
`;

const Main = styled(Row)`
  min-height: 100vh;
  padding-top: 35px;
  background-color: rgb(208, 207, 207, 0.25) !important;
`;

const StyledDiv = styled.div`
  margin-top: 20px;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    name: state.userReducer.name,
    email: state.userReducer.email,
    clients: state.userReducer.clients,
    hoursLogged: state.userReducer.hoursLogged,
    invoices: state.userReducer.invoices,
    userType: state.userReducer.userType
  };
};

export default withRouter(
  connect(mapStateToProps, { getUserInfo, logOut })(Dashboard)
);
