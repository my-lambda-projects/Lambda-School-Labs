import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import styled from "styled-components";
import { getMatches } from "../store/action";
import { connect } from "react-redux";
import ExplicitBaseCard from "../../../presentation/BLKTestCard";
import api from "../../../api";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col
} from "reactstrap";
const JobCardDeck = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
`;
class MatchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchesModal: false,
      matchSelected: {}
    };
  }

  //Call the GET /matches/ endoint to get all matches from this user:
  componentDidMount() {
    this.props.getMatches();
  }

  //Toggle the Modal
  toggleJobModal = () => {
    this.setState({
      matchesModal: !this.state.matchesModal
    });
  };

  btn1 = () => {
    console.log("btn 1 clicked");
  };
  btn2 = (id, match) => {
    api.endpoints
      .sendEmail({
        match_id: id
      })
      .then(result => {
        toast.success(`You have sent email successfully to ${match.name}`);
      })
      .catch(() => {
        toast.error(`Our email server are down, please try again later`);
      });
  };

  //Handler that will fire each time a job card is clicked
  matchCardClickHandler = (e, match) => {
    // match.preven
    e.preventDefault();
    this.setState({ matchSelected: { ...match } });
    this.toggleJobModal();
    return wrapper => {
      // Set the Selected Job state:
      this.setState({ matchSelected: { ...match } });
      this.toggleJobModal();
    };
  };

  render() {
    //Destructure the state:
    //console.log("state: ", this.state);
    const { matchesModal, matchSelected } = this.state;
    let { matchesRequestSuccess, currentUser, matches } = this.props;

    matches =
      matchesRequestSuccess && currentUser.is_seeker
        ? matches.map(match => ({
            ...match,
            userData: match.job,
            name: match.employer.company_name,
            title: match.job.title,
            photo: match.employer.photo,
            summary: match.employer.summary
          }))
        : matches.map(match => ({
            ...match,
            userData: match.seeker,
            name: `${match.seeker.first_name} ${match.seeker.last_name}`,
            title: match.seeker.desired_title,
            photo: match.seeker.photo,
            summary: match.seeker.summary
          }));

    if (!this.props.matchesRequestSuccess) return <h4>fetching data</h4>;
    return (
      <React.Fragment>
        <JobCardDeck className="card-decks">
          {matches.map(match => (
            <ExplicitBaseCard
              key={match.id}
              id={match.id}
              title={match.title}
              name={`${match.name}`}
              photo={match.photo}
              toggle={e => this.matchCardClickHandler(e, match)}
              btn1Icon={"fas fa-archive"}
              btn1Name={"archived"}
              btn1color={"info"}
              btn4color={"success"}
              btn4Icon={"fas fa-envelope"}
              btn4Name={"email"}
              btn1ClassName={"btn-simple"}
              btn1={this.btn1}
              btn4={e => this.btn2(e, match)}
              btn4ClassName={"btn-simple"}
              width={"300px"}
              is_valid={true}
              is_validbtn4={true}
              btnSizeForAll={"sm"}
              height={"auto"}
            />
          ))}
        </JobCardDeck>
        {matchesModal && (
          <Modal toggle={this.toggleJobModal} isOpen={matchesModal}>
            <ModalHeader toggle={this.toggleJobModal}>Details </ModalHeader>
            <ModalBody>
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={
                          matchSelected.photo ||
                          require("assets/img/anime3.png")
                        }
                      />
                      <h5 className="title">{matchSelected.name}</h5>
                    </a>
                    <p className="description" color="default">
                      {matchSelected.title}
                    </p>
                  </div>
                  <CardText className="card-description">
                    Summary: {matchSelected.summary}
                  </CardText>
                  <CardText className="card-description">
                    Top Skills: {matchSelected.userData.top_skills}
                  </CardText>
                  <CardText className="card-description">
                    Extra Skills: {matchSelected.userData.extra_skills}
                  </CardText>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </ModalBody>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
const MapDispatchToProps = state => ({
  matchesRequestSuccess: state.matches.MATCHES_SUCCESS,
  matches: state.matches.matches,
  currentUser: state.user.currentUser
});
export default connect(
  MapDispatchToProps,
  { getMatches }
)(MatchContainer);
