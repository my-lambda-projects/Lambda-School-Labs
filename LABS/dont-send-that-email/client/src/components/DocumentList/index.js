import React, { Component } from "react";
import axios from "axios";
import {
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
  CardColumns,
  Col,
  Container,
  Row,
  Button,
  Input
} from "reactstrap";
import { withRouter } from "react-router-dom";
import Document from "./Document";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

class DocumentList extends Component {
  state = {
    emails: [],
    componentState: 0,
    filterParam: "",
    filteredEmails: [],
    cloningEmail: false,
    loading: true
  };

  componentDidMount = async () => {
    this.fetchEmails();
  };

  fetchEmails = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/emails", {
        withCredentials: true
      })
      .then(({ data }) => {
        const { emails } = data;

        if (emails) {
          this.setState({ emails, cloningEmail: false, loading: false });
        }
      });
  };

  emailElements = () =>
    /* I think we have to check for message ID. If it is already being mapped. Then skip others with the same ID*/
    this.state.filterParam === ""
      ? this.state.emails.map((e, i) => (
          <Document
            key={i}
            email={e}
            param={"buttons"}
            copy={this.copyEmail(e)}
            delete={() => this.deleteEmail(e)}
          />
        ))
      : this.state.filteredEmails.map((e, i) => (
          <Document
            key={i}
            email={e}
            param={null}
            copy={this.copyEmail(e)}
            delete={() => this.deleteEmail(e)}
          />
        ));

  emailCreateButton = param => (
    <Card
      className={param !== "single" ? "documentCard" : null}
      onClick={this.redirectToCreateEmailPage}
      style={{ width: "100%", height: 193 }}
    >
      <CardBody style={{ textAlign: "center" }}>
        <CardTitle style={{ marginTop: 5, marginBottom: 20 }}>
          <h3>Create New E-mail</h3>
        </CardTitle>
        <Button size="lg" color="danger">
          <FontAwesomeIcon icon="plus-circle" size="3x" />
        </Button>
      </CardBody>
    </Card>
  );

  redirectToCreateEmailPage = () => {
    if (this.props.user.subscribed) {
      /*if user is subscribed then they have no limits 
      and can center email create page*/
      this.props.history.push("/email");
    } else if (!this.state.cloningEmail) {
      /*if user not subscribed and are not cloningEmail and 
      length of emails is less than 5 can enter email create page*/
      this.state.emails.length < 5
        ? this.props.history.push("/email")
        : this.setState({ componentState: 1 });
    } else {
      /*else if user is not subscribed and are cloningEmail then the length of emails 
      should be less than 4 to enter email create page*/
      this.state.emails.length < 4
        ? this.props.history.push("/email")
        : this.setState({ componentState: 1 });
    }
  };
  deleteEmail = e => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL + "/emails/"}${e.id}`, {
        withCredentials: true
      })
      .then(res => {
        if (this.state.componentState === 1) {
          this.setState({ componentState: 0 }, () => this.fetchEmails());
        } else {
          this.fetchEmails();
        }
      })
      .catch(err => err);
  };

  copyEmail = ({ title, addressee, text }) => e => {
    if (this.state.cloningEmail === false) {
      //check to see if we're already making a copy before making a copy
      if (this.props.user.subscribed === true || this.state.emails.length < 5) {
        //check to see if the user meets requirements to make a copy
        this.setState({ cloningEmail: true }, () => {
          //if so then the user is making a copy
          text = text || "";
          const version = { text };
          const body = { email: { title, addressee }, version: version };
          axios
            .post(process.env.REACT_APP_BACKEND_URL + "/emails", body, {
              withCredentials: true
            })
            .then(({ data }) => {
              if (data.id) {
                this.fetchEmails(); //once user makes copies we fetch his emails in that function we reset makingCopy to 0
              }
            });
        });
      } else {
        this.setState({ componentState: 1 }); //if user can't make a copy we notifiy him
      }
    }
  };

  resetComponentState = () => {
    this.setState({ componentState: 0 });
  };
  emailCountAlert = () => {
    if (this.state.componentState === 1) {
      return (
        <UncontrolledAlert
          color="danger"
          onClick={() => this.resetComponentState()}
          className="mt-2"
        >
          Free users can only have 5 emails in their dashboard, please clean up
          any unnecessary emails.
        </UncontrolledAlert>
      );
    }
    return null;
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.filterEmails()
    );
  };
  filterEmails = () => {
    //slow function 3n^2 runtime
    let filteredEmails = this.state.emails.slice(); //copy over the emails array
    const filterParam = this.state.filterParam.toLowerCase(); //make filteParam lowercase
    filteredEmails = filteredEmails.filter(
      //filter the copied emails array to find emails with matching terms
      e =>
        e.text.toLowerCase().includes(filterParam) ||
        e.title.toLowerCase().includes(filterParam) ||
        e.addressee.toLowerCase().includes(filterParam)
    );
    return this.setState({ filteredEmails: filteredEmails });
  };
  emailCards = () => {
    if (this.state.emails.length === 0) {
      return (
        <Container fluid className="button-center">
          <div>{this.emailCreateButton("single")}</div>
        </Container>
      );
    }
    if (this.state.filterParam === "") {
      return (
        <Col>
          <CardColumns>
            {this.emailCreateButton()}
            {this.emailElements()}
          </CardColumns>
        </Col>
      );
    } else {
      return (
        <Col>
          <p className="searchText mt-2 mb-2">
            {this.state.filteredEmails.length !== 1 ? (
              `${this.state.filteredEmails
                .length} results for emails containing${" "}
            ${this.state.filterParam}`
            ) : (
              `${this.state.filteredEmails
                .length} result for emails containing${" "}
              ${this.state.filterParam}`
            )}
          </p>
          <Button onClick={() => this.clearFilter()} color="primary mt-2 mb-2">
            Clear Search Filter
          </Button>
          <CardColumns>{this.emailElements()}</CardColumns>
        </Col>
      );
    }
  };
  clearFilter = () => {
    this.setState({ filterParam: "", filteredEmails: [] });
  };
  emailInput = () => {
    if (this.state.emails.length > 0) {
      return (
        <Input
          type="text"
          name="filterParam"
          placeholder="Enter search term"
          value={this.state.filterParam}
          onChange={this.onChangeHandler}
        />
      );
    } else {
      return null;
    }
  };
  render() {
    if (this.state.loading === false) {
      return (
        <Container className="mt-3">
          <Row>
            <Col xs={12}>{this.emailCountAlert()}</Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              {this.emailInput()}
            </Col>
          </Row>
          <Row>{this.emailCards()}</Row>
        </Container>
      );
    } else {
      return <div />;
    }
  }
}
export default withRouter(DocumentList);
