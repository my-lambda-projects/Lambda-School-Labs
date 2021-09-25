import React from "react";
import styled from "styled-components";
import moment from "moment";
import EventEdit from "../event-edit/EventEdit";
import NotificationsModal from "./NotificationsModal";
import axios from 'axios'

const Card = styled.div`
  border: 2px solid lightgrey;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  background: #68659e;
  margin: 28px auto;
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const Header = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-weight: 500;
  width: 100%;
  height: 60px;
  justify-content: center;
  padding-top: 10px;
  display: flex;
`;

const Info = styled.div`
  width: 100%;
  font-size: 15px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;
  color: #ffffff;
  p {
    width: 100%;
    text-align: center;
  }
`;


const StyledButton = styled.button`
  margin: 10px 0px 20px 10px;
  color: white;
  background: #68659e;
  border: 2px solid #ffffff;
  width: 100px;
  height: 25px;
  margin-left: 5px;

  :hover {
    border-color: ${props => props.color};
    color:  ${props => props.color};
    cursor: pointer;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

class EventCard extends React.Component {
  state = { showForm: false, showModal: false };
  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

    declineClick = async e => {
    e.preventDefault();
    const {id} = this.props.eventData;
    let decline = {
      declined: true,
      pendingApproval: false
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/event/edit/${id}`,
        decline
      );
      this.props.loadState(this.props.profile.familyID);
      this.toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Card>
        <Header>EVENT: {this.props.eventData.scheduledEvent_name}</Header>
        <Info>
          <p>
            EVENT START:{" "}
            {moment(this.props.eventData.eventStart, "YYYYMMDD hh:mm a").format(
              "LLLL"
            )}
          </p>
          <p>
            EVENT END:{" "}
            {moment(this.props.eventData.eventEnd, "YYYYMMDD hh:mm a").format(
              "LLLL"
            )}
          </p>
          <p>
            CREATED BY:{" "}
            {
              this.props.family.find(
                person => person.id === this.props.eventData.createdBy
              ).userName
            }
          </p>
        </Info>
        {/* this ternary checks to see if this event card was created by one of the pending events. It also makes sure that the user is an admin. 
        If both of those tests our passed, the buttons will render. If not, the buttons will not display*/}


        <ButtonBox>
          <StyledButton color='#3985ac' onClick={this.toggleForm}>EDIT</StyledButton>

          {this.props.pending ? (
            <>
              {" "}
              <StyledButton
              color='#4ec49d'
                onClick={this.props.approveClick}
                id={this.props.eventData.id}
              >
                APPROVE
              </StyledButton>
              <StyledButton
              color='#f3845a'
                onClick={this.toggleModal}
                id={this.props.eventData.id}
              >
                DECLINE
              </StyledButton>
            </>
          ) : (
            ""
          )}
        </ButtonBox>

        {/* // everything before the colon will load if our tests pass. everything after the colon will load if they don't */}
        {this.state.showModal ? (
          <NotificationsModal
            declineClick={this.declineClick}
            toggleModal={this.toggleModal}
            id={this.props.eventData.id}
          />
        ) : (
          ""
        )}

        {this.state.showForm ? (
          <EventEdit
            pendingEditId={this.props.eventData.id}
            loadGlobal={this.props.loadState}
            pendingEdit={this.props.eventData}
            family={this.props.family}
            toggleForm={this.toggleForm}
            profile={this.props.profile}
          />
        ) : (
          ""
        )}
      </Card>
    );
  }
}
export default EventCard;
