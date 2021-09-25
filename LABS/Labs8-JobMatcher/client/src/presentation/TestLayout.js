import React from "react";
import ExplicitBaseCard from "./BaseCard";
import styled from "styled-components";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

const MatchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
`;

class BrowseSeekerContainer extends React.Component {
  // let user = props.currentUser;
  state = {
    is_open: false,
    is_modal: false
  };

  toggleJobModal = () => {
    console.log("toggleJobModal  clicked");
    this.setState({
      is_modal: !this.state.is_modal
    });
  };

  showFullCard = e => {
    this.setState({
      is_open: !this.state.is_open
    });
  };
  btn1 = () => {
    console.log("btn 1 clicked");
  };
  btn2 = () => {
    console.log("btn 2 clicked");
  };
  btn3 = () => {
    console.log("btn 3 clicked");
  };
  render() {
    let cards = new Array(8).fill().map((i, index) => (
      <ExplicitBaseCard
        key={index}
        // fullCardArrow={this.showFullCard}
        toggle={this.toggleJobModal}
        is_seeker={false}
        is_open={this.state.is_open}
        // is_expandable={true}
        education={"education"}
        experience={"experience"}
        title={"seeker desire title"}
        // summary={"seeker summary"}
        // skills={"seeker skills"}
        name={"seeker name"}
        btn1Text={"skip"}
        btn2Text={"super"}
        // btn3Text={"app"}
        btn1={this.btn1}
        btn2={this.btn2}
        // btn3={this.btn3}
        width="300px"
        photo={"https://image.flaticon.com/icons/svg/52/52762.svg"}
      />
    ));

    return (
      <MatchContainer>
        {cards}
        <Modal isOpen={this.state.is_modal} toggle={this.toggleJobModal}>
          <ModalHeader toggle={this.toggleJobModal}>Add / Edit Job</ModalHeader>
          <ModalBody>
            <ExplicitBaseCard
              is_seeker={false}
              title={"seeker desire title"}
              name={"seeker name"}
              btn1Text={"Archive"}
              btn2Text={"Email"}
              btn1={this.btn1}
              btn2={this.btn2}
              height="200px"
              photo={
                "https://www.djangoproject.com/s/img/logos/django-logo-positive.png"
              }
            />
          </ModalBody>
        </Modal>
      </MatchContainer>
    );
    // return <ExplicitBaseCard
    //               photo={props.currentUser.photo}
    //               name={props.currentUser.first_name + props.currentUser.last_name}
    //               btn1={props.btn1} //click event listener
    //               btn1Text={string}
    //               btn2={func} //click event listener
    //               btn2Text={string}
    //               is_open={boolean}
    //               toggle={func}
    //               is_seeker={boolean}

    //                 {/*employer*/}
    //                 company_name =  {props.currentUser.company_name}
    //                 free_calls = {props.currentUser.free_calls}
    //
    //                 {/*Job*/}
    //                 salary_min = {props.salary_min}
    //                 salary_max = {props.salary_max}
    //                 description = {props.description}
    //                 requirements = {props.requirements}
    //                 is_active = {props.is_active}
    //
    //               {/*seeker props*/}
    //               education={props.education}
    //               experience={props.experience}
    //               desired_title ={props.desired_title}
    //               free_apps ={props.free_apps}
    //
    //               {/*browse page props*/}
    //                 btn3={props.bnt3} //click event listener
    //                 btn3Text={props.btn3Text}
    //                 btnHover={props.btnHover} //need id for target
    //                 onClick={props.moreInfo} //downArrow to read more info about given seeker/job
    //                //onclick event listener for the card. Usecase..the parent component can open and close modal as needed.
    //                fullCardArrow={props.showFullCard} // control display css property
    //                is_expandable={boolean}
    //
    //                 {/*Job and seeker*/}
    //                 top_skills = {props.top_skills}
    //                 extra_skills = {props.extra_skills}
    //                 familiar_with = {props.familiar_with}
    //
    //                 {/*seeker and employer */}
    //                 summary={props.currentUser.summary}
    //
    //               {/*optional*/}
    //               width={props.width}
    //               height={props.width}
    //               themeing={props.width}
    //     />
  }
}
export default BrowseSeekerContainer;
